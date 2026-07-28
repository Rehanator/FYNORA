import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  IndianRupee,
  CreditCard,
  Calendar,
  Receipt,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Clock,
  CheckCircle2,
  Wallet,
  CalendarDays,
  Coins,
} from "lucide-react";

import video1 from "@/assets/1.mp4.asset.json";
import video2 from "@/assets/2.mp4.asset.json";
import video3 from "@/assets/3.mp4.asset.json";
import video4 from "@/assets/4.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FYNORA — Effortless School Fee Collection" },
      {
        name: "description",
        content:
          "FYNORA replaces chaotic spreadsheets with automated fee collection, smart Edu-EMI splits, instant reconciliation, and WhatsApp-first parent payments.",
      },
      { property: "og:title", content: "FYNORA — Effortless School Fee Collection" },
      {
        property: "og:description",
        content:
          "Automate collections, offer smart EMI splits, and reconcile payments instantly with FYNORA's modern FinTech suite for schools.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const FONT = { fontFamily: '"Outfit", ui-sans-serif, system-ui, sans-serif' } as const;

const FLOATING_ICONS = [
  { Icon: IndianRupee, x: "-38%", y: "-24%", delay: 0 },
  { Icon: CreditCard, x: "34%", y: "-28%", delay: 0.4 },
  { Icon: Calendar, x: "-42%", y: "18%", delay: 0.8 },
  { Icon: Receipt, x: "40%", y: "22%", delay: 1.2 },
  { Icon: Wallet, x: "0%", y: "-38%", delay: 1.6 },
];

function ScrollHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Phase 1 (0 -> 0.4): icons drop into box
  // Phase 2 (0.4 -> 0.8): box morphs into phone, screen fades in
  const iconScale = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const iconTx = useTransform(scrollYProgress, [0, 0.35], ["0%", "0%"]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

  // Box → Phone morph
  const boxWidth = useTransform(scrollYProgress, [0.35, 0.75], [320, 240]);
  const boxHeight = useTransform(scrollYProgress, [0.35, 0.75], [320, 500]);
  const boxRadius = useTransform(scrollYProgress, [0.35, 0.75], [40, 48]);
  const boxRotate = useTransform(scrollYProgress, [0.35, 0.75], [-8, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0.35, 0.55], [1, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Ambient wash */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.92_0.09_165)] opacity-40 blur-[160px]" />
          <div className="absolute right-[10%] top-[15%] h-[500px] w-[500px] rounded-full bg-[oklch(0.88_0.10_220)] opacity-40 blur-[160px]" />
        </div>

        {/* Heading */}
        <motion.div
          style={{ opacity: headingOpacity, y: headingY, ...FONT }}
          className="absolute left-1/2 top-[22%] w-[min(920px,92%)] -translate-x-1/2 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-xs font-medium text-[#14171d] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[#00a657]" />
            Built for modern K-12 finance teams
          </span>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-[#14171d] sm:text-6xl md:text-7xl">
            Fed up with chaotic{" "}
            <span className="bg-gradient-to-r from-[#00a657] to-[oklch(0.55_0.15_200)] bg-clip-text text-transparent">
              Fee Collection?
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-[#14171d]/70 sm:text-lg">
            Drop the spreadsheets. FYNORA automates every rupee — from reminders to reconciliation.
          </p>
        </motion.div>

        {/* Floating icons */}
        {FLOATING_ICONS.map(({ Icon, x, y, delay }, i) => (
          <motion.div
            key={i}
            style={{ scale: iconScale, x: iconTx, translateX: x, translateY: y }}
            className="absolute left-1/2 top-1/2"
          >
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 5 + i * 0.4, delay, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-16 w-16 place-items-center rounded-2xl border border-white/60 bg-white/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] backdrop-blur-xl sm:h-20 sm:w-20"
            >
              <Icon className="h-7 w-7 text-[#00a657] sm:h-9 sm:w-9" strokeWidth={1.75} />
            </motion.div>
          </motion.div>
        ))}

        {/* Morphing box → phone */}
        <motion.div
          style={{
            width: boxWidth,
            height: boxHeight,
            borderRadius: boxRadius,
            rotate: boxRotate,
          }}
          className="relative overflow-hidden bg-[#0b0d10] shadow-[0_50px_120px_-20px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]"
        >
          {/* Dark box gradient face */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#181c22] via-[#0b0d10] to-black" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

          {/* FYNORA label (box mode) */}
          <motion.div
            style={{ opacity: labelOpacity, ...FONT }}
            className="absolute inset-0 grid place-items-center"
          >
            <div className="text-center">
              <div className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/50">
                Drop it in
              </div>
              <div className="mt-2 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                FYNORA
              </div>
            </div>
          </motion.div>

          {/* Phone UI (phone mode) */}
          <motion.div style={{ opacity: phoneOpacity }} className="absolute inset-0 p-3">
            <div className="flex h-full flex-col rounded-[36px] bg-gradient-to-b from-[#0f1216] to-black p-4">
              <div className="mx-auto h-1 w-14 rounded-full bg-white/20" />
              <div className="mt-4" style={FONT}>
                <div className="text-[10px] uppercase tracking-widest text-white/40">FYNORA Pay</div>
                <div className="mt-1 text-lg font-semibold text-white">Good morning, Anita</div>
              </div>
              <div className="mt-4 rounded-2xl bg-[#00a657] p-4 text-white shadow-lg" style={FONT}>
                <div className="text-[10px] uppercase tracking-widest opacity-80">Due today</div>
                <div className="mt-1 text-2xl font-bold">₹48,500</div>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white/20 px-2.5 py-1 text-[11px]">
                  Secure UPI <ArrowRight className="h-3 w-3" />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2" style={FONT}>
                {[
                  { label: "Tuition", v: "₹32,000" },
                  { label: "Transport", v: "₹8,500" },
                  { label: "Late Fee", v: "₹500" },
                  { label: "Activity", v: "₹7,500" },
                ].map((r) => (
                  <div key={r.label} className="rounded-xl bg-white/[0.04] p-2.5">
                    <div className="text-[9px] uppercase tracking-wider text-white/40">{r.label}</div>
                    <div className="mt-0.5 text-[13px] font-semibold text-white">{r.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2" style={FONT}>
                <div className="flex items-center gap-1.5 text-[10px] text-white/60">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00a657]" />
                  Live sync
                </div>
                <div className="text-[10px] text-white/40">v3.2</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.35em] text-[#14171d]/40" style={FONT}>
          Scroll ↓
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { v: "50%", label: "Time Saved", icon: Clock },
    { v: "10x", label: "Faster Fee Collection", icon: Zap },
    { v: "100%", label: "Automated Reconciliation", icon: CheckCircle2 },
    { v: "0", label: "Accounting Errors", icon: ShieldCheck },
  ];
  return (
    <section className="relative px-4 py-16 sm:py-24" style={FONT}>
      <div className="mx-auto max-w-6xl rounded-[50px] border border-black/5 bg-[#edf7f5] p-8 shadow-[0_30px_80px_-40px_rgba(0,166,87,0.35)] sm:p-14">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[#14171d]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00a657]" /> Real outcomes
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#14171d] sm:text-5xl">
            Why switch to FYNORA?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#14171d]/60">
            Finance teams cut hours of manual reconciliation and never chase a defaulter twice.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ v, label, icon: Icon }) => (
            <div
              key={label}
              className="group rounded-3xl border border-black/5 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,166,87,0.4)]"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#00a657]/10 text-[#00a657]">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <div className="mt-5 text-4xl font-bold tracking-tight text-[#14171d]">{v}</div>
              <div className="mt-1 text-sm text-[#14171d]/60">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ZIG_BLOCKS = [
  {
    video: video1.url,
    heading: "Tired of manual reminders and follow-ups?",
    text: "Schedule payment links and automated reminders via WhatsApp and SMS — parents pay in taps, not trips.",
    tag: "Automated Nudges",
  },
  {
    video: video2.url,
    heading: "Trouble reconciling bank statements?",
    text: "Send customized, instant payment receipts for online and offline transactions with a permanent audit trail.",
    tag: "Instant Receipts",
  },
  {
    video: video3.url,
    heading: "Scattered student fee records?",
    text: "Track payments easily in real-time from a single place with detailed insights on every class, section, and student.",
    tag: "Single Source of Truth",
  },
  {
    video: video4.url,
    heading: "Stuck with limited payment options?",
    text: "Make fee payment seamless for parents through UPI, smart Edu-EMI splits, debit, and credit cards.",
    tag: "Every Rail Supported",
  },
];

function ZigZagBlocks() {
  return (
    <section className="relative px-4 py-16 sm:py-24" style={FONT}>
      <div className="mx-auto max-w-6xl space-y-16 sm:space-y-24">
        {ZIG_BLOCKS.map((b, i) => {
          const reverse = i % 2 === 1;
          return (
            <div
              key={b.heading}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                reverse ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="p-4 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#00a657]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#00a657]">
                  {b.tag}
                </div>
                <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#14171d] sm:text-4xl md:text-5xl">
                  {b.heading}
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-[#14171d]/65 sm:text-lg">
                  {b.text}
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm text-[#14171d]/70">
                  <div className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#00a657]" /> No code setup
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#00a657]" /> 5-min live
                  </div>
                </div>
              </div>
              <div className="rounded-[36px] bg-[#edf7f5] p-6 sm:p-12">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-auto w-full rounded-3xl mix-blend-multiply"
                >
                  <source src={b.video} type="video/mp4" />
                </video>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ExpandSection() {
  const addons = [
    { name: "FYNORA Pay", desc: "One-click UPI, cards, netbanking, and wallets for parents.", icon: Wallet },
    { name: "FYNORA Events", desc: "Ticketed events, field trips, and workshops with instant collection.", icon: CalendarDays },
    { name: "FYNORA Expenses", desc: "Track vendor payouts, salaries, and petty cash — reconciled automatically.", icon: Coins },
  ];
  return (
    <section className="relative px-4 py-16 sm:py-24" style={FONT}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-[#14171d] sm:text-5xl">
            Expand your possibilities
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#14171d]/60">
            Add-on modules that grow with your institution — plug in what you need, when you need it.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {addons.map(({ name, desc, icon: Icon }) => (
            <div
              key={name}
              className="group rounded-[36px] border border-black/5 bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,166,87,0.35)]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#00a657] text-white shadow-lg">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#14171d]">{name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#14171d]/60">{desc}</p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#00a657]">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Trust */}
        <div className="mt-20 rounded-[50px] bg-[#edf7f5] p-8 sm:p-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-3xl font-semibold tracking-tight text-[#14171d] sm:text-4xl">
                Why institutes trust FYNORA?
              </h3>
              <p className="mt-3 max-w-md text-[#14171d]/60">
                Built with bank-grade encryption, immutable audit trails, and role-based access from day one.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {["SOC 2", "GDPR", "ISO 27001", "PCI DSS"].map((b) => (
                <div
                  key={b}
                  className="grid aspect-square place-items-center rounded-2xl border border-black/5 bg-white text-center shadow-sm"
                >
                  <div>
                    <ShieldCheck className="mx-auto h-6 w-6 text-[#00a657]" />
                    <div className="mt-2 text-xs font-semibold tracking-wider text-[#14171d]">{b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-4 py-16 sm:py-24" style={FONT}>
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[68px] bg-[#00a657] p-10 text-white shadow-[0_40px_120px_-30px_rgba(0,166,87,0.6)] sm:p-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-[420px] w-[420px] rounded-full bg-black/10 blur-3xl" />
        <div className="relative text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Ready in minutes
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Say hello to effortless fee collection.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/80">
            Join hundreds of schools automating collections, receipts, and reconciliation with FYNORA.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-[#00a657] shadow-lg transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore FYNORA <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Landing() {
  return (
    <main className="relative" style={FONT}>
      <ScrollHero />
      <StatsSection />
      <ZigZagBlocks />
      <ExpandSection />
      <FinalCTA />
    </main>
  );
}
