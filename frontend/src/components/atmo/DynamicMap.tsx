import { MapContainer, TileLayer, CircleMarker, Tooltip, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Interface matching hotspots.json
export interface Hotspot {
  name: string;
  lat: number;
  lng: number;
  pm25: number;
}

export function DynamicMap({ 
  hotspots = [], 
  className = "" 
}: { 
  hotspots: Hotspot[];
  className?: string;
}) {
  // Helper to get color from PM2.5
  const getColorForPM25 = (pm25: number) => {
    if (pm25 <= 50) return "#22c55e"; // Good (Green)
    if (pm25 <= 100) return "#facc15"; // Moderate (Yellow)
    if (pm25 <= 150) return "#f97316"; // Unhealthy for Sensitive Groups (Orange)
    if (pm25 <= 200) return "#ef4444"; // Unhealthy (Red)
    if (pm25 <= 300) return "#ec4899"; // Very Unhealthy (Pink)
    return "#7e22ce"; // Hazardous (Purple)
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border bg-sky-50 ${className}`} style={{ height: '100%', minHeight: 200, width: '100%' }}>
      <MapContainer 
        center={[22.5, 79.5]} 
        zoom={4} 
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full absolute inset-0 z-0"
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {hotspots.map((point, idx) => {
          const color = getColorForPM25(point.pm25);
          return (
            <div key={`${point.name}-${idx}`}>
              {/* Outer fuzzy circle */}
              <CircleMarker
                center={[point.lat, point.lng]}
                radius={16}
                color={color}
                weight={2}
                opacity={0.95}
                fillColor={color}
                fillOpacity={0.18}
              />
              {/* Inner solid circle */}
              <CircleMarker
                center={[point.lat, point.lng]}
                radius={8}
                color="#ffffff"
                weight={2}
                opacity={1}
                fillColor={color}
                fillOpacity={0.95}
              >
                <Tooltip direction="top" opacity={0.9} sticky>
                  <div className="font-sans text-sm">
                    <strong>{point.name}</strong>
                    <div className="text-xs mt-1">PM2.5: {point.pm25} µg/m³</div>
                  </div>
                </Tooltip>
              </CircleMarker>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}
