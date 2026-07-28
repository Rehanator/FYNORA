import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Award, Mail, Phone, ArrowRight, Github, Linkedin, Twitter, UserPlus } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

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

const staff: Member[] = [
  { name: "Ravi Narayanan", role: "Senior Accountant", dept: "Finance", years: 12, email: "ravi.n@smartschool.edu", phone: "+91 98765 12345", dotColor: "bg-emerald-400", avatar: "https://i.pravatar.cc/160?img=68" },
  { name: "Priya Menon", role: "Front Desk Lead", dept: "Reception", years: 6, email: "priya.m@smartschool.edu", phone: "+91 98213 55401", dotColor: "bg-fuchsia-400", avatar: "https://i.pravatar.cc/160?img=47" },
  { name: "Suresh Iyer", role: "Bus Coordinator", dept: "Transport", years: 10, email: "suresh.i@smartschool.edu", phone: "+91 90234 66112", dotColor: "bg-amber-400", avatar: "https://i.pravatar.cc/160?img=12" },
  { name: "Anita Kapoor", role: "Principal Admin", dept: "Administration", years: 18, email: "anita.k@smartschool.edu", phone: "+91 99887 12200", dotColor: "bg-violet-400", avatar: "https://i.pravatar.cc/160?img=45" },
  { name: "Meera Joshi", role: "Fee Reconciliation Officer", dept: "Finance", years: 8, email: "meera.j@smartschool.edu", phone: "+91 98450 78990", dotColor: "bg-emerald-400", avatar: "https://i.pravatar.cc/160?img=32" },
  { name: "Arjun Rathore", role: "IT Systems Admin", dept: "Technology", years: 5, email: "arjun.r@smartschool.edu", phone: "+91 91234 45566", dotColor: "bg-cyan-400", avatar: "https://i.pravatar.cc/160?img=15" },
  { name: "Fatima Sheikh", role: "Scholarship Coordinator", dept: "HR", years: 7, email: "fatima.s@smartschool.edu", phone: "+91 93450 22110", dotColor: "bg-pink-400", avatar: "https://i.pravatar.cc/160?img=44" },
  { name: "David Thomas", role: "Cheque Reconciliation Analyst", dept: "Compliance", years: 4, email: "david.t@smartschool.edu", phone: "+91 97766 55211", dotColor: "bg-rose-400", avatar: "https://i.pravatar.cc/160?img=13" },
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

const TeamMemberCard = React.memo(({ member, index }: { member: Member; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30, bounce: 0.2 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30, bounce: 0.2 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass relative rounded-2xl p-6"
    >
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="flex flex-col gap-5">
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="Github" className="transition hover:text-foreground"><Github className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="transition hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="transition hover:text-foreground"><Twitter className="h-4 w-4" /></a>
          </div>
          <button
            onClick={() =>
              toast(member.name, {
                description: `${member.role} · ${member.dept} · ${member.email}`,
              })
            }
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

function Staff() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(
    () => (active === "All" ? staff : staff.filter((s) => s.dept === active)),
    [active],
  );

  return (
    <div className="space-y-8" style={{ perspective: "1200px" }}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Staff Directory</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Trusted finance professionals managing every school transaction with accuracy and transparency.
          </p>
        </div>
        <button
          onClick={() =>
            toast("Add staff", { description: "Staff onboarding form opens here in the full build." })
          }
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
          <TeamMemberCard key={m.email} member={m} index={i} />
        ))}
      </div>
    </div>
  );
}
