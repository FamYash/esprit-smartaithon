import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/atmo/AppShell";
import { Card } from "@/components/atmo/data";

export const Route = createFileRoute("/app/settings")({ component: Settings });

function Settings() {
  return (
    <AppShell title="Settings" subtitle="Manage your account, preferences and API keys">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Profile" className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl gradient-primary text-xl font-bold text-white shadow-glow">CD</div>
            <div>
              <p className="text-lg font-semibold">Chrisha Dabhi</p>
              <p className="text-sm text-muted-foreground">chrisha@atmoai.com · Admin</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="Full Name" value="Chrisha Dabhi"/>
            <Field label="Email" value="chrisha@atmoai.com"/>
            <Field label="Country" value="India"/>
            <Field label="Timezone" value="Asia/Kolkata (UTC +5:30)"/>
          </div>
          <button className="mt-6 rounded-xl gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow">Save changes</button>
        </Card>

        <Card title="API Access">
          <p className="text-xs text-muted-foreground">Use this key in the AtmoAI REST and GraphQL APIs.</p>
          <div className="mt-3 rounded-xl border border-border bg-muted p-3 font-mono text-xs">
            atmo_sk_live_••••••••••••8s2L
          </div>
          <button className="mt-3 w-full rounded-xl border border-border py-2 text-xs font-semibold hover:border-primary hover:text-primary">Regenerate Key</button>
          <div className="mt-5 space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Plan</span><span className="font-semibold">Pro</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Usage</span><span className="font-semibold">48,212 / 100,000</span></div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs font-semibold">{label}</label>
      <input defaultValue={value} className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"/>
    </div>
  );
}
