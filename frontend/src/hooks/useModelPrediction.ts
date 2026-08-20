import { useState, useEffect, useMemo } from "react";
import { classifyAirQuality, type AirQualityClass } from "@/lib/atmo/classification";

/* ── Types ── */
export interface PredictionPoint {
  name?: string;
  lat: number;
  lng: number;
  pm25: number;
  is_hotspot?: boolean;
}

export interface ModelSummary {
  location: string;
  pm25: number;
  category: string;
}

export interface ModelPredictionData {
  timestamp: string;
  prediction_window: string;
  model_info: string;
  summary: ModelSummary;
  predictions: PredictionPoint[];
}

export interface UseModelPredictionResult {
  data: ModelPredictionData | null;
  predictions: PredictionPoint[];
  namedCities: PredictionPoint[];
  cities: PredictionPoint[]; // Alias for namedCities
  summary: ModelSummary;
  timestamp: string;
  predictionWindow: string;
  modelInfo: string;
  loading: boolean;
  error: string | null;

  /** Currently selected city name */
  selectedCity: string;
  setSelectedCity: (city: string) => void;

  /** The prediction point for the selected city (or null if not found) */
  selectedPrediction: PredictionPoint | null;
  /** AQI classification for the selected city */
  selectedClassification: AirQualityClass;

  /** Stats derived from the full dataset */
  stats: {
    cityCount: number;
    maxPm25: number;
    minPm25: number;
    avgPm25: number;
    safeCities: PredictionPoint[];
    hazardousCities: PredictionPoint[];
  };
}

const FALLBACK_SUMMARY: ModelSummary = {
  location: "Unknown",
  pm25: 0,
  category: "Unknown",
};

import { useReactiveStore, setStoreItem } from "@/lib/atmo/storage";

/**
 * Client-side hook that fetches /model_prediction.json once and provides
 * reactive, derived state and city persistence via localStorage (`atmoai_selected_city`).
 */
export function useModelPrediction(
  initialCity?: string
): UseModelPredictionResult {
  const [data, setData] = useState<ModelPredictionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useReactiveStore<string>(
    "atmoai_selected_city",
    initialCity ?? ""
  );

  useEffect(() => {
    let cancelled = false;
    fetch("/model_prediction.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: ModelPredictionData) => {
        if (cancelled) return;
        setData(json);

        // Auto-select city if not yet set or not present in predictions
        const named = (json.predictions || []).filter((p) => !!p.name);
        setSelectedCity((current) => {
          if (current && named.some((p) => p.name?.toLowerCase() === current.toLowerCase())) {
            return current;
          }
          const defaultCity =
            json.summary?.location ||
            named[0]?.name ||
            "";
          return defaultCity;
        });

        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message || "Failed to load prediction data");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [setSelectedCity]);

  const predictions = data?.predictions ?? [];
  const summary = data?.summary ?? FALLBACK_SUMMARY;
  const timestamp = data?.timestamp ?? "";
  const predictionWindow = data?.prediction_window ?? "";
  const modelInfo = data?.model_info ?? "";

  const namedCities = useMemo(
    () => predictions.filter((p) => !!p.name),
    [predictions]
  );

  const selectedPrediction = useMemo(
    () =>
      namedCities.find(
        (p) => p.name?.toLowerCase() === selectedCity.toLowerCase()
      ) ?? (namedCities.length > 0 ? namedCities[0] : null),
    [namedCities, selectedCity]
  );

  const selectedClassification = useMemo(
    () => classifyAirQuality(selectedPrediction?.pm25 ?? summary.pm25),
    [selectedPrediction, summary.pm25]
  );

  const stats = useMemo(() => {
    if (namedCities.length === 0) {
      return {
        cityCount: 0,
        maxPm25: 0,
        minPm25: 0,
        avgPm25: 0,
        safeCities: [] as PredictionPoint[],
        hazardousCities: [] as PredictionPoint[],
      };
    }
    const pm25Values = namedCities.map((p) => p.pm25);
    const sorted = [...namedCities].sort((a, b) => a.pm25 - b.pm25);
    return {
      cityCount: namedCities.length,
      maxPm25: Math.max(...pm25Values),
      minPm25: Math.min(...pm25Values),
      avgPm25: Math.round(pm25Values.reduce((s, v) => s + v, 0) / pm25Values.length),
      safeCities: sorted.filter((p) => p.pm25 <= 100),
      hazardousCities: sorted.filter((p) => p.pm25 > 150),
    };
  }, [namedCities]);

  return {
    data,
    predictions,
    namedCities,
    cities: namedCities,
    summary,
    timestamp,
    predictionWindow,
    modelInfo,
    loading,
    error,
    selectedCity,
    setSelectedCity,
    selectedPrediction,
    selectedClassification,
    stats,
  };
}
