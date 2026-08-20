import { MapContainer, TileLayer, CircleMarker, Tooltip, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import L from "leaflet";
import { classifyAirQuality } from "@/lib/atmo/classification";

export interface PredictionPoint {
  name?: string;
  lat: number;
  lng: number;
  pm25: number;
  is_hotspot?: boolean;
}

// Child controller for auto-centering, zoom, and Leaflet size invalidation
function MapController({
  center,
  zoom,
  selectedPoint,
}: {
  center?: [number, number];
  zoom?: number;
  selectedPoint?: PredictionPoint | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const invalidate = () => {
      try {
        map.invalidateSize();
      } catch {}
    };

    invalidate();
    const t1 = setTimeout(invalidate, 150);
    const t2 = setTimeout(invalidate, 400);

    window.addEventListener("resize", invalidate);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", invalidate);
    };
  }, [map]);

  useEffect(() => {
    if (!map) return;
    if (selectedPoint && typeof selectedPoint.lat === "number" && typeof selectedPoint.lng === "number") {
      map.flyTo([selectedPoint.lat, selectedPoint.lng], Math.max(map.getZoom(), 7), {
        duration: 1.0,
      });
    } else if (center) {
      map.setView(center, zoom ?? map.getZoom());
    }
  }, [map, selectedPoint, center, zoom]);

  return null;
}

// Heatmap Layer built dynamically on top of Leaflet
function HeatmapLayer({ points }: { points: PredictionPoint[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    let heatLayerInstance: any = null;

    const initHeatmap = () => {
      // @ts-ignore
      if (typeof L.heatLayer === "function") {
        const heatPoints = points
          .filter((p) => typeof p.lat === "number" && typeof p.lng === "number" && !isNaN(p.lat) && !isNaN(p.lng))
          .map((p) => [
            p.lat,
            p.lng,
            Math.min(Math.max(p.pm25 / 250, 0.1), 1.0),
          ]);

        // @ts-ignore
        heatLayerInstance = L.heatLayer(heatPoints, {
          radius: 26,
          blur: 16,
          maxZoom: 9,
          gradient: {
            0.15: "#22c55e", // Good
            0.35: "#eab308", // Moderate
            0.55: "#f97316", // Poor
            0.75: "#ef4444", // Very Poor
            1.00: "#9333ea", // Severe
          },
        }).addTo(map);
      }
    };

    // @ts-ignore
    if (typeof L.heatLayer !== "function") {
      const scriptId = "leaflet-heat-script";
      let script = document.getElementById(scriptId) as HTMLScriptElement;

      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js";
        script.async = true;
        document.head.appendChild(script);
      }

      const onLoad = () => initHeatmap();
      script.addEventListener("load", onLoad);

      return () => {
        script.removeEventListener("load", onLoad);
        if (heatLayerInstance && map) {
          try {
            map.removeLayer(heatLayerInstance);
          } catch {}
        }
      };
    } else {
      initHeatmap();
      return () => {
        if (heatLayerInstance && map) {
          try {
            map.removeLayer(heatLayerInstance);
          } catch {}
        }
      };
    }
  }, [map, points]);

  return null;
}

export function DynamicMap({
  hotspots = [],
  predictions = [],
  selectedCity,
  onSelectCity,
  center = [22.5, 79.5],
  zoom = 4,
  className = "",
}: {
  hotspots?: PredictionPoint[];
  predictions?: PredictionPoint[];
  selectedCity?: string;
  onSelectCity?: (cityName: string) => void;
  center?: [number, number];
  zoom?: number;
  className?: string;
}) {
  const activeDataset = predictions.length > 0 ? predictions : hotspots;

  // Filter named hotspot markers
  const hotspotMarkers = useMemo(
    () =>
      activeDataset.filter(
        (point) =>
          typeof point.lat === "number" &&
          typeof point.lng === "number" &&
          (point.is_hotspot === true || (point.name && point.is_hotspot !== false))
      ),
    [activeDataset]
  );

  const selectedPoint = useMemo(
    () =>
      selectedCity
        ? hotspotMarkers.find(
            (p) => p.name?.toLowerCase() === selectedCity.toLowerCase()
          ) ?? null
        : null,
    [hotspotMarkers, selectedCity]
  );

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border bg-slate-900/5 ${className}`}
      style={{ height: "100%", minHeight: 250, width: "100%" }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full absolute inset-0 z-0"
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController center={center} zoom={zoom} selectedPoint={selectedPoint} />
        <HeatmapLayer points={activeDataset} />

        {hotspotMarkers.map((point, idx) => {
          const isSelected =
            selectedCity && point.name?.toLowerCase() === selectedCity.toLowerCase();
          const cls = classifyAirQuality(point.pm25);

          return (
            <div key={`${point.name || "marker"}-${idx}`}>
              {/* Pulsing selection outer circle */}
              <CircleMarker
                center={[point.lat, point.lng]}
                radius={isSelected ? 22 : 14}
                color={isSelected ? "#0f172a" : cls.color}
                weight={isSelected ? 3 : 2}
                opacity={0.9}
                fillColor={cls.color}
                fillOpacity={isSelected ? 0.4 : 0.2}
                eventHandlers={{
                  click: () => {
                    if (point.name && onSelectCity) {
                      onSelectCity(point.name);
                    }
                  },
                }}
              />
              {/* Inner marker */}
              <CircleMarker
                center={[point.lat, point.lng]}
                radius={isSelected ? 10 : 7}
                color="#ffffff"
                weight={2}
                opacity={1}
                fillColor={cls.color}
                fillOpacity={1}
                eventHandlers={{
                  click: () => {
                    if (point.name && onSelectCity) {
                      onSelectCity(point.name);
                    }
                  },
                }}
              >
                <Tooltip direction="top" opacity={0.98} sticky>
                  <div className="font-sans text-xs p-1 min-w-[120px]">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1 mb-1">
                      <strong className="text-slate-900 text-sm font-bold">
                        {point.name || `Coord (${point.lat}, ${point.lng})`}
                      </strong>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
                        style={{ backgroundColor: cls.color }}
                      >
                        {cls.shortCategory}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 flex justify-between gap-2">
                      <span>PM2.5:</span>
                      <strong className="text-slate-900">{point.pm25} µg/m³</strong>
                    </div>
                    <div className="text-[10px] text-slate-500 flex justify-between gap-2">
                      <span>Lat/Lng:</span>
                      <span>{point.lat.toFixed(2)}, {point.lng.toFixed(2)}</span>
                    </div>
                    {isSelected && (
                      <div className="text-[10px] font-extrabold text-emerald-600 mt-1 text-center bg-emerald-50 py-0.5 rounded border border-emerald-200">
                        ✓ Selected City
                      </div>
                    )}
                  </div>
                </Tooltip>
              </CircleMarker>
            </div>
          );
        })}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[400] rounded-xl border border-border/80 bg-background/90 p-2 text-xs backdrop-blur-md shadow-md">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
          PM2.5 Severity Legend
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" /> Good
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]" /> Moderate
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f97316]" /> Poor
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" /> Very Poor
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#9333ea]" /> Severe
          </div>
        </div>
      </div>
    </div>
  );
}
