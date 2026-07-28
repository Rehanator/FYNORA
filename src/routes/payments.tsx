import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Smartphone,
  Banknote,
  CheckCircle2,
  XCircle,
  Filter,
  Download,
  TrendingUp,
  CreditCard,
  Wallet,
  Percent,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Omnichannel Payments · FYNORA" },
      { name: "description", content: "Live UPI collections and manual reconciliation in one console." },
      { property: "og:title", content: "Omnichannel Payments" },
      { property: "og:description", content: "Live UPI collections and manual reconciliation in one console." },
    ],
  }),
  component: PaymentsPage,
});

const metrics = [
  {
    label: "Today's Collection",
    value: "₹4,82,300",
    change: "↑ +12% vs yesterday",
    changeType: "positive" as const,
    icon: Wallet,
  },
  {
    label: "UPI Transactions",
    value: "326",
    change: "Zero-fee routed",
    changeType: "neutral" as const,
    icon: Smartphone,
  },
  {
    label: "Offline Earning",
    value: "₹1,12,800",
    change: "Awaiting bank deposit",
    changeType: "neutral" as const,
    icon: Banknote,
  },
  {
    label: "Pending Offline",
    value: "18",
    change: "Requires reconciliation",
    changeType: "warning" as const,
    icon: Percent,
  },
];

type UpiRow = {
  payer: string;
  student: string;
  grade: string;
  vpa: string;
  txnId: string;
  amount: number;
  icon: "bolt" | "incoming";
  iconBg: string;
  time: string;
};

const upiFeed: UpiRow[] = [
  {
    payer: "Mrs. Sharma",
    student: "Riya Sharma",
    grade: "IX-B",
    vpa: "priya.k@okhdfc",
    txnId: "TXN-9821245",
    amount: 15000,
    icon: "bolt",
    iconBg: "oklch(0.88 0.14 165)",
    time: "12s ago",
  },
  {
    payer: "Mr. Reddy",
    student: "Isha Reddy",
    grade: "VII-A",
    vpa: "rahul.m@ybl",
    txnId: "TXN-9821244",
    amount: 8600,
    icon: "incoming",
    iconBg: "oklch(0.82 0.13 220)",
    time: "34s ago",
  },
  {
    payer: "Mrs. Menon",
    student: "Kabir Menon",
    grade: "XI-C",
    vpa: "anita.m@paytm",
    txnId: "TXN-9821243",
    amount: 22400,
    icon: "bolt",
    iconBg: "oklch(0.82 0.12 300)",
    time: "1m ago",
  },
  {
    payer: "Mr. Khan",
    student: "Zoya Khan",
    grade: "V-B",
    vpa: "zafar.k@upi",
    txnId: "TXN-9821242",
    amount: 4500,
    icon: "incoming",
    iconBg: "oklch(0.82 0.14 70)",
    time: "2m ago",
  },
];

const snapshotItems = [
  { label: "Collected Today", value: "₹2,14,850", icon: Wallet },
  { label: "Total Transactions", value: "86", icon: CheckCircle2 },
  { label: "Avg. Ticket Size", value: "₹2,498", icon: TrendingUp },
  { label: "Convenience Fees Saved", value: "₹4,297", icon: CreditCard },
];

type OfflineStatus = "pending" | "approved" | "rejected";
type OfflineRow = {
  id: string;
  name: string;
  grade: string;
  method: string;
  amount: number;
  receipt: string;
  by: string;
  status: OfflineStatus;
};
type OfflineRowFull = OfflineRow & { time: string };
const initialOffline: OfflineRowFull[] = [
  { id: "OFF-1042", name: "Nikhil Verma", grade: "IX-C", method: "Cash", amount: 12000, receipt: "Receipt #4820", by: "Front Desk · Priya", status: "pending", time: "Today, 10:24 AM" },
  { id: "OFF-1041", name: "Anaya Bose", grade: "VII-A", method: "Cheque", amount: 45000, receipt: "Receipt #4819", by: "Accounts · Ravi", status: "approved", time: "Today, 09:58 AM" },
  { id: "OFF-1040", name: "Vivaan Rao", grade: "XI-A", method: "Cash", amount: 8600, receipt: "Receipt #4818", by: "Front Desk · Priya", status: "approved", time: "Today, 09:12 AM" },
  { id: "OFF-1039", name: "Sara Fernandes", grade: "V-B", method: "Cheque", amount: 22000, receipt: "Receipt #4817", by: "Accounts · Ravi", status: "pending", time: "Today, 08:45 AM" },
  { id: "OFF-1038", name: "Aarav Menon", grade: "III-B", method: "Cash", amount: 6400, receipt: "Receipt #4816", by: "Front Desk · Priya", status: "rejected", time: "Yesterday, 05:30 PM" },
];

function PaymentsPage() {
  const [tab, setTab] = useState<"digital" | "offline">("digital");
  const [rows, setRows] = useState(initialOffline);
  const pendingCount = rows.filter((r) => r.status === "pending").length;
  const approvedCount = rows.filter((r) => r.status === "approved").length;

  const decide = (id: string, status: "approved" | "rejected") => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    const row = rows.find((x) => x.id === id);
    if (status === "approved") {
      toast.success(`Payment approved · ${row?.receipt ?? id}`, {
        description: "Receipt issued and an immutable audit entry was written.",
      });
    } else {
      toast.error(`Payment rejected · ${row?.receipt ?? id}`, {
        description: "The cashier has been notified to re-verify the entry.",
      });
    }
  };

  const exportCsv = () => {
    const header = "receipt,student,grade,method,amount,recorded_by,status";
    const body = rows
      .map((r) => [r.receipt, r.name, r.grade, r.method, r.amount, r.by, r.status].join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([`${header}\n${body}`], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "payments-export.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Export ready", { description: `${rows.length} reconciliation rows downloaded.` });
  };


  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Payments"
        title="Omnichannel Payments"
        description="Live UPI collections and manual reconciliation in one console."
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTab((t) => (t === "digital" ? "offline" : "digital"))}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-sm font-medium transition hover:bg-secondary/80"
            >
              <Filter className="h-4 w-4" /> Filter
            </button>
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-sm font-medium transition hover:bg-secondary/80"
            >
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
        }
      />

      {/* Top metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="glass rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
                <div className="mt-1 text-2xl font-semibold tracking-tight">{m.value}</div>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary">
                <m.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div
              className={`mt-3 inline-flex items-center gap-1 text-[11px] font-medium ${
                m.changeType === "positive"
                  ? "text-success"
                  : m.changeType === "warning"
                    ? "text-warning"
                    : "text-muted-foreground"
              }`}
            >
              {m.changeType === "positive" && <TrendingUp className="h-3 w-3" />}
              {m.change}
            </div>
          </div>
        ))}
      </div>

      {/* Full-width segmented tabs */}
      <div className="glass grid w-full grid-cols-2 rounded-xl p-1">
        <TabBtn active={tab === "digital"} onClick={() => setTab("digital")}>
          <span className="flex items-center gap-2">
            📱 Digital (UPI)
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
              </span>
              Live
            </span>
          </span>
        </TabBtn>
        <TabBtn active={tab === "offline"} onClick={() => setTab("offline")}>
          💵 Offline · Reconciliation
          {pendingCount > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-warning/15 px-1.5 text-[10px] font-semibold text-warning">
              {pendingCount}
            </span>
          )}
        </TabBtn>
      </div>

      {tab === "digital" ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.538fr]">
          {/* Left column - Live UPI Feed */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  Live UPI Feed
                  <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] text-success">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                    </span>
                    Live
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">Zero platform fee · Settled instantly</div>
              </div>
            </div>
            <div className="space-y-3">
              {upiFeed.map((u, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card/60 px-4 py-3 transition hover:bg-secondary/60"
                >
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold shadow-sm"
                    style={{ backgroundColor: u.iconBg }}
                  >
                    {u.icon === "bolt" ? "⚡" : "↘"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground">
                      {u.payer} → {u.student} · {u.grade}
                    </div>
                    <div className="truncate text-[11px] text-muted-foreground">
                      {u.vpa} · {u.txnId}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-semibold text-foreground">₹{u.amount.toLocaleString("en-IN")}</div>
                    <div className="mt-0.5 flex items-center justify-end gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-success/25 bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
                        <CheckCircle2 className="h-3 w-3" /> Auto approved
                      </span>
                      <span className="text-[11px] text-muted-foreground">{u.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Today's UPI Collection */}
          <div className="glass flex flex-col rounded-2xl p-6">
            <div className="mb-5">
              <div className="text-sm font-semibold">Today's UPI Collection</div>
              <div className="text-xs text-muted-foreground">Real-time settlement summary</div>
            </div>
            <div className="flex-1 divide-y divide-border">
              {snapshotItems.map((item) => (
                <SnapshotRow key={item.label} label={item.label} value={item.value} icon={item.icon} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="glass overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between px-6 pt-5 pb-4">
            <div>
              <div className="text-sm font-semibold">Offline Reconciliation</div>
              <div className="text-xs text-muted-foreground">Approve or reject manual entries.</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-sm font-medium text-foreground">
                Pending <span className="text-muted-foreground">{pendingCount}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success/10 px-2.5 py-1 text-sm font-medium text-success">
                Approved today <span className="opacity-80">{approvedCount}</span>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-y border-border bg-secondary/40 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="px-6 py-3">Entry</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Mode</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Received By</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((r) => (
                  <tr key={r.id} className="transition hover:bg-secondary/40">
                    <td className="px-6 py-5">
                      <div className="font-semibold text-foreground">{r.id}</div>
                      <div className="text-[11px] text-muted-foreground">{r.receipt}</div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="font-semibold text-foreground">{r.name}</div>
                      <div className="text-[11px] text-muted-foreground">{r.grade}</div>
                    </td>
                    <td className="px-4 py-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px]">
                        <Banknote className="h-3 w-3" /> {r.method}
                      </span>
                    </td>
                    <td className="px-4 py-5 font-semibold">₹{r.amount.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-5">
                      <div className="text-sm text-foreground">{r.by}</div>
                      <div className="text-[11px] text-muted-foreground">{r.time}</div>
                    </td>
                    <td className="px-4 py-5">
                      <StatusPill status={r.status} />
                    </td>
                    <td className="px-6 py-5 text-right">
                      {r.status === "pending" ? (
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => decide(r.id, "approved")}
                            className="inline-flex items-center gap-1 rounded-lg bg-success/12 px-3 py-1.5 text-xs font-medium text-success transition hover:bg-success/20"
                          >
                            <CheckCircle2 className="h-3 w-3" /> Approve
                          </button>
                          <button
                            onClick={() => decide(r.id, "rejected")}
                            className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive/20"
                          >
                            <XCircle className="h-3 w-3" /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">Locked</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2 border-t border-border bg-secondary/40 px-6 py-3 text-[11px] text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            All manual entries are auto-audited. Approvals write immutable ledger entries in real time.
          </div>
        </div>
      )}
    </div>
  );
}

function SnapshotRow({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="text-xl font-semibold tracking-tight">{value}</span>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function StatusPill({ status }: { status: OfflineStatus }) {
  const map = {
    pending: { c: "text-warning", b: "border-warning/30", bg: "bg-warning/10", l: "Pending" },
    approved: { c: "text-success", b: "border-success/30", bg: "bg-success/10", l: "Approved" },
    rejected: { c: "text-destructive", b: "border-destructive/30", bg: "bg-destructive/10", l: "Rejected" },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border ${map.b} ${map.bg} px-2 py-0.5 text-[11px] font-medium ${map.c}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {map.l}
    </span>
  );
}
