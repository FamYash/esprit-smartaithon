import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { UserPlus, UserCheck, ShieldAlert, Key, MoreVertical, Edit, UserMinus } from "lucide-react";

export const Route = createFileRoute("/app/admin/users")({ component: AdminUsers });

const activeUsers = [
  { name: "Chrisha Dabhi", email: "chrisha@atmoai.com", role: "Super Administrator", activeProjects: 12, logs: "3 mins ago", status: "Active" },
  { name: "Antra Gajjar", email: "antra@atmoai.com", role: "Platform Lead Researcher", activeProjects: 8, logs: "12 mins ago", status: "Active" },
  { name: "Pragati Varu", role: "Machine Learning Engineer", email: "pragati@atmoai.com", activeProjects: 5, logs: "1 hour ago", status: "Active" },
  { name: "Dr. Rahul Mehta", role: "Academic Partner (IIT-B)", email: "rahul@iitb.ac.in", activeProjects: 2, logs: "Yesterday", status: "Active" },
  { name: "Lin Wei", role: "External Partner (CAS)", email: "lin@cas.cn", activeProjects: 1, logs: "3 days ago", status: "Pending" },
  { name: "Marie Dubois", role: "Climate Analyst", email: "marie@inra.fr", activeProjects: 4, logs: "5 hours ago", status: "Active" },
];

function AdminUsers() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">Users Management</h1>
          <p className="mt-1.5 text-sm text-muted-foreground font-sans">Manage organization roles, credentials, project scope, and user audit trails</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
          <UserPlus className="h-4 w-4" /> Add Organization User
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Total Organization Accounts">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-extrabold text-foreground">18</p>
              <p className="text-xs text-muted-foreground mt-1">15 active this week</p>
            </div>
            <UserCheck className="h-10 w-10 text-primary opacity-85" />
          </div>
        </Card>

        <Card title="Pending Review">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-extrabold text-foreground">3 Accounts</p>
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

      <Card title="Registered Team Members" subtitle="Role definitions and platform activity logging">
        <div className="overflow-x-auto">
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
              {activeUsers.map(u => (
                <tr key={u.email} className="hover:bg-accent/40">
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-xs font-bold text-white">
                        {u.name.split(" ").map(p=>p[0]).slice(0,2).join("")}
                      </div>
                      <div>
                        <p className="font-semibold leading-tight">{u.name}</p>
                        <p className="text-[11px] text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5"><span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">{u.role}</span></td>
                  <td className="py-3.5 text-right font-semibold">{u.activeProjects}</td>
                  <td className="py-3.5 text-right text-xs text-muted-foreground font-mono">{u.logs}</td>
                  <td className="py-3.5 text-right">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      u.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-yellow-50 text-yellow-700"
                    }`}>{u.status}</span>
                  </td>
                  <td className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="grid h-7 w-7 place-items-center rounded-lg hover:bg-accent"><Edit className="h-4 w-4"/></button>
                      <button className="grid h-7 w-7 place-items-center rounded-lg text-red-500 hover:bg-red-50"><UserMinus className="h-4 w-4"/></button>
                    </div>
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
