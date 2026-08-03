import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { useState } from "react";
import { MessageSquare, Star, Upload, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/app/dashboard/feedback")({ component: UserFeedbackView });

const initialComplaints = [
  { id: "CMP-401", category: "Industrial Smoke Emissions", location: "Noida Phase-II Industrial Area", date: "May 18, 2026", status: "In Progress", details: "Assigned to Noida Pollution Control Board for field investigation." },
  { id: "CMP-402", category: "Open Waste Burning", location: "Sector 137 Residential Block", date: "May 15, 2026", status: "Resolved", details: "Municipal team cleared the dumpsite and issued fine receipts." },
  { id: "CMP-403", category: "Road Construction Dust", location: "Expressway Bypass Sector-62", date: "May 10, 2026", status: "Resolved", details: "Water sprinklers deployed; contractor instructed to spray twice daily." },
];

function UserFeedbackView() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [rating, setRating] = useState(4);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Form states
  const [category, setCategory] = useState("Industrial Emissions");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [feedbackSuccess, setFeedbackSuccess] = useState("");

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !desc) return;

    const newC = {
      id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
      category,
      location,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      status: "Submitted",
      details: "Awaiting administrator validation."
    };

    setComplaints([newC, ...complaints]);
    setSuccessMsg("Complaint filed successfully. Thank you for reporting.");
    setLocation("");
    setDesc("");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSuccess("Thank you! Your feedback has been registered.");
    setTimeout(() => setFeedbackSuccess(""), 4000);
  };

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">Complaints & Platform Feedback</h1>
        <p className="mt-1.5 text-sm text-muted-foreground font-sans">Report local pollution incidents, upload environmental proof, and rate our forecasting system</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Complaint Submission Form */}
        <Card title="Report Local Pollution Incident" subtitle="File telemetry reports directly with environmental bureaus">
          <form onSubmit={handleComplaintSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-foreground">Incident Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option>Industrial Smoke Emissions</option>
                <option>Open Waste / Leaf Burning</option>
                <option>Severe Construction Dust</option>
                <option>Vehicle Standoff / Emissions</option>
                <option>Other Pollutant Incident</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Accurate Location / Landmark</label>
              <input
                required
                type="text"
                placeholder="e.g. Sector-62 Industrial Block, Noida"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Incident Description</label>
              <textarea
                required
                rows={3}
                placeholder="Describe details (e.g. brick kiln chimney releasing black smoke during prohibited hours)..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Evidence drag-drop area */}
            <div>
              <label className="text-xs font-bold text-foreground">Upload Evidence (Images / PDF)</label>
              <div className="mt-1.5 border-2 border-dashed border-border hover:border-primary transition rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer">
                <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                <p className="text-xs font-bold">Drag and drop file here, or click to upload</p>
                <p className="text-[10px] text-muted-foreground mt-1">PNG, JPG or PDF up to 5MB</p>
              </div>
            </div>

            <button type="submit" className="w-full rounded-xl gradient-primary py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-95 transition">
              File Incident Report
            </button>

            {successMsg && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-700 font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" /> {successMsg}
              </div>
            )}
          </form>
        </Card>

        {/* Platform Feedback Form */}
        <div className="space-y-6">
          <Card title="Rate AtmoAI Forecasting" subtitle="Your ratings calibrate our UX and modeling engines">
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground">Forecast Accuracy Rating</label>
                <div className="flex items-center gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="text-amber-400 hover:scale-110 transition focus:outline-none"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          (hoverRating !== null ? star <= hoverRating : star <= rating)
                            ? "fill-amber-400 stroke-amber-400"
                            : "stroke-muted"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground">Write a Review</label>
                <textarea
                  rows={4}
                  placeholder="How can we improve the forecasting alerts or dashboard experience? Let us know..."
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button type="submit" className="w-full rounded-xl border border-border bg-card py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition">
                Submit Platform Feedback
              </button>

              {feedbackSuccess && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-700 font-semibold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="h-4 w-4 shrink-0" /> {feedbackSuccess}
                </div>
              )}
            </form>
          </Card>

          <Card title="Why report incidents?">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Incident reports filed here are calibrated with satellite imagery. Valid reports are automatically logged onto our municipal agency dashboard for rapid mitigation of unregulated emissions.
            </p>
          </Card>
        </div>
      </div>

      {/* Previous Complaints tracking */}
      <Card title="Filed Incident Status Tracking" subtitle="Real-time audit updates on your filed complaints">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border pb-3 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 font-semibold">Incident ID</th>
                <th className="pb-3 font-semibold">Date Filed</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Incident Location</th>
                <th className="pb-3 font-semibold text-right">Audit Progress Details</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {complaints.map(c => (
                <tr key={c.id} className="hover:bg-accent/40">
                  <td className="py-3.5 font-semibold text-primary font-mono">{c.id}</td>
                  <td className="py-3.5 text-muted-foreground">{c.date}</td>
                  <td className="py-3.5 font-semibold">{c.category}</td>
                  <td className="py-3.5 font-medium">{c.location}</td>
                  <td className="py-3.5 text-right text-xs text-muted-foreground max-w-xs truncate">{c.details}</td>
                  <td className="py-3.5 text-right">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      c.status === "Resolved" ? "bg-emerald-50 text-emerald-700" :
                      c.status === "In Progress" ? "bg-yellow-50 text-yellow-700 animate-pulse" :
                      "bg-blue-50 text-blue-700"
                    }`}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
