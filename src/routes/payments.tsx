import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
  ChevronDown,
  Check,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AnimatePresence, motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DATE_FILTERS = ["Today", "Yesterday", "Last 7 Days", "This Month"] as const;
type DateFilter = (typeof DATE_FILTERS)[number];


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

type UpiRow = {
  id: string;
  payer: string;
  student: string;
  grade: string;
  vpa: string;
  txnId: string;
  amount: number;
  icon: "bolt" | "incoming";
  iconBg: string;
  createdAt: number;
};

const initialUpiFeed: UpiRow[] = [
  {
    id: "TXN-9821245",
    payer: "Mrs. Sharma",
    student: "Riya Sharma",
    grade: "IX-B",
    vpa: "priya.k@okhdfc",
    txnId: "TXN-9821245",
    amount: 15000,
    icon: "bolt",
    iconBg: "oklch(0.88 0.14 165)",
    createdAt: -12_000,
  },
  {
    id: "TXN-9821244",
    payer: "Mr. Reddy",
    student: "Isha Reddy",
    grade: "VII-A",
    vpa: "rahul.m@ybl",
    txnId: "TXN-9821244",
    amount: 8600,
    icon: "incoming",
    iconBg: "oklch(0.82 0.13 220)",
    createdAt: -34_000,
  },
  {
    id: "TXN-9821243",
    payer: "Mrs. Menon",
    student: "Kabir Menon",
    grade: "XI-C",
    vpa: "anita.m@paytm",
    txnId: "TXN-9821243",
    amount: 22400,
    icon: "bolt",
    iconBg: "oklch(0.82 0.12 300)",
    createdAt: -60_000,
  },
  {
    id: "TXN-9821242",
    payer: "Mr. Khan",
    student: "Zoya Khan",
    grade: "V-B",
    vpa: "zafar.k@upi",
    txnId: "TXN-9821242",
    amount: 4500,
    icon: "incoming",
    iconBg: "oklch(0.82 0.14 70)",
    createdAt: -120_000,
  },
];

const FAMILIES = [
  { surname: "Gupta", parent: "Mr.", child: "Rohan" },
  { surname: "Iyer", parent: "Mrs.", child: "Aditi" },
  { surname: "Nair", parent: "Mr.", child: "Arjun" },
  { surname: "Bansal", parent: "Mrs.", child: "Meera" },
  { surname: "Chauhan", parent: "Mr.", child: "Dev" },
  { surname: "Pillai", parent: "Mrs.", child: "Tara" },
  { surname: "Deshmukh", parent: "Mr.", child: "Yash" },
  { surname: "Saxena", parent: "Mrs.", child: "Ira" },
  { surname: "Joshi", parent: "Mr.", child: "Kunal" },
  { surname: "Ahuja", parent: "Mrs.", child: "Naina" },
];
const HANDLES = ["@okhdfc", "@ybl", "@paytm", "@upi", "@okaxis", "@ibl"];
const GRADES = ["III-A", "V-B", "VII-A", "VIII-C", "IX-B", "X-A", "XI-C", "XII-B"];
const AVATAR_BG = [
  "oklch(0.88 0.14 165)",
  "oklch(0.82 0.13 220)",
  "oklch(0.82 0.12 300)",
  "oklch(0.82 0.14 70)",
  "oklch(0.85 0.13 140)",
  "oklch(0.83 0.13 20)",
];

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

let txnSeq = 9821246;

function makeUpiRow(): UpiRow {
  const fam = pick(FAMILIES);
  const txnId = `TXN-${txnSeq++}`;
  return {
    id: `${txnId}-${Date.now()}`,
    payer: `${fam.parent} ${fam.surname}`,
    student: `${fam.child} ${fam.surname}`,
    grade: pick(GRADES),
    vpa: `${fam.child.toLowerCase()}.${fam.surname[0].toLowerCase()}${pick(HANDLES)}`,
    txnId,
    amount: Math.round((Math.floor(Math.random() * 28000) + 2000) / 100) * 100,
    icon: Math.random() > 0.5 ? "bolt" : "incoming",
    iconBg: pick(AVATAR_BG),
    createdAt: Date.now(),
  };
}

function relativeTime(createdAt: number, now: number) {
  const seconds = Math.max(0, Math.round((now - createdAt) / 1000));
  if (seconds < 5) return "Just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}


const snapshotIcons = {
  collected: Wallet,
  transactions: CheckCircle2,
  avgTicket: TrendingUp,
  feesSaved: CreditCard,
};


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
  const [dateFilter, setDateFilter] = useState<DateFilter>("Today");
  const [rows, setRows] = useState(initialOffline);
  const pendingCount = rows.filter((r) => r.status === "pending").length;
  const approvedCount = rows.filter((r) => r.status === "approved").length;

  // Base values per date filter
  const FILTER_BASE: Record<DateFilter, { collection: number; upi: number; offline: number; pending: number }> = {
    "Today": { collection: 482300, upi: 326, offline: 112800, pending: 18 },
    "Yesterday": { collection: 415000, upi: 298, offline: 95000, pending: 0 },
    "Last 7 Days": { collection: 3245000, upi: 2150, offline: 850000, pending: 5 },
    "This Month": { collection: 12500000, upi: 8400, offline: 2400000, pending: 12 },
  };

  // Live metric simulation
  const [todaysCollection, setTodaysCollection] = useState(FILTER_BASE["Today"].collection);
  const [upiTransactions, setUpiTransactions] = useState(FILTER_BASE["Today"].upi);
  const [offlineEarning, setOfflineEarning] = useState(FILTER_BASE["Today"].offline);
  const [pendingOffline, setPendingOffline] = useState(FILTER_BASE["Today"].pending);

  // Reset metrics whenever the date filter changes
  useEffect(() => {
    const base = FILTER_BASE[dateFilter];
    setTodaysCollection(base.collection);
    setUpiTransactions(base.upi);
    setOfflineEarning(base.offline);
    setPendingOffline(base.pending);
  }, [dateFilter]);

  useEffect(() => {
    // Historical ranges are static — only "Today" ticks live
    if (dateFilter !== "Today") return;
    let tick = 0;
    const intervalMs = Math.floor(Math.random() * 2000) + 3000; // 3–5 seconds
    const interval = setInterval(() => {
      setTodaysCollection((prev) => prev + Math.floor(Math.random() * 1100) + 400);
      setUpiTransactions((prev) => prev + (Math.random() > 0.5 ? 2 : 1));
      if (tick % 2 === 0) {
        setPendingOffline((prev) => prev + 1);
      }
      tick++;
    }, intervalMs);
    return () => clearInterval(interval);
  }, [dateFilter]);


  // Live UPI feed simulation (webhook-style inbound payments)
  const [feed, setFeed] = useState<UpiRow[]>(initialUpiFeed);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const mountedAt = Date.now();
    setFeed((prev) => prev.map((r) => ({ ...r, createdAt: r.createdAt > 0 ? r.createdAt : mountedAt + r.createdAt })));
    setNow(mountedAt);

    const clock = setInterval(() => setNow(Date.now()), 1000);
    const feedTimer = setInterval(
      () => setFeed((prev) => [makeUpiRow(), ...prev].slice(0, 4)),
      Math.floor(Math.random() * 2000) + 6000, // 6–8 seconds
    );
    return () => {
      clearInterval(clock);
      clearInterval(feedTimer);
    };
  }, []);



  // Today's UPI Collection snapshot simulation
  const [collectedToday, setCollectedToday] = useState(214850);
  const [totalTxns, setTotalTxns] = useState(86);
  const [feesSaved, setFeesSaved] = useState(4297);
  const avgTicket = Math.round(collectedToday / totalTxns);

  useEffect(() => {
    const intervalMs = Math.floor(Math.random() * 2000) + 4000; // 4–6 seconds
    const interval = setInterval(() => {
      const amount = Math.floor(Math.random() * 4500) + 500; // ₹500–₹5,000
      setCollectedToday((prev) => prev + amount);
      setTotalTxns((prev) => prev + 1);
      setFeesSaved((prev) => prev + Math.round(amount * 0.02));
    }, intervalMs);
    return () => clearInterval(interval);
  }, []);



  const metrics = [
    {
      label: "Today's Collection",
      value: todaysCollection,
      prefix: "₹",
      change: "↑ +12% vs yesterday",
      changeType: "positive" as const,
      icon: Wallet,
    },
    {
      label: "UPI Transactions",
      value: upiTransactions,
      change: "Zero-fee routed",
      changeType: "neutral" as const,
      icon: Smartphone,
    },
    {
      label: "Offline Earning",
      value: offlineEarning,
      prefix: "₹",
      change: "Awaiting bank deposit",
      changeType: "neutral" as const,
      icon: Banknote,
    },
    {
      label: "Pending Offline",
      value: pendingOffline,
      change: "Requires reconciliation",
      changeType: "warning" as const,
      icon: Percent,
    },
  ];


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
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-sm font-medium transition hover:bg-secondary/80 focus:outline-none">
                <Filter className="h-4 w-4" /> {dateFilter}
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-44 border-gray-800 bg-[#111111] text-white"
              >
                <DropdownMenuLabel className="text-[11px] uppercase tracking-wider text-zinc-500">
                  Date range
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                {DATE_FILTERS.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onSelect={() => {
                      setDateFilter(option);
                      toast.success(`Filter applied · ${option}`, {
                        description: "Payment records scoped to the selected range.",
                      });
                    }}
                    className="cursor-pointer text-sm text-white focus:bg-zinc-800 focus:text-white data-[highlighted]:bg-zinc-800"
                  >
                    <span className="flex-1">{option}</span>
                    {dateFilter === option && <Check className="h-3.5 w-3.5 text-primary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
                <div className="mt-1 text-2xl font-semibold tracking-tight">
                  <NumberTicker
                    value={m.value}
                    prefix={m.prefix}
                    duration={1.2}
                    stagger={0.03}
                    startOnView={false}
                    format={(v) => v.toLocaleString("en-IN")}
                  />
                </div>
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
              <AnimatePresence initial={false}>
                {feed.map((u) => (
                  <motion.div
                    key={u.id}
                    layout
                    initial={{ opacity: 0, y: -20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
                        <span className="text-[11px] text-muted-foreground">
                          {now ? relativeTime(u.createdAt, now) : "Just now"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

          {/* Right column - Today's UPI Collection */}
          <div className="glass flex flex-col rounded-2xl p-6">
            <div className="mb-5">
              <div className="text-sm font-semibold">Today's UPI Collection</div>
              <div className="text-xs text-muted-foreground">Real-time settlement summary</div>
            </div>
            <div className="flex-1 divide-y divide-border">
              <SnapshotRow label="Collected Today" value={collectedToday} prefix="₹" icon={snapshotIcons.collected} />
              <SnapshotRow label="Total Transactions" value={totalTxns} icon={snapshotIcons.transactions} />
              <SnapshotRow label="Avg. Ticket Size" value={avgTicket} prefix="₹" icon={snapshotIcons.avgTicket} />
              <SnapshotRow label="Convenience Fees Saved" value={feesSaved} prefix="₹" icon={snapshotIcons.feesSaved} />
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

function SnapshotRow({
  label,
  value,
  prefix,
  icon: Icon,
}: {
  label: string;
  value: number;
  prefix?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="text-xl font-semibold tracking-tight">
        <NumberTicker
          value={value}
          prefix={prefix}
          duration={1.2}
          stagger={0.03}
          startOnView={false}
          format={(v: number) => v.toLocaleString("en-IN")}
        />
      </span>
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
