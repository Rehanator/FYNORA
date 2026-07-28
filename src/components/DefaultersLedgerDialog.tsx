import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Row = {
  id: string;
  name: string;
  grade: string;
  due: string;
  days: number;
  level: string;
  contact: string;
  lastPaid: string;
};

const ledger: Row[] = [
  { id: "STU-104", name: "Aarav Sharma", grade: "10-B", due: "₹48,500", days: 42, level: "high", contact: "+91 98674 87919", lastPaid: "12 Apr 2026" },
  { id: "STU-158", name: "Meera Iyer", grade: "10-A", due: "₹42,100", days: 38, level: "high", contact: "+91 98211 44320", lastPaid: "18 Apr 2026" },
  { id: "STU-217", name: "Isha Reddy", grade: "9-A", due: "₹36,200", days: 31, level: "high", contact: "+91 99304 11276", lastPaid: "25 Apr 2026" },
  { id: "STU-273", name: "Devansh Kapoor", grade: "9-C", due: "₹34,800", days: 29, level: "high", contact: "+91 90042 55810", lastPaid: "27 Apr 2026" },
  { id: "STU-089", name: "Kabir Menon", grade: "12-C", due: "₹28,900", days: 24, level: "med", contact: "+91 98330 77219", lastPaid: "02 May 2026" },
  { id: "STU-095", name: "Anaya Bose", grade: "11-A", due: "₹26,400", days: 22, level: "med", contact: "+91 97022 31884", lastPaid: "04 May 2026" },
  { id: "STU-347", name: "Vihaan Nair", grade: "7-B", due: "₹21,900", days: 20, level: "med", contact: "+91 99871 20034", lastPaid: "06 May 2026" },
  { id: "STU-311", name: "Zoya Khan", grade: "8-A", due: "₹19,400", days: 18, level: "med", contact: "+91 98191 66452", lastPaid: "08 May 2026" },
  { id: "STU-421", name: "Sara Malhotra", grade: "12-A", due: "₹17,650", days: 14, level: "low", contact: "+91 96534 90017", lastPaid: "12 May 2026" },
  { id: "STU-512", name: "Arjun Verma", grade: "8-C", due: "₹15,200", days: 11, level: "low", contact: "+91 90210 45673", lastPaid: "15 May 2026" },
  { id: "STU-402", name: "Rohan Patel", grade: "11-B", due: "₹12,750", days: 9, level: "low", contact: "+91 98765 43210", lastPaid: "17 May 2026" },
  { id: "STU-608", name: "Priya Chawla", grade: "10-C", due: "₹9,850", days: 7, level: "low", contact: "+91 99887 22119", lastPaid: "19 May 2026" },
  { id: "STU-714", name: "Nikhil Rao", grade: "7-A", due: "₹8,400", days: 6, level: "low", contact: "+91 98450 30028", lastPaid: "20 May 2026" },
  { id: "STU-820", name: "Tanvi Joshi", grade: "9-B", due: "₹7,300", days: 5, level: "low", contact: "+91 97400 55613", lastPaid: "21 May 2026" },
  { id: "STU-903", name: "Ayaan Qureshi", grade: "12-B", due: "₹6,150", days: 4, level: "low", contact: "+91 98203 71145", lastPaid: "22 May 2026" },
];

const PAGE_SIZE = 6;

function Urgency({ level }: { level: string }) {
  const map: Record<string, [string, string]> = {
    high: ["oklch(0.55_0.22_25)", "Critical"],
    med: ["oklch(0.65_0.16_70)", "High"],
    low: ["oklch(0.6_0.13_200)", "Watch"],
  };
  const [color, label] = map[level] ?? map.low;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold"
      style={{
        color,
        background: `color-mix(in oklab, ${color} 14%, transparent)`,
        border: `1px solid color-mix(in oklab, ${color} 35%, transparent)`,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

export function DefaultersLedgerDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("all");
  const [page, setPage] = useState(0);

  const grades = useMemo(
    () => Array.from(new Set(ledger.map((r) => r.grade))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ledger.filter(
      (r) =>
        (grade === "all" || r.grade === grade) &&
        (q === "" || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q))
    );
  }, [query, grade]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const rows = filtered.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);

  const totalDue = filtered.reduce(
    (sum, r) => sum + Number(r.due.replace(/[^\d]/g, "")),
    0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass max-w-5xl gap-0 overflow-hidden border-black/[0.06] p-0">
        <DialogHeader className="border-b border-black/[0.06] px-6 py-5 text-left">
          <DialogTitle className="text-base font-semibold">Defaulters Ledger</DialogTitle>
          <DialogDescription className="text-xs">
            {filtered.length} students · ₹{totalDue.toLocaleString("en-IN")} outstanding
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 border-b border-black/[0.06] px-6 py-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder="Search student or ID…"
              className="w-full rounded-xl border border-black/[0.06] bg-black/[0.02] py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:bg-black/[0.04]"
            />
          </div>
          <select
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
              setPage(0);
            }}
            className="rounded-xl border border-black/[0.06] bg-black/[0.02] px-3 py-2 text-sm outline-none transition focus:bg-black/[0.04] sm:w-48"
          >
            <option value="all">Filter by Grade — All</option>
            {grades.map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>
        </div>

        <div className="max-h-[380px] overflow-y-auto defaulters-scroll px-2">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-background/80 backdrop-blur">
              <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:text-left [&>th]:text-[10px] [&>th]:font-semibold [&>th]:uppercase [&>th]:tracking-wider [&>th]:text-muted-foreground">
                <th>Student</th>
                <th>Grade</th>
                <th>Overdue</th>
                <th>Days late</th>
                <th>Last paid</th>
                <th>Contact</th>
                <th className="!text-right">Urgency</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-black/[0.05] transition hover:bg-black/[0.03] [&>td]:px-4 [&>td]:py-3"
                >
                  <td>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.id}</div>
                  </td>
                  <td className="text-muted-foreground">{r.grade}</td>
                  <td className="font-semibold">{r.due}</td>
                  <td className="text-muted-foreground">{r.days}</td>
                  <td className="text-muted-foreground">{r.lastPaid}</td>
                  <td className="text-muted-foreground">{r.contact}</td>
                  <td className="text-right">
                    <Urgency level={r.level} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No students match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-black/[0.06] px-6 py-4">
          <span className="text-xs text-muted-foreground">
            Page {current + 1} of {pageCount}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(0, current - 1))}
              disabled={current === 0}
              className="inline-flex items-center gap-1 rounded-lg border border-black/[0.06] bg-black/[0.02] px-3 py-1.5 text-xs font-medium transition hover:bg-black/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(pageCount - 1, current + 1))}
              disabled={current >= pageCount - 1}
              className="inline-flex items-center gap-1 rounded-lg border border-black/[0.06] bg-black/[0.02] px-3 py-1.5 text-xs font-medium transition hover:bg-black/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
