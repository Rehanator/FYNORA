import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { feeIconMap, type FeeIconKey } from "@/components/fee/AnimatedFeeIcon";
import { LivingBackdrop } from "@/components/fee/LivingBackdrop";
import {
  Plus,
  Split,
  Sparkles,
  Shield,
  X,
  Check,
  Clock,
  Star,
  Users,
  Zap,
  ChevronDown,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const Route = createFileRoute("/fee-engine")({
  head: () => ({
    meta: [
      { title: "Fee Engine · FYNORA" },
      { name: "description", content: "Manage fee heads, EMI splits and automated waiver rules." },
      { property: "og:title", content: "Fee Engine" },
      { property: "og:description", content: "Dynamic fee rules and Edu-EMI splits for schools." },
    ],
  }),
  component: FeeEngine,
});

const toneStyles: Record<string, string> = {
  teal: "bg-teal-500/10 text-teal-400",
  blue: "bg-blue-500/10 text-blue-400",
  orange: "bg-orange-500/10 text-orange-400",
  purple: "bg-purple-500/10 text-purple-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
  rose: "bg-rose-500/10 text-rose-400",
};

const feeHeads: Array<{
  name: string; category: string; icon: FeeIconKey; amount: number;
  cycle: string; students: number; status: string; color: string;
}> = [
  { name: "Tuition Fee", category: "ALL GRADES", icon: "book", amount: 45000, cycle: "Quarterly", students: 1240, status: "Active", color: "teal" },
  { name: "Transport", category: "ALL GRADES", icon: "bus", amount: 12000, cycle: "Quarterly", students: 860, status: "Active", color: "blue" },
  { name: "Sports & Clubs", category: "CLASS X", icon: "trophy", amount: 4500, cycle: "Annually", students: 620, status: "Annual", color: "orange" },
  { name: "Lab & Materials", category: "CLASS IX - X", icon: "beaker", amount: 3800, cycle: "Annually", students: 980, status: "Active", color: "purple" },
  { name: "Meal Plan", category: "ALL GRADES", icon: "utensils", amount: 8600, cycle: "Monthly", students: 540, status: "Draft", color: "emerald" },
  { name: "Arts & Music", category: "CLASS VI - VIII", icon: "palette", amount: 2900, cycle: "Annually", students: 310, status: "Annual", color: "rose" },
];

type EditingFee = { name: string; amount: number; cycle: string };

function TiltCard({
  children,
  dimmed,
  active,
  onHoverChange,
}: {
  children: React.ReactNode;
  dimmed: boolean;
  active: boolean;
  onHoverChange: (hovered: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 220, damping: 18 });

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerEnter={() => onHoverChange(true)}
      onPointerLeave={() => {
        onHoverChange(false);
        mx.set(0);
        my.set(0);
      }}
      animate={{
        opacity: dimmed ? 0.4 : 1,
        y: active ? -6 : 0,
        scale: active ? 1.02 : 1,
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`glass group relative flex flex-col rounded-2xl border p-4 will-change-transform ${
        active ? "border-zinc-700 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.65)]" : "border-zinc-800/50"
      }`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.16),transparent_70%)]"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />
      <div className="relative flex flex-1 flex-col">{children}</div>
    </motion.div>
  );
}

type Student = { id: string; name: string; grade: string; initials: string; totalFee: number };

const students: Student[] = [
  { id: "STU-1042", name: "Aarav Sharma", grade: "10-B", initials: "AS", totalFee: 60000 },
  { id: "STU-1088", name: "Diya Nair", grade: "9-A", initials: "DN", totalFee: 85000 },
  { id: "STU-1130", name: "Kabir Mehta", grade: "8-C", initials: "KM", totalFee: 45000 },
  { id: "STU-1176", name: "Ishita Rao", grade: "12-A", initials: "IR", totalFee: 92000 },
  { id: "STU-1204", name: "Vivaan Gupta", grade: "7-B", initials: "VG", totalFee: 52000 },
  { id: "STU-1259", name: "Anaya Krishnan", grade: "11-C", initials: "AK", totalFee: 78000 },
];

function FeeEngine() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<EditingFee | null>(null);
  const [split, setSplit] = useState(false);
  const [installments, setInstallments] = useState(4);
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0]);
  const [studentOpen, setStudentOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const total = selectedStudent.totalFee;


  return (
    <div className="space-y-6">
      <LivingBackdrop dimmed={hoveredCard !== null} />
      <PageHeader
        eyebrow="Rules & Structures"
        title="Fee Engine"
        description="Design fee heads, split large payments into micro-EMIs, and automate waivers."
        actions={
          <button
            onClick={() => {
              setEditingFee(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110"
          >
            <Plus className="h-4 w-4" /> Create New Fee
          </button>
        }
      />

      {/* Active fees grid */}
      <div>
        <div className="mb-3 text-sm font-semibold">Active Fee Heads</div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {feeHeads.map((f) => {
            const AnimIcon = feeIconMap[f.icon];
            const tone = toneStyles[f.color];
            const statusStyle =
              f.status === "Active"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border-zinc-500/20 bg-zinc-500/10 text-zinc-400";
            const isHovered = hoveredCard === f.name;
            const isDimmed = hoveredCard !== null && !isHovered;
            return (
              <TiltCard
                key={f.name}
                dimmed={isDimmed}
                active={isHovered}
                onHoverChange={(v) => setHoveredCard(v ? f.name : null)}
              >
                <div className="flex items-start justify-between">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
                    <AnimIcon hovered={isHovered} className="h-5 w-5" />
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusStyle}`}>
                    {f.status}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{f.category}</div>
                  <div className="mt-0.5 text-sm font-medium text-foreground">{f.name}</div>
                </div>
                <div className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                  ₹{f.amount.toLocaleString("en-IN")}
                </div>
                <div className="mt-auto flex items-center justify-between pt-3 text-[11px] text-zinc-500">
                  <span>{f.students} students · {f.cycle}</span>
                  <button
                    onClick={() => {
                      setEditingFee({ name: f.name, amount: f.amount, cycle: f.cycle });
                      setIsModalOpen(true);
                    }}
                    className="rounded-lg px-2 py-1 text-xs font-medium text-zinc-500 transition-colors hover:text-cyan-400"
                  >
                    Manage →
                  </button>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>


      {/* Edu-EMI Smart Split */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/40">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-500 opacity-10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-teal-400 opacity-10 blur-3xl" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-zinc-50">Smart Split — turn big fees into micro-EMIs</h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-400">
              Pick a student, choose the number of installments, and instantly break down heavy annual
              fees into interest-free monthly slices.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-teal-400/40 bg-teal-400/10 px-3 py-1 text-[11px] font-medium text-teal-300 shadow-[0_0_20px_-4px] shadow-teal-400/40">
            <Sparkles className="h-3 w-3" /> AI-Powered Split
          </span>
        </div>

        <div className="relative mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-zinc-400">Student</label>
              <Popover open={studentOpen} onOpenChange={setStudentOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="mt-1.5 flex w-full items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-left transition hover:border-zinc-700"
                  >
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-teal-400 text-xs font-semibold text-zinc-950">
                      {selectedStudent.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-foreground">
                        {selectedStudent.name} · {selectedStudent.grade}
                      </div>
                      <div className="text-[11px] text-zinc-500">Annual bundled fee</div>
                    </div>
                    <div className="text-right text-sm font-semibold tabular-nums text-zinc-100">
                      ₹{selectedStudent.totalFee.toLocaleString("en-IN")}
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-[var(--radix-popover-trigger-width)] border-zinc-800 bg-zinc-950 p-0 text-zinc-100"
                >
                  <Command className="bg-zinc-950 text-zinc-100 [&_[cmdk-input-wrapper]]:border-zinc-800">
                    <CommandInput
                      placeholder="Search students by name or roll..."
                      className="text-zinc-100 placeholder:text-zinc-500"
                    />
                    <CommandList>
                      <CommandEmpty className="py-6 text-center text-sm text-zinc-500">
                        No students found.
                      </CommandEmpty>
                      <CommandGroup>
                        {students.map((s) => (
                          <CommandItem
                            key={s.id}
                            value={`${s.name} ${s.grade} ${s.id}`}
                            onSelect={() => {
                              setSelectedStudent(s);
                              setSplit(false);
                              setStudentOpen(false);
                            }}
                            className="flex items-center gap-3 rounded-lg px-2 py-2 text-zinc-200 data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-50 hover:bg-zinc-800"
                          >
                            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-teal-400 text-xs font-semibold text-zinc-950">
                              {s.initials}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-medium">{s.name}</div>
                              <div className="text-[11px] text-zinc-500">
                                {s.grade} · {s.id}
                              </div>
                            </div>
                            <div className="text-right text-xs font-semibold tabular-nums text-zinc-300">
                              ₹{s.totalFee.toLocaleString("en-IN")}
                            </div>
                            {s.id === selectedStudent.id && (
                              <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>


            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] uppercase tracking-wider text-zinc-400">Installments</label>
                <button
                  onClick={() => {
                    setInstallments(6);
                    setSplit(true);
                    toast.success("AI suggested a 6-month split", {
                      description: "Based on this family's past payment behaviour and income cycle.",
                    });
                  }}
                  className="text-[11px] font-medium text-cyan-400 hover:underline"
                >
                  ✨ AI Auto-Suggest
                </button>
              </div>
              <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4">
                <Slider
                  min={2}
                  max={12}
                  step={1}
                  value={[installments]}
                  onValueChange={(v) => setInstallments(v[0])}
                  className="[&_[data-orientation=horizontal]]:bg-zinc-800 [&_span[data-orientation=horizontal]>span]:bg-cyan-500 [&_[role=slider]]:border-cyan-400 [&_[role=slider]]:bg-zinc-950"
                />
                <div className="mt-3 flex justify-between text-[11px] text-zinc-500">
                  <span>2 months</span>
                  <span className="font-medium text-cyan-400">{installments} months</span>
                  <span>12 months</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSplit(true);
                toast.success(`Plan generated · ${installments} installments`, {
                  description: "Payment plan sent to the parent on WhatsApp.",
                });
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:shadow-[0_0_28px_-4px] hover:shadow-cyan-400/60 hover:brightness-105"
            >
              <Split className="h-4 w-4" /> Generate Plan & Notify Parent →
            </button>
            <button
              onClick={() => {
                setSplit(false);
                setInstallments(4);
                toast("Split reset to default");
              }}
              className="w-full text-center text-xs text-zinc-500 transition hover:text-zinc-300"
            >
              Reset Split
            </button>
          </div>

          {/* Result panel */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-zinc-100">Payment Plan Preview</div>
              {split ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                  <Check className="h-3 w-3" /> Ready to notify parent via WhatsApp
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-800/50 px-2 py-0.5 text-[10px] text-zinc-400">
                  Awaiting generation
                </span>
              )}
            </div>
            <div
              className={`mt-4 grid gap-3 ${
                installments <= 4 ? "grid-cols-2" : "grid-cols-3"
              }`}
            >
              {Array.from({ length: installments }).map((_, i) => {
                const amount = Math.round(total / installments);
                const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 text-center"
                    style={{
                      opacity: split ? 1 : 0.35,
                      transform: split ? "translateY(0)" : "translateY(4px)",
                      transition: `all 300ms ${i * 60}ms`,
                    }}
                  >
                    <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">EMI {i + 1}</div>
                    <div className="mt-1 text-xl font-bold tabular-nums text-zinc-50">₹{amount.toLocaleString("en-IN")}</div>
                    <div className="mt-1 text-[11px] text-zinc-500">Due {months[i]} 5</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              <span>0% Interest · Zero hidden charges</span>
              <span className="font-semibold tabular-nums">Total ₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>


      {/* Waiver Rules */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.82_0.12_300)] to-[oklch(0.82_0.13_220)] text-[oklch(0.2_0.03_260)]">
              <Shield className="h-5 w-5" strokeWidth={2.4} />
            </div>
            <div>
              <div className="text-sm font-semibold">Waiver Rules Engine</div>
              <div className="text-xs text-muted-foreground">Fair, automated penalties and grace periods.</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.55_0.16_155_/_0.35)] bg-[oklch(0.55_0.16_155_/_0.12)] px-3 py-1 text-[11px] font-medium text-[oklch(0.45_0.15_155)]">
            <Zap className="h-3 w-3" /> Automation Active
          </span>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <RuleToggle
            icon={Clock}
            title="First-Time Late Payer Grace Period"
            desc="Waive the late-fee automatically for parents on their first delayed payment (up to 5 days)."
            impact="APPLIED TO 34 STUDENTS THIS TERM"
            defaultOn
          />
          <RuleToggle
            icon={Shield}
            title="Strict Penalty for Habitual Defaulters"
            desc="After 3 late payments in 6 months, apply escalating penalties and lock EMI splits."
            impact="CURRENTLY WOULD TRIGGER FOR 18 ACCOUNTS"
            strict
            defaultOn
          />
          <RuleToggle
            icon={Star}
            title="Scholarship Auto-Waive"
            desc="Skip transport and activity fees for merit and need-based scholarship holders."
            impact="9 CANDIDATES IDENTIFIED"
          />
          <RuleToggle
            icon={Users}
            title="Sibling Discount"
            desc="Automatically deduct 8% from tuition when a sibling is enrolled in the same academic year."
            impact="₹1.8L SAVED FOR 62 FAMILIES"
            defaultOn
          />
        </div>
      </div>

      {isModalOpen && <FeeModal editingFee={editingFee} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

function RuleToggle({
  icon: Icon,
  title,
  desc,
  impact,
  strict,
  defaultOn,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  impact: string;
  strict?: boolean;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`flex items-start justify-between gap-4 rounded-xl border p-4 text-left transition hover:-translate-y-0.5 ${
        on ? "border-[oklch(0.85_0.12_180_/_0.4)] bg-[oklch(0.85_0.12_180_/_0.06)]" : "border-black/[0.07] bg-black/[0.04]"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className={`grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.88_0.14_165)] to-[oklch(0.82_0.13_220)] text-[oklch(0.2_0.03_260)] ${on ? "opacity-100" : "opacity-70"}`}>
            <Icon className="h-4 w-4" strokeWidth={2.4} />
          </div>
          <div className="text-sm font-medium">{title}</div>
          {strict && (
            <span className="rounded-full border border-[oklch(0.62_0.22_25_/_0.35)] bg-[oklch(0.62_0.22_25_/_0.10)] px-2 py-0.5 text-[10px] font-semibold text-[oklch(0.55_0.2_25)]">
              Strict
            </span>
          )}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
        <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[oklch(0.55_0.14_160)]">
          {impact}
        </div>
      </div>
      <span
        className={`relative mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
          on ? "bg-[oklch(0.55_0.16_155)]" : "bg-black/[0.09]"
        }`}
      >
        <span
          className={`absolute h-5 w-5 rounded-full bg-white shadow transition ${on ? "left-[22px]" : "left-0.5"}`}
        />
      </span>
    </button>
  );
}

function FeeModal({ editingFee, onClose }: { editingFee: EditingFee | null; onClose: () => void }) {
  const isEditing = editingFee !== null;
  const [name, setName] = useState(editingFee?.name ?? "");
  const [amount, setAmount] = useState(editingFee ? String(editingFee.amount) : "");
  const [cycle, setCycle] = useState(editingFee?.cycle ?? "Monthly");
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="glass-strong w-full max-w-lg rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-semibold">{isEditing ? "Edit Fee Head" : "Create New Fee"}</div>
            <div className="text-xs text-muted-foreground">
              {isEditing ? "Update the details of this fee head." : "Define a new fee head for your school."}
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-black/[0.07]">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 space-y-3">
          <Field label="Fee Name" placeholder="e.g. Robotics Club" value={name} onChange={setName} />
          <Field label="Amount (₹)" placeholder="e.g. 3500" value={amount} onChange={setAmount} />
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Cycle</label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {["Monthly", "Quarterly", "Annually"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCycle(c)}
                  className={`rounded-lg border px-3 py-2 text-sm transition ${
                    cycle === c
                      ? "border-[oklch(0.85_0.12_180_/_0.6)] bg-[oklch(0.85_0.12_180_/_0.14)] font-medium"
                      : "border-black/[0.07] bg-black/[0.04] hover:border-[oklch(0.85_0.12_180_/_0.4)] hover:bg-[oklch(0.85_0.12_180_/_0.08)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-xl border border-black/[0.07] bg-black/[0.04] px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              if (isEditing) {
                toast.success("Fee head updated", { description: `${name || editingFee.name} saved successfully.` });
              } else {
                toast.success("Fee head created", { description: `New ${cycle.toLowerCase()} fee added to your structure.` });
              }
            }}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            {isEditing ? "Save Changes" : "Create Fee"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-black/[0.07] bg-black/[0.04] px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-[oklch(0.85_0.12_180_/_0.5)] focus:outline-none"
      />
    </div>
  );
}
