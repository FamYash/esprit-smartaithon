import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { UserPlus, UserCheck, ShieldAlert, Key, Edit, UserMinus, Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin/users")({ component: AdminUsers });

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  activeProjects: number;
  logs: string;
  status: string;
};

const defaultUsers: User[] = [
  { id: "1", name: "Chrisha Dabhi", email: "chrisha@atmoai.com", role: "Super Administrator", activeProjects: 12, logs: "3 mins ago", status: "Active" },
  { id: "2", name: "Antra Gajjar", email: "antra@atmoai.com", role: "Platform Lead Researcher", activeProjects: 8, logs: "12 mins ago", status: "Active" },
  { id: "3", name: "Pragati Varu", email: "pragati@atmoai.com", role: "Machine Learning Engineer", activeProjects: 5, logs: "1 hour ago", status: "Active" },
  { id: "4", name: "Dr. Rahul Mehta", email: "rahul@iitb.ac.in", role: "Academic Partner (IIT-B)", activeProjects: 2, logs: "Yesterday", status: "Active" },
  { id: "5", name: "Lin Wei", email: "lin@cas.cn", role: "External Partner (CAS)", activeProjects: 1, logs: "3 days ago", status: "Pending" },
  { id: "6", name: "Marie Dubois", email: "marie@inra.fr", role: "Climate Analyst", activeProjects: 4, logs: "5 hours ago", status: "Active" },
];

import { useReactiveStore } from "@/lib/atmo/storage";

function AdminUsers() {
  const [users, setUsers] = useReactiveStore<User[]>("atmoai_users", defaultUsers);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", role: "Climate Analyst", status: "Active" });

  // Handlers
  const handleCreate = () => {
    if (!formData.name || !formData.email || !formData.role) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^\\S+@\\S+\\.\\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      activeProjects: 0,
      logs: "Just now"
    };
    setUsers([...users, newUser]);
    setIsCreateOpen(false);
    setFormData({ name: "", email: "", role: "Climate Analyst", status: "Active" });
    toast.success("User created successfully");
  };

  const handleEdit = () => {
    if (!selectedUser || !formData.name || !formData.email || !formData.role) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^\\S+@\\S+\\.\\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
    setIsEditOpen(false);
    setSelectedUser(null);
    toast.success("User updated successfully");
  };

  const handleDelete = () => {
    if (!selectedUser) return;
    if (selectedUser.role === "Super Administrator") {
      toast.error("Cannot delete Super Administrator.");
      setIsDeleteOpen(false);
      return;
    }
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setIsDeleteOpen(false);
    setSelectedUser(null);
    toast.success("User deleted successfully");
  };

  const openCreate = () => {
    setFormData({ name: "", email: "", role: "Climate Analyst", status: "Active" });
    setIsCreateOpen(true);
  };

  const openEdit = (u: User) => {
    setSelectedUser(u);
    setFormData({ name: u.name, email: u.email, role: u.role, status: u.status });
    setIsEditOpen(true);
  };

  const openDelete = (u: User) => {
    setSelectedUser(u);
    setIsDeleteOpen(true);
  };

  const handleStatusToggle = (u: User) => {
    const newStatus = u.status === "Active" ? "Inactive" : u.status === "Inactive" ? "Pending" : "Active";
    setUsers(users.map(user => user.id === u.id ? { ...user, status: newStatus } : user));
    toast.success(`User status changed to ${newStatus}`);
  };

  // Derived state
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalUsers = users.length;
  const activeCount = users.filter(u => u.status === "Active").length;
  const pendingCount = users.filter(u => u.status === "Pending").length;

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">
            Users Management
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground font-sans">
            Manage organization roles, credentials, project scope, and user audit trails
          </p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-90 transition-opacity">
          <UserPlus className="h-4 w-4" /> Add Organization User
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Total Organization Accounts">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-extrabold text-foreground">{totalUsers}</p>
              <p className="text-xs text-muted-foreground mt-1">{activeCount} active currently</p>
            </div>
            <UserCheck className="h-10 w-10 text-primary opacity-85" />
          </div>
        </Card>

        <Card title="Pending Review">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-extrabold text-foreground">{pendingCount} Accounts</p>
              <p className="text-xs text-muted-foreground mt-1">Awaiting workspace approval</p>
            </div>
            <ShieldAlert className="h-10 w-10 text-amber-500 opacity-85" />
          </div>
        </Card>

        <Card title="API Keys Generated">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-extrabold text-foreground">34 keys</p>
              <p className="text-xs text-muted-foreground mt-1">12 production endpoints</p>
            </div>
            <Key className="h-10 w-10 text-blue-500 opacity-85" />
          </div>
        </Card>
      </div>

      <Card
        title="Registered Team Members"
        subtitle="Role definitions and platform activity logging"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 pt-2">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <UserMinus className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold">NO USERS FOUND</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">Add a user or clear search filters to begin managing access.</p>
              <button onClick={openCreate} className="flex items-center gap-2 rounded-xl gradient-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                <UserPlus className="h-4 w-4" /> Add User
              </button>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border pb-3 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-semibold">User</th>
                  <th className="pb-3 font-semibold">System Role</th>
                  <th className="pb-3 font-semibold text-right">Active Projects</th>
                  <th className="pb-3 font-semibold text-right">Last Portal Audit</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-accent/40 transition-colors">
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-xs font-bold text-white shrink-0 shadow-sm">
                          {u.name
                            .split(" ")
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold leading-tight">{u.name}</p>
                          <p className="text-[11px] text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-semibold">{u.activeProjects}</td>
                    <td className="py-3.5 text-right text-xs text-muted-foreground font-mono">
                      {u.logs}
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => handleStatusToggle(u)}
                        title="Click to toggle status"
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold transition-opacity hover:opacity-80 cursor-pointer ${
                          u.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : u.status === "Pending"
                            ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                            : "bg-gray-100 text-gray-700 border border-gray-200"
                        }`}
                      >
                        {u.status}
                      </button>
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => openEdit(u)} className="grid h-7 w-7 place-items-center rounded-lg hover:bg-accent transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => openDelete(u)} className="grid h-7 w-7 place-items-center rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                          <UserMinus className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* CREATE / EDIT MODAL */}
      {(isCreateOpen || isEditOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-background w-full max-w-md rounded-xl shadow-2xl border border-border p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-5">{isCreateOpen ? "Add Organization User" : "Edit User Details"}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder="e.g. Aditi Sharma"
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder="e.g. aditi@atmoai.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Role <span className="text-red-500">*</span></label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <option value="Super Administrator">Super Administrator</option>
                  <option value="Platform Lead Researcher">Platform Lead Researcher</option>
                  <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                  <option value="Climate Analyst">Climate Analyst</option>
                  <option value="Academic Partner (IIT-B)">Academic Partner (IIT-B)</option>
                  <option value="External Partner (CAS)">External Partner (CAS)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => { setIsCreateOpen(false); setIsEditOpen(false); }} className="px-4 py-2 text-sm font-semibold rounded-md border border-input hover:bg-accent transition-colors">
                Cancel
              </button>
              <button onClick={isCreateOpen ? handleCreate : handleEdit} className="px-4 py-2 text-sm font-semibold rounded-md gradient-primary text-white shadow hover:opacity-90 transition-opacity">
                {isCreateOpen ? "Create User" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-background w-full max-w-sm rounded-xl shadow-2xl border border-border p-6 animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-red-600 flex items-center gap-2 mb-3">
              <ShieldAlert className="h-5 w-5" />
              Delete User?
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Are you sure you want to remove <strong>{selectedUser.name}</strong> from the organization? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 text-sm font-semibold rounded-md border border-input hover:bg-accent transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm font-semibold rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors shadow">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
