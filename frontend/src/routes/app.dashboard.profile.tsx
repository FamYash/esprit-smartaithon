import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { useState } from "react";
import { User, Mail, Phone, MapPin, Heart, ShieldCheck, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/app/dashboard/profile")({ component: UserProfileView });

const locationsIndia = {
  Delhi: ["New Delhi", "Dwarka", "Okhla", "Rohini"],
  Haryana: ["Gurugram", "Faridabad", "Sonipat", "Panipat"],
  "Uttar Pradesh": ["Noida", "Ghaziabad", "Lucknow", "Kanpur"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Thane"],
  Karnataka: ["Bengaluru", "Mysore", "Hubli", "Mangalore"],
};

function UserProfileView() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@atmoai.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [state, setState] = useState<keyof typeof locationsIndia>("Uttar Pradesh");
  const [city, setCity] = useState("Noida");

  const [asthma, setAsthma] = useState(true);
  const [copd, setCopd] = useState(false);
  const [allergies, setAllergies] = useState(true);
  const [respiratory, setRespiratory] = useState(false);
  const [heart, setHeart] = useState(false);

  const [saveSuccess, setSaveSuccess] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess("Profile settings successfully updated.");
    setTimeout(() => setSaveSuccess(""), 4000);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value as keyof typeof locationsIndia;
    setState(newState);
    setCity(locationsIndia[newState][0]);
  };

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">
          My Health Profile
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground font-sans">
          Configure your health condition flags to calibrate customized health advisory alerts
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile details editing */}
        <Card title="Edit Personal Information" className="lg:col-span-2">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-foreground">Full Name</label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground">Email Address</label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-xs font-bold text-foreground">Contact Number</label>
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground">State Region</label>
                <div className="relative mt-1.5">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={state}
                    onChange={handleStateChange}
                    className="w-full appearance-none rounded-xl border border-input bg-background py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {Object.keys(locationsIndia).map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground">City Area</label>
                <div className="relative mt-1.5">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-input bg-background py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {locationsIndia[state].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="rounded-xl gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-95"
            >
              Save Profile Details
            </button>

            {saveSuccess && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-700 font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" /> {saveSuccess}
              </div>
            )}
          </form>
        </Card>

        {/* Health Conditions Checkbox Profile */}
        <Card title="Sensitive Health Profile" subtitle="Toggle conditions to customize alerts">
          <div className="space-y-3.5">
            {[
              {
                id: "ast",
                checked: asthma,
                setter: setAsthma,
                title: "Asthma Profile",
                desc: "Triggers bronchospasm & inhaler warnings",
              },
              {
                id: "copd",
                checked: copd,
                setter: setCopd,
                title: "COPD Diagnostic",
                desc: "Triggers oxygen-level decrease flags",
              },
              {
                id: "all",
                checked: allergies,
                setter: setAllergies,
                title: "Severe Allergies",
                desc: "Pollen, dust and conjunctivitis advisory",
              },
              {
                id: "resp",
                checked: respiratory,
                setter: setRespiratory,
                title: "Respiratory Sensitivity",
                desc: "Bronchial mucosal protection tips",
              },
              {
                id: "hrt",
                checked: heart,
                setter: setHeart,
                title: "Heart / Cardiovascular",
                desc: "Triggers cold air exercise warnings",
              },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 rounded-2xl border border-border p-3.5 hover:bg-accent/40 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => item.setter(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-border accent-[color:var(--color-primary)]"
                />
                <div>
                  <p className="text-sm font-bold text-foreground">{item.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </Card>
      </div>

      {/* Dynamic advisory mapping panel */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">
          Your Custom Health Recommendations
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!(asthma || copd || allergies || respiratory || heart) && (
            <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-3 text-center py-8">
              <ShieldCheck className="h-10 w-10 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-foreground">Standard Health Protocols Active</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                No respiratory sensitivity flags are configured. Recommended standard outdoor AQI
                protocols apply.
              </p>
            </div>
          )}

          {asthma && (
            <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5 shadow-card">
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[9px] font-extrabold text-red-800 uppercase">
                Asthma advisory
              </span>
              <h3 className="text-sm font-bold text-red-950 mt-3">Carry Quick-Relief Inhaler</h3>
              <p className="text-xs text-red-900 mt-1.5 leading-relaxed">
                Telemetry detects high PM10 dust counts in {city}. Keep emergency
                albuterol/bronchodilator inhalers within reach during all commutes.
              </p>
            </div>
          )}

          {copd && (
            <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5 shadow-card">
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[9px] font-extrabold text-red-800 uppercase">
                COPD Protocol
              </span>
              <h3 className="text-sm font-bold text-red-950 mt-3">Avoid Morning Smog Excursions</h3>
              <p className="text-xs text-red-900 mt-1.5 leading-relaxed">
                Atmospheric boundary layer compression is peak at 06:00 - 09:00. Restrict walking or
                exercises to filtered indoor arenas.
              </p>
            </div>
          )}

          {allergies && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 shadow-card">
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[9px] font-extrabold text-amber-800 uppercase">
                Allergy Defense
              </span>
              <h3 className="text-sm font-bold text-amber-950 mt-3">High Pollen & Dust Shield</h3>
              <p className="text-xs text-amber-900 mt-1.5 leading-relaxed">
                Dust storms in Rajasthan are dispersing particulates into {state}. Wear protective
                eyewear and rinse nasal pathways post-commute.
              </p>
            </div>
          )}

          {respiratory && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5 shadow-card">
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[9px] font-extrabold text-blue-800 uppercase">
                Mucosal Protection
              </span>
              <h3 className="text-sm font-bold text-blue-950 mt-3">Maintain Hydration Levels</h3>
              <p className="text-xs text-blue-900 mt-1.5 leading-relaxed">
                Dry winter drafts combined with ozone pollutants deplete bronchial mucus. Consume 3L
                water daily to protect alveolar membranes.
              </p>
            </div>
          )}

          {heart && (
            <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-5 shadow-card">
              <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[9px] font-extrabold text-purple-800 uppercase">
                Cardio Warning
              </span>
              <h3 className="text-sm font-bold text-purple-950 mt-3">
                Prevent Cold-Air Vascular Stress
              </h3>
              <p className="text-xs text-purple-900 mt-1.5 leading-relaxed">
                Fine particulates trigger arterial constriction. Avoid high-pace aerobic training
                under low temperature-inversion conditions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
