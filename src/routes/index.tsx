import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import {
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

import video1 from "@/assets/nudges.mp4.asset.json";
import video2 from "@/assets/receipts.mp4.asset.json";
import video3 from "@/assets/records.mp4.asset.json";
import video4 from "@/assets/rails.mp4.asset.json";
import phoneDemo from "@/assets/phone-demo.mp4.asset.json";
import icon3dCoin from "@/assets/hero-3d-coin.png";
import icon3dCard from "@/assets/hero-3d-card.png";
import icon3dCalendar from "@/assets/hero-3d-calendar.png";
import icon3dReceipt from "@/assets/hero-3d-receipt.png";
import icon3dUpi from "@/assets/hero-3d-upi.png";

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

// Each icon starts at an offset from center (in px) and animates to (0,0)
// as the user scrolls. Values chosen so they scatter around the headline/box.
const ICON_ART: Record<string, { src: string; alt: string; className: string }> = {
  rupee: { src: icon3dCoin, alt: "3D golden rupee coin", className: "h-20 w-20 sm:h-28 sm:w-28" },
  upi: { src: icon3dUpi, alt: "3D UPI payment badge", className: "h-20 w-20 sm:h-24 sm:w-24" },
  card: { src: icon3dCard, alt: "3D green credit card", className: "h-24 w-24 sm:h-32 sm:w-32" },
  receipt: { src: icon3dReceipt, alt: "3D paper receipt with chart", className: "h-24 w-24 sm:h-32 sm:w-32" },
  calendar: { src: icon3dCalendar, alt: "3D calendar date block", className: "h-20 w-20 sm:h-28 sm:w-28" },
};

const FLOATING_ICONS = [
  // Top Left — 3D rupee coin (above headline)
  { id: "rupee", startX: -360, startY: -300, floatDur: 5.2, floatDelay: 0 },
  // Top Right — 3D UPI badge (above headline)
  { id: "upi", startX: 360, startY: -290, floatDur: 6.0, floatDelay: 0.4 },
  // Right Center — 3D green credit card (beside headline)
  { id: "card", startX: 400, startY: -80, floatDur: 5.6, floatDelay: 0.8 },
  // Left Mid — 3D receipt (beside subtitle)
  { id: "receipt", startX: -380, startY: 20, floatDur: 6.4, floatDelay: 1.2 },
  // Bottom Right — 3D calendar (above box)
  { id: "calendar", startX: 280, startY: 180, floatDur: 5.8, floatDelay: 1.6 },
] as const;

function FloatingIcon({
  id,
  scrollYProgress,
  startX,
  startY,
  floatDur,
  floatDelay,
}: {
  id: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  startX: number;
  startY: number;
  floatDur: number;
  floatDelay: number;
}) {
  // As the user scrolls 0 → 0.3, each icon flies from its (startX, startY)
  // to the center (0, 0) while scaling + fading out — the "drop" into the box.
  const x = useTransform(scrollYProgress, [0, 0.3], [startX, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [startY, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);

  const art = ICON_ART[id];

  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [-3, 3, -3] }}
        transition={{ duration: floatDur, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }}
      >
        {art ? (
          <img
            src={art.src}
            alt={art.alt}
            width={512}
            height={512}
            className={`select-none object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.25)] ${art.className}`}
          />
        ) : null}
      </motion.div>
    </motion.div>
  );
}

function ScrollHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Headline fades as the drop begins
  const headingOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.22], [0, -40]);

  // Box → Phone morph (starts after icons have dropped in)
  const boxWidth = useTransform(scrollYProgress, [0.3, 0.7], [240, 220]);
  const boxHeight = useTransform(scrollYProgress, [0.3, 0.7], [240, 460]);
  const boxRadius = useTransform(scrollYProgress, [0.3, 0.7], [36, 44]);
  const boxRotate = useTransform(scrollYProgress, [0.3, 0.7], [-6, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);

  // Subtle pulse on the box while icons are dropping in
  const boxPulse = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1.04, 1]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Ambient wash */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00a657]/15 blur-[180px]" />
          <div className="absolute right-[10%] top-[15%] h-[500px] w-[500px] rounded-full bg-[oklch(0.6_0.12_220)]/15 blur-[180px]" />
        </div>

        {/* Heading */}
        <motion.div
          style={{ opacity: headingOpacity, y: headingY, ...FONT }}
          className="pointer-events-none absolute left-1/2 top-[14%] w-[min(840px,92%)] -translate-x-1/2 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-200 dark:shadow-none">
            <Sparkles className="h-3.5 w-3.5 text-[#00a657]" />
            Built for modern K-12 finance teams
          </span>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl">
            Fed up with chaotic{" "}
            <span className="bg-gradient-to-r from-[#00a657] to-[oklch(0.55_0.15_200)] bg-clip-text text-transparent">
              Fee Collection?
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-slate-600 dark:text-zinc-400 sm:text-lg">
            Drop the spreadsheets. FYNORA automates every rupee — from reminders to reconciliation.
          </p>
        </motion.div>

        {/* Floating icons that drop into the box */}
        {FLOATING_ICONS.map((cfg) => (
          <FloatingIcon key={cfg.id} scrollYProgress={scrollYProgress} {...cfg} />
        ))}

        {/* Cinematic backlit glow behind the box/phone */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00a657]/20 opacity-20 blur-[120px] dark:opacity-100" />

        {/* Morphing box → phone */}
        <motion.div
          style={{
            width: boxWidth,
            height: boxHeight,
            borderRadius: boxRadius,
            rotate: boxRotate,
            scale: boxPulse,
          }}
          className="relative overflow-hidden bg-[#0b0b0b] shadow-[0_50px_120px_-20px_rgba(0,0,0,0.8),0_0_80px_-20px_rgba(0,166,87,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-zinc-800/60"
        >

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
            <div className="h-full w-full overflow-hidden rounded-[36px] bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source src={phoneDemo.url} type="video/mp4" />
              </video>
            </div>
          </motion.div>

        </motion.div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.35em] text-slate-500 dark:text-zinc-500" style={FONT}>
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
      <div className="mx-auto max-w-6xl rounded-[50px] border border-slate-200 bg-white p-8 shadow-sm dark:border-zinc-800/50 dark:bg-[#0b0b0b] dark:shadow-[0_30px_80px_-40px_rgba(0,166,87,0.35)] sm:p-14">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-zinc-900 dark:text-zinc-200">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00a657]" /> Real outcomes
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Why switch to FYNORA?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-zinc-400">
            Finance teams cut hours of manual reconciliation and never chase a defaulter twice.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ v, label, icon: Icon }) => (
            <div
              key={label}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,166,87,0.4)] dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:shadow-none"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#00a657]/10 text-[#00a657]">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <div className="mt-5 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{v}</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-zinc-400">{label}</div>
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
                <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
                  {b.heading}
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600 dark:text-zinc-400 sm:text-lg">
                  {b.text}
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm text-slate-600 dark:text-zinc-400">
                  <div className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#00a657]" /> No code setup
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#00a657]" /> 5-min live
                  </div>
                </div>
              </div>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-auto w-full rounded-3xl"
              >
                <source src={b.video} type="video/mp4" />
              </video>
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
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Expand your possibilities
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-zinc-400">
            Add-on modules that grow with your institution — plug in what you need, when you need it.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {addons.map(({ name, desc, icon: Icon }) => (
            <div
              key={name}
              className="group rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,166,87,0.35)] dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:shadow-none"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#00a657] text-white shadow-lg">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-800 dark:text-white">{name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{desc}</p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#00a657]">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Trust */}
        <div className="mt-20 rounded-[50px] border border-slate-200 bg-white p-8 shadow-sm dark:border-zinc-800/50 dark:bg-[#0b0b0b] dark:shadow-none sm:p-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Why institutes trust FYNORA?
              </h3>
              <p className="mt-3 max-w-md text-slate-600 dark:text-zinc-400">
                Built with bank-grade encryption, immutable audit trails, and role-based access from day one.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {["SOC 2", "GDPR", "ISO 27001", "PCI DSS"].map((b) => (
                <div
                  key={b}
                  className="grid aspect-square place-items-center rounded-2xl border border-slate-200 bg-slate-50 text-center shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:shadow-none"
                >
                  <div>
                    <ShieldCheck className="mx-auto h-6 w-6 text-[#00a657]" />
                    <div className="mt-2 text-xs font-semibold tracking-wider text-slate-800 dark:text-white">{b}</div>
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
    <main className="relative bg-slate-50 dark:bg-black" style={FONT}>
      <ScrollHero />
      <StatsSection />
      <ZigZagBlocks />
      <ExpandSection />
      <FinalCTA />
    </main>
  );
}
