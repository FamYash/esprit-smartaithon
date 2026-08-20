import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Search, Plus, MapPin, Edit, Trash2, HeartPulse, CheckCircle2, AlertTriangle, ShieldCheck, X, Filter } from "lucide-react";
import { useReactiveStore } from "@/lib/atmo/storage";

export const Route = createFileRoute("/app/admin/safe-locations")({ component: AdminSafeLocations });

// Unified schema for both Admin and User dashboards
const defaultSafeLocations = [
  { id: "SL-101", name: "Lodhi Gardens", city: "New Delhi", aqi: 45, score: 92, status: "Active", type: "Park / Recreational", distance: "8.4 km", trend: "Stable", cx: 50, cy: 50, r: 30 },
  { id: "SL-102", name: "Sanjay Van Park", city: "New Delhi", aqi: 58, score: 88, status: "Active", type: "Forest Reserve", distance: "12.0 km", trend: "Improving", cx: 150, cy: 90, r: 25 },
  { id: "SL-103", name: "Deer Park Hauz Khas", city: "New Delhi", aqi: 64, score: 89, status: "Active", type: "Park / Lake", distance: "9.6 km", trend: "Improving", cx: 90, cy: 110, r: 20 },
  { id: "SL-104", name: "Okhla Bird Sanctuary", city: "New Delhi", aqi: 110, score: 65, status: "Needs Review", type: "Sanctuary / Wetland", distance: "4.2 km", trend: "Declining", cx: 120, cy: 40, r: 15 },
  { id: "SL-105", name: "Nehru Park Chanakyapuri", city: "New Delhi", aqi: 48, score: 95, status: "Active", type: "Park / Recreational", distance: "11.2 km", trend: "Stable", cx: 40, cy: 120, r: 28 },
];

function AdminSafeLocations() {
  const [locations, setLocations] = useReactiveStore<any[]>("atmoai_safe_locations", defaultSafeLocations);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this safe location?")) {
      setLocations(locations.filter(l => l.id !== id));
      toast.success("Safe location deleted successfully.");
    }
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLoc = {
      id: `SL-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.get("name") as string,
      city: formData.get("city") as string,
      type: formData.get("type") as string,
      aqi: parseInt(formData.get("aqi") as string, 10),
      score: parseInt(formData.get("score") as string, 10),
      status: formData.get("status") as string,
      distance: (Math.random() * 20).toFixed(1) + " km", // mocked for prototype
      trend: "Stable", // mocked
      cx: Math.floor(Math.random() * 160) + 20, // random map coordinate
      cy: Math.floor(Math.random() * 110) + 20, // random map coordinate
      r: Math.floor(Math.random() * 20) + 10,   // random map radius
    };
    setLocations([newLoc, ...locations]);
    setIsCreateModalOpen(false);
    toast.success("Safe location added successfully.");
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated = {
      ...selectedLocation,
      name: formData.get("name") as string,
      city: formData.get("city") as string,
      type: formData.get("type") as string,
      aqi: parseInt(formData.get("aqi") as string, 10),
      score: parseInt(formData.get("score") as string, 10),
      status: formData.get("status") as string,
    };
    setLocations(locations.map(l => l.id === updated.id ? updated : l));
    setIsEditModalOpen(false);
    setSelectedLocation(null);
    toast.success("Safe location updated successfully.");
  };

  const openEdit = (loc: any) => {
    setSelectedLocation(loc);
    setIsEditModalOpen(true);
  };

  const filteredLocations = locations.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = locations.length;
  const excellentCount = locations.filter(l => l.aqi <= 50).length;
  const moderateCount = locations.filter(l => l.aqi > 50 && l.aqi <= 100).length;
  const reviewCount = locations.filter(l => l.status === "Needs Review").length;

  return (
    <div className="font-sans max-w-7xl mx-auto space-y-6 pb-12 relative">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Safe Locations Management
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground font-sans max-w-lg leading-relaxed">
            Curate and manage verified safe zones for public health recommendations.
          </p>
        </div>
        <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-600 transition-colors">
          <Plus className="h-4 w-4" /> Add Location
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Locations" value={totalCount.toString()} icon={<MapPin className="text-blue-500 h-5 w-5" />} />
        <StatCard title="Excellent AQI" value={excellentCount.toString()} icon={<HeartPulse className="text-emerald-500 h-5 w-5" />} />
        <StatCard title="Moderate AQI" value={moderateCount.toString()} icon={<CheckCircle2 className="text-amber-500 h-5 w-5" />} />
        <StatCard title="Needs Review" value={reviewCount.toString()} icon={<AlertTriangle className="text-red-500 h-5 w-5" />} />
      </div>

      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search safe locations..."
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
              <option value="Needs Review">Needs Review</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {filteredLocations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <MapPin className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700">NO LOCATIONS FOUND</h3>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 px-4 font-bold">Location</th>
                  <th className="py-3 px-4 font-bold">City</th>
                  <th className="py-3 px-4 font-bold">Current AQI</th>
                  <th className="py-3 px-4 font-bold">Safety Score</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLocations.map((loc) => (
                  <tr key={loc.id} className="hover:bg-white/60 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-800">{loc.name}</p>
                      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{loc.id} · {loc.type}</p>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-600">{loc.city}</td>
                    <td className="py-3 px-4">
                      <span className={`font-black ${loc.aqi <= 50 ? 'text-emerald-600' : loc.aqi <= 100 ? 'text-amber-600' : 'text-red-600'}`}>
                        {loc.aqi}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${loc.score > 90 ? 'bg-emerald-500' : loc.score > 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${loc.score}%` }} />
                        </div>
                        <span className="font-bold text-slate-700">{loc.score}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${loc.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
                        {loc.status === "Active" && <ShieldCheck className="h-3 w-3" />}
                        {loc.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(loc)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(loc.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
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
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">Add Safe Location</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-800 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Name</label>
                  <input required name="name" type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="e.g. Community Center" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">City</label>
                  <input required name="city" type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="e.g. Noida" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Type</label>
                  <input required name="type" type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="e.g. Park" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">AQI (Current)</label>
                  <input required name="aqi" type="number" min="0" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Score (0-100)</label>
                  <input required name="score" type="number" min="0" max="100" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Status</label>
                  <select name="status" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                    <option value="Active">Active</option>
                    <option value="Needs Review">Needs Review</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">Save Location</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">Edit Safe Location</h2>
              <button onClick={() => { setIsEditModalOpen(false); setSelectedLocation(null); }} className="p-1 text-slate-400 hover:text-slate-800 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleEdit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Name</label>
                  <input required name="name" defaultValue={selectedLocation.name} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">City</label>
                  <input required name="city" defaultValue={selectedLocation.city} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Type</label>
                  <input required name="type" defaultValue={selectedLocation.type} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">AQI (Current)</label>
                  <input required name="aqi" defaultValue={selectedLocation.aqi} type="number" min="0" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Score (0-100)</label>
                  <input required name="score" defaultValue={selectedLocation.score} type="number" min="0" max="100" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Status</label>
                  <select name="status" defaultValue={selectedLocation.status} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                    <option value="Active">Active</option>
                    <option value="Needs Review">Needs Review</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setIsEditModalOpen(false); setSelectedLocation(null); }} className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 transition-colors">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-sm p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
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
