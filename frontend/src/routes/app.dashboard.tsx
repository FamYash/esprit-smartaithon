import { createFileRoute, Outlet } from "@tanstack/react-router";
import { UserAppShell } from "@/components/atmo/UserAppShell";

export const Route = createFileRoute("/app/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <UserAppShell>
      <Outlet />
    </UserAppShell>
  );
}
