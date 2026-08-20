import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Search, Filter, AlertTriangle, ShieldAlert, CheckCircle2, Clock, Eye, Edit, Trash2, X } from "lucide-react";
import { useReactiveStore } from "@/lib/atmo/storage";

export const Route = createFileRoute("/app/admin/alerts")({ component: AdminAlerts });

const defaultAlerts = [
  { id: "ALT-920", category: "Severe Pollution", title: "Severe PM2.5 Spike", region: "Delhi NCR", severity: "Critical", date: "2026-08-19 11:30", status: "Active", desc: "Local monitors indicate a major PM2.5 spike due to stagnation." },
  { id: "ALT-919", category: "Violation", title: "Industrial Emission Violation", region: "Kanpur", severity: "Warning", date: "2026-08-19 09:15", status: "Active", desc: "Unregistered emissions detected during night hours." },
  { id: "ALT-918", category: "Severe Pollution", title: "Stubble Burning Hotspot", region: "Punjab", severity: "Critical", date: "2026-08-18 18:45", status: "Active", desc: "Multiple farm fires detected via satellite imagery." },
  { id: "ALT-917", category: "Health Advisory", title: "Unhealthy O3 Levels", region: "Mumbai", severity: "Warning", date: "2026-08-18 14:20", status: "Resolved", desc: "Ozone levels crossed safe thresholds near coastal industrial zones." },
  { id: "ALT-916", category: "Pollution", title: "Construction Dust", region: "Pune", severity: "Warning", date: "2026-08-17 09:00", status: "Resolved", desc: "High PM10 levels near metro construction sites." },
];

function AdminAlerts() {
  const [alerts, setAlerts] = useReactiveStore<any[]>("atmoai_alerts", defaultAlerts);
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const updateStatus = (id: string, newStatus: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (selectedAlert && selectedAlert.id === id) {
      setSelectedAlert({ ...selectedAlert, status: newStatus });
    }
    toast.success(`Alert status updated to ${newStatus}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this alert?")) {
      setAlerts(alerts.filter(a => a.id !== id));
      if (selectedAlert && selectedAlert.id === id) setSelectedAlert(null);
      toast.success("Alert deleted successfully.");
    }
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAlert = {
      id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      region: formData.get("region") as string,
      severity: formData.get("severity") as string,
      status: "Active", // newly created alerts default to active
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
      desc: formData.get("desc") as string,
    };
    setAlerts([newAlert, ...alerts]);
    setIsCreateModalOpen(false);
    toast.success("Alert created successfully.");
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated = {
      ...selectedAlert,
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      region: formData.get("region") as string,
      severity: formData.get("severity") as string,
      status: formData.get("status") as string,
      desc: formData.get("desc") as string,
    };
    setAlerts(alerts.map(a => a.id === updated.id ? updated : a));
    setSelectedAlert(updated);
    setIsEditModalOpen(false);
    toast.success("Alert updated successfully.");
  };

  const openEdit = (alert: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAlert(alert);
    setIsEditModalOpen(true);
  };

  // Derived state
  const filteredAlerts = alerts.filter(a => {
    const matchesSearch = 
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.region?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.desc?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const criticalCount = alerts.filter(a => a.severity === "Critical").length;
  const warningCount = alerts.filter(a => a.severity === "Warning" || a.severity === "High").length;
  const pendingCount = alerts.filter(a => a.status === "Pending").length;
  const resolvedCount = alerts.filter(a => a.status === "Resolved").length;

  return (
    <div className="font-sans max-w-7xl mx-auto space-y-6 pb-12 relative">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Alert Management
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground font-sans max-w-lg leading-relaxed">
            Monitor and manage system-generated and manual environmental alerts.
          </p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-600 transition-colors"
        >
          <Plus className="h-4 w-4" /> New Alert
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Critical Alerts" value={criticalCount.toString()} icon={<AlertTriangle className="text-red-500 h-5 w-5" />} color="red" />
        <StatCard title="Warning Alerts" value={warningCount.toString()} icon={<ShieldAlert className="text-orange-500 h-5 w-5" />} color="orange" />
        <StatCard title="Pending Alerts" value={pendingCount.toString()} icon={<Clock className="text-blue-500 h-5 w-5" />} color="blue" />
        <StatCard title="Resolved Alerts" value={resolvedCount.toString()} icon={<CheckCircle2 className="text-emerald-500 h-5 w-5" />} color="emerald" />
      </div>

      {/* Alert Table */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alerts by region, title, or ID..."
              className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-[300px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 rounded-xl border border-slate-200 bg-white shadow-sm text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="Acknowledged">Acknowledged</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {filteredAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertTriangle className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700">NO ALERTS FOUND</h3>
              <p className="text-sm text-slate-500 mt-1">Adjust your search or filters to see more results.</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 px-4 font-bold">Title</th>
                  <th className="py-3 px-4 font-bold">Region</th>
                  <th className="py-3 px-4 font-bold">Severity</th>
                  <th className="py-3 px-4 font-bold">Created Date</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-white/60 transition-colors cursor-pointer" onClick={() => setSelectedAlert(alert)}>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-800">{alert.title}</p>
                      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{alert.id}</p>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-600">{alert.region}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${alert.severity === "Critical" ? "bg-red-50 text-red-700 border border-red-100" : "bg-orange-50 text-orange-700 border border-orange-100"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${alert.severity === "Critical" ? "bg-red-600" : "bg-orange-500"}`} />
                        {alert.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-medium">{alert.date}</td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${alert.status === "Active" ? "text-red-600" : alert.status === "Pending" ? "text-blue-600" : "text-emerald-600"}`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={(e) => openEdit(alert, e)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Alert">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(alert.id); }} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Alert">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-muted-foreground font-medium">
          <p>Showing 1 to {filteredAlerts.length} entries</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 rounded">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Drawer Overlay & Content for View Details */}
      {selectedAlert && !isEditModalOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" onClick={() => setSelectedAlert(null)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{selectedAlert.id}</p>
                <h2 className="text-lg font-bold text-slate-800">{selectedAlert.title}</h2>
              </div>
              <button onClick={() => setSelectedAlert(null)} className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-200/50">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${selectedAlert.severity === "Critical" ? "bg-red-50 text-red-700 border border-red-100" : "bg-orange-50 text-orange-700 border border-orange-100"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedAlert.severity === "Critical" ? "bg-red-600" : "bg-orange-500"}`} />
                  {selectedAlert.severity}
                </span>
                <span className="text-xs font-semibold text-slate-500">{selectedAlert.date}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Description</h3>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedAlert.desc}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Region</h3>
                    <div className="text-sm font-semibold text-slate-700">{selectedAlert.region}</div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Category</h3>
                    <div className="text-sm font-semibold text-slate-700">{selectedAlert.category}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Current Status</h3>
                  <span className={`font-bold ${selectedAlert.status === "Active" ? "text-red-600" : selectedAlert.status === "Pending" ? "text-blue-600" : "text-emerald-600"}`}>
                    {selectedAlert.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => updateStatus(selectedAlert.id, "Resolved")}
                  className="py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 transition-colors shadow-sm text-center"
                >
                  Resolve Alert
                </button>
                <button 
                  onClick={() => updateStatus(selectedAlert.id, "Pending")}
                  className="py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors text-center"
                >
                  Mark Pending
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => updateStatus(selectedAlert.id, "Active")}
                  className="py-2 rounded-xl bg-red-50 text-red-700 font-bold text-xs hover:bg-red-100 transition-colors text-center border border-red-100"
                >
                  Mark Active
                </button>
                <button 
                  onClick={() => updateStatus(selectedAlert.id, "Dismissed")}
                  className="py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors text-center border border-slate-200"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">Create New Alert</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-800 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Title</label>
                  <input required name="title" type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="e.g. Unsafe PM2.5 Levels" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Category</label>
                  <input required name="category" type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="e.g. Severe Pollution" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Region</label>
                  <input required name="region" type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="e.g. Delhi NCR" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Severity</label>
                  <select name="severity" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Warning">Warning</option>
                    <option value="Moderate">Moderate</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Description</label>
                <textarea required name="desc" rows={3} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="Details about this alert..."></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">Publish Alert</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">Edit Alert</h2>
              <button onClick={() => { setIsEditModalOpen(false); setSelectedAlert(null); }} className="p-1 text-slate-400 hover:text-slate-800 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleEdit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Title</label>
                  <input required name="title" defaultValue={selectedAlert.title} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Category</label>
                  <input required name="category" defaultValue={selectedAlert.category} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Region</label>
                  <input required name="region" defaultValue={selectedAlert.region} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Severity</label>
                  <select name="severity" defaultValue={selectedAlert.severity} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Warning">Warning</option>
                    <option value="Moderate">Moderate</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Status</label>
                  <select name="status" defaultValue={selectedAlert.status} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Acknowledged">Acknowledged</option>
                    <option value="Dismissed">Dismissed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Description</label>
                <textarea required name="desc" defaultValue={selectedAlert.desc} rows={3} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setIsEditModalOpen(false); setSelectedAlert(null); }} className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 transition-colors">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-sm p-4 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
        <p className={`text-2xl font-black text-slate-800`}>{value}</p>
      </div>
      <div className={`p-3 rounded-xl bg-white shadow-sm border border-slate-100`}>
        {icon}
      </div>
    </div>
  );
}
