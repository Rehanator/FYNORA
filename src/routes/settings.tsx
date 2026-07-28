import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, Key, Palette, Pencil, Building, Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

const sections = [
  { icon: Bell, title: "Notifications", desc: "WhatsApp, email and SMS reminder cadence for parents and staff." },
  { icon: Key, title: "Integrations", desc: "UPI webhook, accounting exports and identity providers." },
  { icon: Palette, title: "Branding", desc: "Logo, receipt colours and parent-portal theming." },
];

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

function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Console"
        title="Settings"
        description="Configure how FYNORA behaves for your institution."
      />

      <InstitutionProfileCard />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="glass rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)] text-[oklch(0.2_0.03_260)]">
                  <Icon className="h-5 w-5" strokeWidth={2.4} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{s.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.desc}</div>
                </div>
              </div>
              <button
                onClick={() => toast(s.title, { description: s.desc })}
                className="mt-4 rounded-xl border border-black/[0.07] bg-black/[0.04] px-3 py-1.5 text-xs hover:bg-black/[0.07]"
              >
                Configure →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
