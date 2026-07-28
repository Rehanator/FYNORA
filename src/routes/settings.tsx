import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, Key, Palette, Pencil, Building, Check, CreditCard, Lock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · FYNORA" },
      { name: "description", content: "Configure school profile, notifications, integrations and branding." },
      { property: "og:title", content: "Settings" },
      { property: "og:description", content: "Fine-tune your FYNORA console." },
    ],
  }),
  component: Settings,
});



type ProfileField = {
  key: string;
  label: string;
  value: string;
};

const initialFields: ProfileField[] = [
  { key: "schoolName", label: "School Name", value: "Sunrise International School" },
  { key: "academicYear", label: "Academic Year", value: "2026 - 2027" },
  { key: "registrationId", label: "Registration ID", value: "CBSE/2004/1128" },
  { key: "board", label: "Board / Affiliation", value: "CBSE · Class I–XII" },
  { key: "gstin", label: "GSTIN", value: "29AAACD0842R1Z8" },
  { key: "upiVpa", label: "UPI VPA", value: "payments@sunrise.edu" },
  { key: "financeEmail", label: "Finance Email", value: "finance@sunrise.edu" },
  { key: "contactPhone", label: "Contact Phone", value: "+91 11 2345 6789" },
  { key: "timezone", label: "Timezone", value: "Asia / Kolkata" },
  { key: "registeredAddress", label: "Registered Address", value: "42 Learning Ave, Bengaluru 560001, Maharashtra, India" },
];

function InstitutionProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [fields, setFields] = useState<ProfileField[]>(initialFields);

  const updateValue = (key: string, next: string) => {
    setFields((prev) => prev.map((f) => (f.key === key ? { ...f, value: next } : f)));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      toast.success("Profile saved", { description: "Institution details updated successfully." });
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <Card className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 shadow-2xl shadow-slate-950/40">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-teal-500/20 text-cyan-300 shadow-[0_0_20px_-4px_rgba(34,211,238,0.35)] ring-1 ring-cyan-400/20">
            <Building className="h-6 w-6" strokeWidth={2} />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold tracking-tight text-slate-100">
              Institution Profile
            </CardTitle>
            <CardDescription className="text-sm text-slate-400">
              Workspace details for invoices, receipts, and parent communications.
            </CardDescription>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleEditToggle}
          className="border-slate-700/60 bg-slate-800/50 text-slate-200 hover:border-cyan-500/40 hover:bg-slate-800 hover:text-cyan-100"
        >
          {isEditing ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Pencil className="h-3.5 w-3.5" />
          )}
          <span className="hidden sm:inline">{isEditing ? "Save" : "Edit"}</span>
        </Button>
      </CardHeader>

      <Separator className="bg-slate-700/50" />

      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key} className="min-w-0">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {field.label}
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => updateValue(field.key, e.target.value)}
                  className="w-full rounded-full border border-slate-700/50 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                />
              ) : (
                <div className="truncate rounded-full border border-slate-700/50 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600/60 hover:bg-slate-800/70">
                  {field.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

type ToggleRow = { key: string; title: string; desc?: string; on: boolean };

function TogglePanel({
  icon: Icon,
  title,
  badge,
  rows,
}: {
  icon: typeof Bell;
  title: string;
  badge?: string;
  rows: ToggleRow[];
}) {
  const [items, setItems] = useState(rows);
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-emerald-300 ring-1 ring-white/10">
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>
        <h3 className="truncate text-lg font-semibold tracking-tight">{title}</h3>
        {badge && (
          <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-emerald-300">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {items.map((row) => (
          <div
            key={row.key}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3"
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{row.title}</div>
              {row.desc && (
                <div className="mt-0.5 text-xs text-muted-foreground">{row.desc}</div>
              )}
            </div>
            <Switch
              checked={row.on}
              onCheckedChange={(v) =>
                setItems((prev) => prev.map((r) => (r.key === row.key ? { ...r, on: v } : r)))
              }
              className="shrink-0 data-[state=checked]:bg-emerald-400"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const integrations = [
  { name: "UPI · Razorpay", sub: "acct_XYZ1029", connected: true },
  { name: "WhatsApp Business API", sub: "+91 80-4700-2000", connected: true },
  { name: "SMS Gateway · MSG91", sub: "sender: SPRNGF", connected: true },
  { name: "Tally Sync", sub: "—", connected: false },
];

function IntegrationsPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-cyan-300 ring-1 ring-white/10">
          <CreditCard className="h-5 w-5" strokeWidth={2.2} />
        </div>
        <h3 className="truncate text-lg font-semibold tracking-tight">Payment Integrations</h3>
      </div>

      <div className="mt-4 space-y-3">
        {integrations.map((i) => (
          <div
            key={i.name}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3"
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{i.name}</div>
              <div className="mt-0.5 truncate text-xs text-muted-foreground">{i.sub}</div>
            </div>
            {i.connected ? (
              <span className="shrink-0 text-xs font-semibold text-emerald-400">Connected</span>
            ) : (
              <span className="shrink-0 rounded-full bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-muted-foreground">
                Not connected
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Console"
        title="Settings"
        description="Configure how FYNORA behaves for your institution."
      />

      <InstitutionProfileCard />

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        <TogglePanel
          icon={Bell}
          title="Notifications"
          rows={[
            { key: "wa", title: "WhatsApp fee reminders", desc: "Send auto reminders 5 days before due date.", on: true },
            { key: "email", title: "Email receipts to parents", desc: "PDF receipt emailed on every successful payment.", on: true },
            { key: "sms", title: "SMS for large transactions", desc: "Alert admin for any single payment above ₹50,000.", on: true },
            { key: "digest", title: "Daily reconciliation digest", desc: "9:00 AM summary of previous day's collections.", on: true },
          ]}
        />

        <IntegrationsPanel />

        <TogglePanel
          icon={Lock}
          title="Security"
          badge="SOC 2"
          rows={[
            { key: "2fa", title: "Require 2FA for all admins", on: true },
            { key: "ip", title: "IP allowlist for accounts team", on: true },
            { key: "lock", title: "Auto-lock session after 15m idle", on: true },
            { key: "sign", title: "Sign audit ledger with hardware key", on: false },
          ]}
        />
      </div>
    </div>
  );
}

