import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { useState } from "react";
import { MessageSquare, Star, Upload, CheckCircle2 } from "lucide-react";
import { useReactiveStore } from "@/lib/atmo/storage";

export const Route = createFileRoute("/app/dashboard/feedback")({
  component: UserFeedbackView,
});

// Identity context for the demo user
const DEFAULT_USER_NAME = "Yash Kumavat";

const defaultComplaints = [
  {
    id: "CMP-0842",
    category: "Industrial Emission",
    location: "Ahmedabad, GIDC",
    date: "2026-08-19 14:30",
    status: "Open",
    reporter: "Yash Kumavat",
    description: "Heavy smoke release observed from chemical manufacturing zone.",
  },
  {
    id: "CMP-0841",
    category: "Stubble / Biomass Burning",
    location: "Punjab (Rural Sector)",
    date: "2026-08-19 11:15",
    status: "In Progress",
    reporter: "Rajesh K.",
    description: "Crop residue burning visible near arterial highway.",
  },
  {
    id: "CMP-0840",
    category: "Construction Dust",
    location: "Pune, Baner",
    date: "2026-08-18 09:45",
    status: "Escalated",
    reporter: "Priya S.",
    description: "No water spray or barrier deployed at excavation site.",
  },
  {
    id: "CMP-0839",
    category: "Vehicle Exhaust",
    location: "Bengaluru, Silk Board",
    date: "2026-08-17 08:20",
    status: "Resolved",
    reporter: "Yash Kumavat",
    description: "Commercial transport vehicle emitting excessive dark particulate exhaust.",
  },
];

function UserFeedbackView() {
  const [complaints, setComplaints] = useReactiveStore<any[]>("atmoai_complaints", defaultComplaints);
  const [profile] = useReactiveStore<any>("atmoai_user_profile", { name: DEFAULT_USER_NAME });
  const activeUserName = profile?.name || DEFAULT_USER_NAME;

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Form states
  const [category, setCategory] = useState("Industrial Emissions");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState("");

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim() || !desc.trim()) return;

    const newComplaint = {
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      location: location.trim(),
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
      status: "Open",
      reporter: activeUserName,
      description: desc.trim(),
    };

    setComplaints((prev) => [newComplaint, ...prev]);

    setSuccessMsg("Complaint filed successfully. Thank you for reporting.");
    setLocation("");
    setDesc("");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSuccess("Thank you! Your platform rating and review have been recorded.");
    setReviewText("");
    setTimeout(() => setFeedbackSuccess(""), 4000);
  };

  // Filter complaints to show those belonging to the current citizen account
  const userComplaints = complaints.filter(
    (c) =>
      c.reporter === activeUserName ||
      c.reporter === DEFAULT_USER_NAME
  );

  return (
    <div className="space-y-6 font-sans max-w-[1600px] mx-auto">
      <div className="border-b border-border/40 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Complaints & Platform Feedback
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          Report local pollution incidents and submit platform experience feedback
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Complaint Submission Form */}
        <Card
          title="Report Pollution Incident"
          subtitle="File local emission incidents for agency escalation"
        >
          <form onSubmit={handleComplaintSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-foreground">Incident Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option>Industrial Smoke Emissions</option>
                <option>Open Waste / Biomass Burning</option>
                <option>Severe Construction Dust</option>
                <option>Commercial Vehicle Exhaust</option>
                <option>Other Environmental Incident</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">
                Location / Landmark / City
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Industrial Area Phase 2, Noida"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Incident Description</label>
              <textarea
                required
                rows={3}
                placeholder="Provide specific details (time observed, duration, emission characteristics)..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">
                Attachment (Optional proof)
              </label>
              <div className="mt-1.5 border border-dashed border-border hover:border-primary/50 transition rounded-xl p-4 flex flex-col items-center justify-center text-center bg-muted/20 cursor-pointer">
                <Upload className="h-5 w-5 text-muted-foreground mb-1" />
                <p className="text-xs font-semibold text-foreground">Click or drop photos/docs here</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">PNG, JPG, or PDF up to 5MB</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl gradient-primary py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-95 transition"
            >
              Submit Incident Report
            </button>

            {successMsg && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-700 font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" /> {successMsg}
              </div>
            )}
          </form>
        </Card>

        {/* Platform Feedback Form */}
        <div className="space-y-4">
          <Card
            title="Rate Platform Experience"
            subtitle="Share your feedback to help us calibrate usability and tools"
          >
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground">
                  Platform Experience Rating
                </label>
                <div className="flex items-center gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="text-amber-400 hover:scale-110 transition focus:outline-none"
                      aria-label={`Rate ${star} star`}
                    >
                      <Star
                        className={`h-6 w-6 ${
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
                <label className="text-xs font-bold text-foreground">Your Review & Suggestions</label>
                <textarea
                  rows={4}
                  placeholder="How can we improve air quality monitoring, maps, or alerts for citizens?"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl border border-border bg-card py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition"
              >
                Submit Platform Feedback
              </button>

              {feedbackSuccess && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-700 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" /> {feedbackSuccess}
                </div>
              )}
            </form>
          </Card>

          <Card title="Community Reporting Process">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Incident reports filed through the Citizen Portal are synced to the municipal administrator
              queue for verification and regional response tracking.
            </p>
          </Card>
        </div>
      </div>

      {/* Previous Complaints tracking */}
      <Card
        title="Your Filed Reports Status"
        subtitle="Tracking history for reports submitted under this citizen account"
      >
        <div className="overflow-x-auto">
          {userComplaints.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground/30 mb-2" />
              <p className="text-xs font-semibold text-foreground">No reports filed yet</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Submit an incident report above to track its mitigation status.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-semibold">Report ID</th>
                  <th className="pb-3 font-semibold">Date Filed</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Location</th>
                  <th className="pb-3 font-semibold text-right">Description</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {userComplaints.map((c) => (
                  <tr key={c.id} className="hover:bg-accent/40">
                    <td className="py-3 font-semibold text-primary font-mono text-xs">{c.id}</td>
                    <td className="py-3 text-xs text-muted-foreground">{c.date}</td>
                    <td className="py-3 font-medium text-foreground text-xs">{c.category}</td>
                    <td className="py-3 text-xs font-medium">{c.location}</td>
                    <td className="py-3 text-right text-xs text-muted-foreground max-w-xs truncate">
                      {c.description}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          c.status === "Resolved"
                            ? "bg-emerald-50 text-emerald-700"
                            : c.status === "In Progress" || c.status === "Escalated"
                              ? "bg-yellow-50 text-yellow-700 animate-pulse"
                              : c.status === "Rejected"
                                ? "bg-slate-100 text-slate-700"
                                : "bg-red-50 text-red-600"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
