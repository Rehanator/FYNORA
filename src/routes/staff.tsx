import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Award, Mail, Phone, ArrowRight, UserPlus, Briefcase } from "lucide-react";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import staff0031 from "@/assets/staff/staff-0031.jpg.asset.json";
import staff0032 from "@/assets/staff/staff-0032.jpg.asset.json";
import staff0033 from "@/assets/staff/staff-0033.jpg.asset.json";
import staff0034 from "@/assets/staff/staff-0034.jpg.asset.json";
import staff0035 from "@/assets/staff/staff-0035.jpg.asset.json";
import staff0043 from "@/assets/staff/staff-0043.jpg.asset.json";
import staff0045 from "@/assets/staff/staff-0045.jpg.asset.json";
import staff0046 from "@/assets/staff/staff-0046.jpg.asset.json";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Staff Directory · FYNORA" },
      { name: "description", content: "Trusted finance professionals managing every school transaction with accuracy and transparency." },
      { property: "og:title", content: "Staff Directory" },
      { property: "og:description", content: "Every staff card, every specialization, every year of experience." },
    ],
  }),
  component: Staff,
});

type Member = {
  name: string;
  role: string;
  dept: string;
  years: number;
  email: string;
  phone: string;
  dotColor: string;
  avatar: string;
};

const initialStaff: Member[] = [
  { name: "Ravi Narayanan", role: "Senior Accountant", dept: "Finance", years: 12, email: "ravi.n@smartschool.edu", phone: "+91 98765 12345", dotColor: "bg-emerald-400", avatar: staff0032.url },
  { name: "Priya Menon", role: "Front Desk Lead", dept: "Reception", years: 6, email: "priya.m@smartschool.edu", phone: "+91 98213 55401", dotColor: "bg-fuchsia-400", avatar: staff0043.url },
  { name: "Suresh Iyer", role: "Bus Coordinator", dept: "Transport", years: 10, email: "suresh.i@smartschool.edu", phone: "+91 90234 66112", dotColor: "bg-amber-400", avatar: staff0034.url },
  { name: "Anita Kapoor", role: "Principal Admin", dept: "Administration", years: 18, email: "anita.k@smartschool.edu", phone: "+91 99887 12200", dotColor: "bg-violet-400", avatar: staff0033.url },
  { name: "Meera Joshi", role: "Fee Reconciliation Officer", dept: "Finance", years: 8, email: "meera.j@smartschool.edu", phone: "+91 98450 78990", dotColor: "bg-emerald-400", avatar: staff0031.url },
  { name: "Arjun Rathore", role: "IT Systems Admin", dept: "Technology", years: 5, email: "arjun.r@smartschool.edu", phone: "+91 91234 45566", dotColor: "bg-cyan-400", avatar: staff0035.url },
  { name: "Fatima Sheikh", role: "Scholarship Coordinator", dept: "HR", years: 7, email: "fatima.s@smartschool.edu", phone: "+91 93450 22110", dotColor: "bg-pink-400", avatar: staff0045.url },
  { name: "David Thomas", role: "Cheque Reconciliation Analyst", dept: "Compliance", years: 4, email: "david.t@smartschool.edu", phone: "+91 97766 55211", dotColor: "bg-rose-400", avatar: staff0046.url },
];


const FILTERS = ["All", "Finance", "Administration", "Transport", "Reception", "Technology", "Compliance", "HR"] as const;
type Filter = (typeof FILTERS)[number];

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, bounce: 0.4, duration: 0.8, delay: i * 0.08 },
  }),
};

const TeamMemberCard = React.memo(({ member, index, onView }: { member: Member; index: number; onView: (m: Member) => void }) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      className="glass group relative rounded-2xl p-6 transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(34,211,238,0.45)]"
    >
      <div className="flex flex-col gap-5">

        {/* Header: avatar + name + role */}
        <div className="flex items-center gap-4">
          <img
            src={member.avatar}
            alt={member.name}
            className="h-14 w-14 rounded-full border-2 border-border object-cover shadow-lg"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-base font-semibold tracking-tight text-foreground">{member.name}</div>
            <div className="truncate text-xs text-muted-foreground">{member.role}</div>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              <span className={`h-1.5 w-1.5 rounded-full ${member.dotColor}`} />
              {member.dept}
            </div>
          </div>
        </div>

        {/* Experience badge */}
        <div className="flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2">
          <Award className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">{member.years} Years</span>
          <span className="text-xs text-muted-foreground">Experience</span>
        </div>

        {/* Contact */}
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 truncate">
            <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            {member.phone}
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        {/* Footer */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => onView(member)}
            className="group inline-flex items-center gap-1 text-xs font-medium text-primary transition hover:opacity-80"
          >
            View Profile
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});
TeamMemberCard.displayName = "TeamMemberCard";

const DOT_COLORS = ["bg-emerald-400", "bg-fuchsia-400", "bg-amber-400", "bg-violet-400", "bg-cyan-400", "bg-pink-400", "bg-rose-400"];

const emptyForm = { name: "", role: "", dept: "", years: "", email: "", phone: "" };

function Staff() {
  const [active, setActive] = useState<Filter>("All");
  const [members, setMembers] = useState<Member[]>(initialStaff);
  const [selected, setSelected] = useState<Member | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(
    () => (active === "All" ? members : members.filter((s) => s.dept === active)),
    [active, members],
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim() || !form.email.trim()) {
      toast.error("Name, role and email are required.");
      return;
    }
    const newMember: Member = {
      name: form.name.trim(),
      role: form.role.trim(),
      dept: form.dept.trim() || "Administration",
      years: Number(form.years) || 0,
      email: form.email.trim(),
      phone: form.phone.trim() || "+91 00000 00000",
      dotColor: DOT_COLORS[members.length % DOT_COLORS.length],
      avatar: `https://i.pravatar.cc/160?u=${encodeURIComponent(form.email.trim())}`,
    };
    setMembers((prev) => [newMember, ...prev]);
    setForm(emptyForm);
    setAddOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Staff Directory</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Trusted finance professionals managing every school transaction with accuracy and transparency.
          </p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_0_16px_-4px_rgba(34,211,238,0.45)] transition hover:opacity-90">
          <UserPlus className="h-4 w-4" />
          Add Staff
        </button>
      </div>

      {/* Segmented control */}
      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex w-max items-center rounded-full border border-border bg-muted p-1">
          {FILTERS.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[0_0_16px_-4px_rgba(34,211,238,0.45)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m, i) => (
          <TeamMemberCard key={m.email} member={m} index={i} onView={setSelected} />
        ))}
      </div>

      {/* Profile dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="sr-only">{selected.name}</DialogTitle>
                <DialogDescription className="sr-only">Staff member profile details</DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-4">
                <img src={selected.avatar} alt={selected.name} className="h-16 w-16 rounded-full border-2 border-border object-cover" />
                <div className="min-w-0">
                  <div className="truncate text-lg font-semibold text-foreground">{selected.name}</div>
                  <div className="truncate text-sm text-muted-foreground">{selected.role}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    <span className={`h-1.5 w-1.5 rounded-full ${selected.dotColor}`} />
                    {selected.dept}
                  </div>
                </div>
              </div>

              <div className="mt-2 space-y-3 text-sm">
                <div className="flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground">{selected.years} Years</span>
                  <span className="text-xs text-muted-foreground">Experience</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Briefcase className="h-4 w-4 shrink-0" />
                  <span>{selected.dept} Department</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{selected.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{selected.phone}</span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add staff dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Staff Member</DialogTitle>
            <DialogDescription>Onboard a new team member to the directory.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="s-name">Name</Label>
                <Input id="s-name" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Neha Verma" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s-role">Role</Label>
                <Input id="s-role" maxLength={100} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Accounts Executive" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s-dept">Department</Label>
                <Input id="s-dept" maxLength={50} value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })} placeholder="Finance" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s-years">Experience (years)</Label>
                <Input id="s-years" type="number" min={0} max={60} value={form.years} onChange={(e) => setForm({ ...form, years: e.target.value })} placeholder="5" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="s-email">Email</Label>
                <Input id="s-email" type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="neha.v@smartschool.edu" />
              </div>
            </div>
            <DialogFooter>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <UserPlus className="h-4 w-4" />
                Add Staff
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
