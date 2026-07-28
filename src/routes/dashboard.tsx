import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NumberTicker } from "@/components/ui/number-ticker";
import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  AlertTriangle,
  Smartphone,
  Sparkles,
  Bell,
  Send,
  MessagesSquare,
  CheckCircle2,
  LineChart,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { TodayCollectionPulse } from "@/components/TodayCollectionPulse";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · FYNORA" },
      { name: "description", content: "Revenue, dues, defaulters and smart insights at a glance." },
      { property: "og:title", content: "FYNORA · Dashboard" },
      { property: "og:description", content: "Realtime fee analytics for school administrators." },
    ],
  }),
  component: Dashboard,
});

const metricMeta = [
  {
    key: "revenue" as const,
    label: "Total Revenue",
    delta: "+5.2% this month",
    up: true,
    icon: IndianRupee,
    tint: "from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)]",
  },
  {
    key: "dues" as const,
    label: "Pending Dues",
    delta: "-2.1% vs last month",
    up: false,
    icon: TrendingDown,
    tint: "from-[oklch(0.82_0.16_70)] to-[oklch(0.75_0.2_35)]",
  },
  {
    key: "defaulters" as const,
    label: "Active Defaulters",
    delta: "+3 new this week",
    up: false,
    icon: AlertTriangle,
    tint: "from-[oklch(0.7_0.2_25)] to-[oklch(0.75_0.18_15)]",
  },
  {
    key: "upi" as const,
    label: "UPI vs Cash",
    delta: "UPI adoption ↑",
    up: true,
    icon: Smartphone,
    tint: "from-[oklch(0.82_0.12_300)] to-[oklch(0.82_0.13_220)]",
  },
] as const;

const lakhs = (n: number) => (n / 100000).toFixed(1);
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;


const revenueSources = [
  { name: "Tuition", value: 2850000, color: "oklch(0.88 0.14 165)" },
  { name: "Transport", value: 780000, color: "oklch(0.82 0.13 220)" },
  { name: "Late Fees", value: 220000, color: "oklch(0.82 0.16 70)" },
  { name: "Activities", value: 430000, color: "oklch(0.82 0.12 300)" },
];

const trend = [
  { m: "Apr", v: 320 },
  { m: "May", v: 410 },
  { m: "Jun", v: 380 },
  { m: "Jul", v: 460 },
  { m: "Aug", v: 520 },
  { m: "Sep", v: 610 },
];

const defaulters = [
  { id: "STU-104", name: "Aarav Sharma", grade: "10-B", due: "₹48,500", days: 42, level: "high" },
  { id: "STU-217", name: "Isha Reddy", grade: "9-A", due: "₹36,200", days: 31, level: "high" },
  { id: "STU-089", name: "Kabir Menon", grade: "12-C", due: "₹28,900", days: 24, level: "med" },
  { id: "STU-311", name: "Zoya Khan", grade: "8-A", due: "₹19,400", days: 18, level: "med" },
  { id: "STU-402", name: "Rohan Patel", grade: "11-B", due: "₹12,750", days: 9, level: "low" },
  { id: "STU-158", name: "Meera Iyer", grade: "10-A", due: "₹42,100", days: 38, level: "high" },
  { id: "STU-273", name: "Devansh Kapoor", grade: "9-C", due: "₹34,800", days: 29, level: "high" },
  { id: "STU-095", name: "Anaya Bose", grade: "11-A", due: "₹26,400", days: 22, level: "med" },
  { id: "STU-347", name: "Vihaan Nair", grade: "7-B", due: "₹21,900", days: 20, level: "med" },
  { id: "STU-421", name: "Sara Malhotra", grade: "12-A", due: "₹17,650", days: 14, level: "low" },
  { id: "STU-512", name: "Arjun Verma", grade: "8-C", due: "₹15,200", days: 11, level: "low" },
  { id: "STU-608", name: "Priya Chawla", grade: "10-C", due: "₹9,850", days: 7, level: "low" },
];

function Dashboard() {
  const [sent, setSent] = useState<Record<string, boolean>>({});
  const [bulkSent, setBulkSent] = useState(false);


  const notify = (d: { id: string; name: string; due: string }) => {
    toast.success(`Reminder sent to ${d.name}'s parent`, {
      description: `WhatsApp payment link for ${d.due} delivered.`,
    });

    const message = encodeURIComponent(
      `Dear Parent, this is a reminder that the pending fee is due. Please pay via FYNORA.`
    );
    const url = `https://wa.me/919867487919?text=${message}`;
    window.open(url, "_blank");

    setSent((p) => ({ ...p, [d.id]: true }));
    setTimeout(() => setSent((p) => ({ ...p, [d.id]: false })), 2000);
  };

  const [live, setLive] = useState({
    revenue: 4280000,
    dues: 640000,
    defaulters: 34,
    upi: 78,
    tuition: 2910000,
    transport: 770000,
    lateFees: 430000,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setLive((p) => {
        const tuition = p.tuition + rand(1000, 15000);
        const transport = p.transport + rand(500, 6000);
        const lateFees = p.lateFees + rand(200, 3000);
        return {
          revenue: p.revenue + rand(1000, 15000),
          dues: Math.max(100000, p.dues + rand(-8000, 6000)),
          defaulters: Math.min(60, Math.max(20, p.defaulters + rand(-1, 1))),
          upi: Math.min(92, Math.max(60, p.upi + rand(-1, 1))),
          tuition,
          transport,
          lateFees,
        };
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const breakdownTotal = live.tuition + live.transport + live.lateFees;
  const sources = [
    { name: "Tuition", amount: live.tuition, color: "oklch(0.88 0.14 165)" },
    { name: "Transport", amount: live.transport, color: "oklch(0.82 0.13 220)" },
    { name: "Late Fees", amount: live.lateFees, color: "oklch(0.82 0.16 70)" },
  ].map((s) => ({ ...s, pct: Math.round((s.amount / breakdownTotal) * 100) }));

  return (

    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Good morning, Anita 👋"
        description="Here's what's happening across fees, payments and communications today."
        actions={
          <>
            <span className="hidden items-center gap-2 rounded-full border border-[oklch(0.82_0.15_155_/_0.3)] bg-[oklch(0.82_0.15_155_/_0.1)] px-3 py-1.5 text-[11px] font-medium text-[oklch(0.45_0.15_155)] sm:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.55_0.2_155)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.55_0.2_155)] shadow-[0_0_8px_oklch(0.55_0.2_155)]" />
              </span>
              Live sync active
            </span>
            <button
              onClick={() =>
                toast.promise(new Promise((r) => setTimeout(r, 1200)), {
                  loading: "Compiling today's collection report…",
                  success: "Report ready — download link sent to your inbox.",
                  error: "Could not generate report.",
                })
              }
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-[oklch(0.85_0.12_180)_/_0.25] hover:brightness-110"
            >
              <Sparkles className="h-4 w-4" /> Generate Report
            </button>
          </>
        }
      />

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricMeta.map((m) => {
          const Icon = m.icon;
          const ticker =
            m.key === "revenue" ? (
              <NumberTicker value={live.revenue} prefix="₹" suffix="L" format={lakhs} />
            ) : m.key === "dues" ? (
              <NumberTicker value={live.dues} prefix="₹" suffix="L" format={lakhs} />
            ) : m.key === "defaulters" ? (
              <NumberTicker value={live.defaulters} />
            ) : (
              <span className="inline-flex items-center gap-1">
                <NumberTicker value={live.upi} />
                <span>/</span>
                <NumberTicker value={100 - live.upi} />
              </span>
            );
          return (
            <div key={m.label} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${m.tint} text-[oklch(0.2_0.03_260)]`}>
                  <Icon className="h-5 w-5" strokeWidth={2.4} />
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                    m.up
                      ? "border-[oklch(0.82_0.15_155_/_0.3)] bg-[oklch(0.82_0.15_155_/_0.1)] text-[oklch(0.5_0.15_155)]"
                      : "border-[oklch(0.82_0.16_70_/_0.3)] bg-[oklch(0.82_0.16_70_/_0.1)] text-[oklch(0.55_0.18_70)]"
                  }`}
                >
                  {m.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {m.delta}
                </span>
              </div>
              <div className="mt-4 text-3xl font-semibold tracking-tight">{ticker}</div>
              <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
            </div>
          );
        })}

      </div>

      {/* Live collection pulse */}
      <TodayCollectionPulse />

      {/* Analytics */}
      <div className="grid gap-4">
        <div className="glass rounded-2xl p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Revenue Breakdown</div>
              <div className="text-xs text-muted-foreground">FY 2025-26 · YTD</div>
            </div>
            <div className="text-xs text-muted-foreground">
              Total <NumberTicker value={breakdownTotal} prefix="₹" suffix="L" format={lakhs} />
            </div>
          </div>

          {/* Horizontal progress bars */}
          <div className="space-y-3">
            {sources.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                    {s.name}{" "}
                    <span className="inline-flex items-center text-muted-foreground">
                      (<NumberTicker value={s.pct} suffix="%" />)
                    </span>
                  </span>
                  <span className="font-medium">
                    <NumberTicker value={s.amount} prefix="₹" suffix="L" format={lakhs} />
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-black/[0.04]">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${s.pct}%`,
                      background: `linear-gradient(90deg, ${s.color}, oklch(0.9 0.1 200))`,
                      boxShadow: `0 0 10px ${s.color}`,
                    }}
                  />
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>



      {/* Defaulters table */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Prioritized Defaulters</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-[oklch(0.7_0.2_25_/_0.4)] bg-[oklch(0.7_0.2_25_/_0.15)] px-2 py-0.5 text-[10px] font-semibold text-[oklch(0.55_0.22_25)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.55_0.22_25)] shadow-[0_0_6px_oklch(0.55_0.22_25)]" />
                {defaulters.filter((d) => d.level === "high").length} Critical
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Highest overdue balances, first</div>
          </div>
          <button
            onClick={() =>
              toast.success(`Bulk reminder queued for ${defaulters.length} families`, {
                description: "WhatsApp + SMS reminders will be delivered within 5 minutes.",
              })
            }
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-[oklch(0.85_0.12_180)_/_0.25] hover:brightness-110"
          >
            <Send className="h-4 w-4" /> Send Bulk Reminder
          </button>
        </div>
        <div className="defaulters-scroll max-h-[350px] overflow-y-auto overflow-x-auto rounded-xl">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="sticky top-0 z-10 bg-card text-[11px] uppercase tracking-wider text-muted-foreground shadow-[0_1px_0_0_hsl(var(--border))]">
              <tr>
                <th className="bg-card pb-3 pt-2 font-medium">Student</th>
                <th className="bg-card pb-3 pt-2 font-medium">Grade</th>
                <th className="bg-card pb-3 pt-2 font-medium">Overdue</th>
                <th className="bg-card pb-3 pt-2 font-medium">Days late</th>
                <th className="bg-card pb-3 pt-2 font-medium">Urgency</th>
                <th className="bg-card pb-3 pt-2 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {defaulters.map((d) => (
                <tr key={d.id} className="group transition-colors hover:bg-black/[0.04]">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.82_0.12_300)] to-[oklch(0.82_0.13_220)] text-xs font-semibold text-[oklch(0.2_0.03_260)]">
                        {d.name
                          .split(" ")
                          .map((s) => s[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium">{d.name}</div>
                        <div className="text-[11px] text-muted-foreground">{d.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{d.grade}</td>
                  <td className="font-semibold">{d.due}</td>
                  <td className="text-muted-foreground">{d.days}</td>
                  <td>
                    <UrgencyBadge level={d.level} />
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => notify(d)}
                      className="glass inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition hover:bg-black/[0.07]"
                    >
                      {sent[d.id] ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-[oklch(0.5_0.15_155)]" />
                          Sent
                        </>
                      ) : (
                        <>
                          <Bell className="h-3.5 w-3.5 text-[oklch(0.5_0.15_155)]" />
                          Notify
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 border-t border-black/[0.06] pt-3">
          <button
            onClick={() =>
              toast("Opening full defaulters ledger…", {
                description: "Paginated view with filters, exports and audit trail.",
              })
            }
            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-black/[0.06] bg-black/[0.02] px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-black/[0.05] hover:text-foreground"
          >
            View All Defaulters
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>

      {/* Operational summary widgets */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: MessagesSquare,
            label: "Reminders sent (7d)",
            value: "1,284",
            tint: "from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)]",
          },
          {
            icon: CheckCircle2,
            label: "Reconciled today",
            value: "48",
            tint: "from-[oklch(0.82_0.15_155)] to-[oklch(0.85_0.12_180)]",
          },
          {
            icon: LineChart,
            label: "Avg. collection time",
            value: "2.4 days",
            tint: "from-[oklch(0.82_0.12_300)] to-[oklch(0.82_0.13_220)]",
          },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="glass flex items-center gap-4 rounded-2xl p-4">
              <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${c.tint} text-[oklch(0.2_0.03_260)]`}>
                <Icon className="h-5 w-5" strokeWidth={2.4} />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-semibold tracking-tight">{c.value}</div>
                <div className="truncate text-[11px] text-muted-foreground">{c.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function UrgencyBadge({ level }: { level: string }) {
  const map = {
    high: { bg: "bg-[oklch(0.7_0.2_25_/_0.15)]", ring: "border-[oklch(0.7_0.2_25_/_0.4)]", text: "text-[oklch(0.55_0.22_25)]", label: "Critical" },
    med: { bg: "bg-[oklch(0.82_0.16_70_/_0.15)]", ring: "border-[oklch(0.82_0.16_70_/_0.4)]", text: "text-[oklch(0.55_0.18_70)]", label: "High" },
    low: { bg: "bg-[oklch(0.82_0.13_220_/_0.15)]", ring: "border-[oklch(0.82_0.13_220_/_0.4)]", text: "text-[oklch(0.9_0.13_220)]", label: "Watch" },
  }[level]!;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border ${map.ring} ${map.bg} px-2 py-0.5 text-[11px] font-medium ${map.text}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {map.label}
    </span>
  );
}
