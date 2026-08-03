import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminAppShell } from "@/components/atmo/AdminAppShell";

export const Route = createFileRoute("/app/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AdminAppShell>
      <Outlet />
    </AdminAppShell>
  );
}
