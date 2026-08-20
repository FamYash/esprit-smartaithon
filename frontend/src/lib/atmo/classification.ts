export interface AirQualityClass {
  category: string;
  shortCategory: string;
  severity: "low" | "medium" | "high" | "critical";
  label: string;
  color: string;
  text: string;
  bg: string;
  border: string;
}

export function classifyAirQuality(pm25: number): AirQualityClass {
  if (pm25 <= 50) {
    return {
      category: "Good",
      shortCategory: "Good",
      severity: "low",
      label: "Good Air Quality",
      color: "#22c55e",
      text: "text-emerald-700",
      bg: "bg-emerald-50/80",
      border: "border-emerald-200",
    };
  }
  if (pm25 <= 100) {
    return {
      category: "Moderate",
      shortCategory: "Moderate",
      severity: "medium",
      label: "Moderate Air Quality",
      color: "#eab308",
      text: "text-amber-700",
      bg: "bg-amber-50/80",
      border: "border-amber-200",
    };
  }
  if (pm25 <= 150) {
    return {
      category: "Poor",
      shortCategory: "Poor",
      severity: "high",
      label: "Poor Air Quality",
      color: "#f97316",
      text: "text-orange-700",
      bg: "bg-orange-50/80",
      border: "border-orange-200",
    };
  }
  if (pm25 <= 200) {
    return {
      category: "Very Poor",
      shortCategory: "Very Poor",
      severity: "high",
      label: "Very Poor Air Quality",
      color: "#ef4444",
      text: "text-red-700",
      bg: "bg-red-50/80",
      border: "border-red-200",
    };
  }
  return {
    category: "Severe",
    shortCategory: "Severe",
    severity: "critical",
    label: "Severe Air Quality",
    color: "#9333ea",
    text: "text-purple-700",
    bg: "bg-purple-50/80",
    border: "border-purple-200",
  };
}

export function getHealthAdvisory(pm25: number, userProfile: any = {}): string[] {
  const aq = classifyAirQuality(pm25);
  const advisories: string[] = [];

  switch (aq.category) {
    case "Good":
      advisories.push("Air quality is ideal for outdoor activities.");
      advisories.push("No special protective wear is required.");
      break;
    case "Moderate":
      advisories.push("Unusually sensitive individuals should consider limiting heavy outdoor exertion.");
      advisories.push("Keep windows open for clean indoor ventilation.");
      break;
    case "Poor":
      advisories.push("Sensitive groups (children, elderly, respiratory patients) should reduce outdoor exposure.");
      advisories.push("Wear an N95 mask outdoors if experiencing discomfort.");
      if (userProfile.asthma || userProfile.copd || userProfile.allergies) {
        advisories.push("Personal health alert: Keep inhalers and medication accessible.");
      }
      break;
    case "Very Poor":
      advisories.push("Wear an N95 mask outdoors at all times.");
      advisories.push("Avoid prolonged or heavy exertion outside.");
      advisories.push("Keep indoor windows closed and run air purifiers.");
      break;
    case "Severe":
      advisories.push("Emergency advisory: Avoid all non-essential outdoor travel.");
      advisories.push("Wear high-filtration N95/N99 protective gear outdoors.");
      advisories.push("Operate indoor HEPA air filtration continuously.");
      break;
  }

  return advisories;
}
