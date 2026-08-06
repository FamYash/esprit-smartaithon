import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  MessageSquareWarning, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  X,
  User,
  MapPin,
  Image as ImageIcon,
  MoreVertical
} from "lucide-react";

export const Route = createFileRoute("/app/admin/complaints")({ component: AdminComplaints });

const complaintsData = [
  { id: "CMP-0842", category: "Industrial Emission", location: "Ahmedabad, GIDC", date: "2023-11-15 14:30", status: "Open", reporter: "Rajesh K.", description: "Heavy black smoke from chemical plant since morning." },
  { id: "CMP-0841", category: "Stubble Burning", location: "Amritsar (Rural)", date: "2023-11-15 11:15", status: "In Progress", reporter: "Anonymous", description: "Widespread crop burning visible from highway." },
  { id: "CMP-0840", category: "Construction Dust", location: "Pune, Baner", date: "2023-11-14 09:45", status: "Escalated", reporter: "Priya S.", description: "No dust control measures at new metro site. Breathing difficulty." },
  { id: "CMP-0839", category: "Vehicle Exhaust", location: "Bengaluru, Silk Board", date: "2023-11-14 08:20", status: "Resolved", reporter: "Amit D.", description: "Commercial truck emitting heavy smoke, license plate noted." },
  { id: "CMP-0838", category: "Waste Burning", location: "Delhi, Okhla", date: "2023-11-13 18:10", status: "Rejected", reporter: "Sneha M.", description: "Small fire in an empty plot." },
];

function AdminComplaints() {
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null);

  return (
    <div className="font-sans max-w-7xl mx-auto space-y-6 pb-12 relative">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Complaints Management
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground font-sans max-w-lg leading-relaxed">
            Review, assign, and resolve public environmental grievances.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Open" value="26" icon={<AlertCircle className="text-red-500 h-5 w-5" />} color="red" />
        <StatCard title="In Progress" value="14" icon={<Clock className="text-amber-500 h-5 w-5" />} color="amber" />
        <StatCard title="Escalated" value="5" icon={<MessageSquareWarning className="text-purple-500 h-5 w-5" />} color="purple" />
        <StatCard title="Resolved" value="342" icon={<CheckCircle2 className="text-emerald-500 h-5 w-5" />} color="emerald" />
      </div>

      {/* Main Table */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search ID, Location or Category..."
              className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-[300px]"
            />
          </div>
          <button className="h-9 px-4 rounded-xl border border-slate-200 bg-white shadow-sm text-xs font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Filter className="h-4 w-4" /> Filter Status
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4 font-bold">ID & Category</th>
                <th className="py-3 px-4 font-bold">Location</th>
                <th className="py-3 px-4 font-bold">Date Reported</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {complaintsData.map((c) => (
                <tr key={c.id} className="hover:bg-white/60 transition-colors cursor-pointer" onClick={() => setSelectedComplaint(c)}>
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-800">{c.category}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{c.id}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {c.location}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-medium">{c.date}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer Overlay & Content */}
      {selectedComplaint && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" onClick={() => setSelectedComplaint(null)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{selectedComplaint.id}</p>
                <h2 className="text-lg font-bold text-slate-800">{selectedComplaint.category}</h2>
              </div>
              <button onClick={() => setSelectedComplaint(null)} className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-200/50">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <div className="flex items-center justify-between">
                <StatusBadge status={selectedComplaint.status} />
                <span className="text-xs font-semibold text-slate-500">{selectedComplaint.date}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Description</h3>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{selectedComplaint.description}"
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Location</h3>
                    <div className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                      <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                      {selectedComplaint.location}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Reporter</h3>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <User className="h-4 w-4 text-slate-400" />
                      {selectedComplaint.reporter}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Evidence</h3>
                  <div className="h-32 bg-slate-100 rounded-xl border border-slate-200 border-dashed flex items-center justify-center text-slate-400 flex-col gap-2">
                    <ImageIcon className="h-6 w-6" />
                    <span className="text-xs font-medium">User uploaded 1 image</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 transition-colors shadow-sm text-center">
                  Resolve Complaint
                </button>
                <button className="py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors text-center">
                  Assign Officer
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 rounded-xl bg-purple-50 text-purple-700 font-bold text-xs hover:bg-purple-100 transition-colors text-center border border-purple-100">
                  Escalate
                </button>
                <button className="py-2 rounded-xl bg-red-50 text-red-700 font-bold text-xs hover:bg-red-100 transition-colors text-center border border-red-100">
                  Reject (Invalid)
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Open") return <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-100">{status}</span>;
  if (status === "In Progress") return <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100">{status}</span>;
  if (status === "Escalated") return <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-100">{status}</span>;
  if (status === "Resolved") return <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">{status}</span>;
  return <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">{status}</span>;
}

function StatCard({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-sm p-4 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
        <p className="text-2xl font-black text-slate-800">{value}</p>
      </div>
      <div className="p-3 rounded-xl bg-white shadow-sm border border-slate-100">
        {icon}
      </div>
    </div>
  );
}
