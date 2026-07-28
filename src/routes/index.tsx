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

// Each icon starts at an offset from center (in px) and animates to (0,0)
// as the user scrolls. Values chosen so they scatter around the headline/box.
const FLOATING_ICONS = [
  // Far left, upper — Rupee in yellow circle
  { id: "rupee", startX: -560, startY: -160, floatDur: 5.2, floatDelay: 0 },
  // Far right, upper — UPI badge
  { id: "upi", startX: 560, startY: -180, floatDur: 6.0, floatDelay: 0.4 },
  // Right edge, center — Green credit card
  { id: "card", startX: 600, startY: 30, floatDur: 5.6, floatDelay: 0.8 },
  // Left edge, lower — Receipt
  { id: "receipt", startX: -600, startY: 60, floatDur: 6.4, floatDelay: 1.2 },
  // Left edge, upper-most — Calendar
  { id: "calendar", startX: -480, startY: -260, floatDur: 5.8, floatDelay: 1.6 },
] as const;

// Where the icons converge: the center of the box that sits below the text.
const DROP_TARGET_Y = 300;


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
  // down into the box that sits below the headline — the "drop".
  const x = useTransform(scrollYProgress, [0, 0.3], [startX, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [startY, DROP_TARGET_Y]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);


  const renderInner = () => {
    switch (id) {
      case "rupee":
        return (
          <div className="grid h-16 w-16 place-items-center rounded-full bg-[#facc15] shadow-[0_18px_40px_-12px_rgba(250,204,21,0.55)] ring-1 ring-black/5 sm:h-20 sm:w-20">
            <IndianRupee className="h-7 w-7 text-[#14171d] sm:h-9 sm:w-9" strokeWidth={2.5} />
          </div>
        );
      case "upi":
        return (
          <div className="rounded-2xl border border-white/70 bg-white/90 px-4 py-2.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.2)] backdrop-blur-xl">
            <div className="text-[10px] font-medium uppercase tracking-widest text-[#14171d]/50">
              Pay via
            </div>
            <div className="mt-0.5 text-lg font-bold tracking-tight">
              <span className="text-[#ff6a00]">U</span>
              <span className="text-[#00a657]">P</span>
              <span className="text-[#00558f]">I</span>
            </div>
          </div>
        );
      case "card":
        return (
          <div className="relative h-14 w-24 overflow-hidden rounded-xl bg-gradient-to-br from-[#00a657] to-[#008a48] p-2.5 text-white shadow-[0_18px_40px_-12px_rgba(0,166,87,0.55)] sm:h-16 sm:w-28">
            <div className="absolute right-2 top-2 h-2.5 w-3.5 rounded-[3px] bg-yellow-300/90" />
            <CreditCard className="absolute bottom-2 right-2 h-4 w-4 text-white/70" strokeWidth={1.75} />
            <div className="absolute bottom-2 left-2.5 space-y-0.5">
              <div className="h-0.5 w-10 rounded bg-white/60" />
              <div className="h-0.5 w-6 rounded bg-white/40" />
            </div>
          </div>
        );
      case "receipt":
        return (
          <div className="w-24 rounded-xl bg-white p-2.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5 sm:w-28">
            <div className="flex items-center gap-1.5">
              <Receipt className="h-3.5 w-3.5 text-[#00a657]" strokeWidth={2} />
              <div className="text-[8px] font-semibold uppercase tracking-wider text-[#14171d]">Receipt</div>
            </div>
            <div className="mt-2 space-y-1">
              <div className="h-1 w-full rounded bg-black/10" />
              <div className="h-1 w-3/4 rounded bg-black/10" />
              <div className="h-1 w-1/2 rounded bg-black/10" />
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-dashed border-black/10 pt-1.5">
              <div className="text-[8px] text-[#14171d]/50">TOTAL</div>
              <div className="text-[9px] font-bold text-[#00a657]">₹48,500</div>
            </div>
          </div>
        );
      case "calendar":
        return (
          <div className="w-16 overflow-hidden rounded-xl bg-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5 sm:w-20">
            <div className="bg-[#ef4444] py-1 text-center">
              <div className="text-[8px] font-semibold uppercase tracking-widest text-white/90">Due</div>
            </div>
            <div className="grid place-items-center py-2">
              <Calendar className="h-4 w-4 text-[#14171d]/40" strokeWidth={2} />
              <div className="mt-0.5 text-lg font-bold leading-none text-[#14171d]">15</div>
              <div className="text-[8px] font-medium uppercase tracking-wider text-[#14171d]/50">Jul</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      className="pointer-events-none absolute left-1/2 top-[34%] z-10 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: floatDur, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }}
      >
        {renderInner()}
      </motion.div>
    </motion.div>
  );
}

function ScrollHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Headline fades as the drop begins
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

  // Box → Phone morph (starts after icons have dropped in)
  const boxWidth = useTransform(scrollYProgress, [0.3, 0.7], [320, 240]);
  const boxHeight = useTransform(scrollYProgress, [0.3, 0.7], [320, 500]);
  const boxRadius = useTransform(scrollYProgress, [0.3, 0.7], [40, 48]);
  const boxRotate = useTransform(scrollYProgress, [0.3, 0.7], [-8, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);

  // Subtle pulse on the box while icons are dropping in
  const boxPulse = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1.04, 1]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center overflow-hidden pt-20 text-center">
        {/* Ambient wash */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.92_0.09_165)] opacity-40 blur-[160px]" />
          <div className="absolute right-[10%] top-[15%] h-[500px] w-[500px] rounded-full bg-[oklch(0.88_0.10_220)] opacity-40 blur-[160px]" />
        </div>

        {/* Floating icons — decorative, framing the text from the edges */}
        {FLOATING_ICONS.map((cfg) => (
          <FloatingIcon key={cfg.id} scrollYProgress={scrollYProgress} {...cfg} />
        ))}

        {/* Top block: heading + CTAs */}
        <motion.div
          style={{ opacity: headingOpacity, y: headingY, ...FONT }}
          className="relative z-20 w-[min(920px,92%)] text-center"
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
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#00a657] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a657]"
            >
              Explore FYNORA <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white/80 px-7 py-3.5 text-sm font-semibold text-[#14171d] backdrop-blur transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a657]"
            >
              Book a Demo
            </a>
          </div>
        </motion.div>

        {/* Bottom block: the video asset, below the text in normal flow */}
        <div className="relative z-10 mt-24 flex w-full justify-center">
          <video
            src="/InShot_20260728_164658291.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none relative z-10 mx-auto mt-12 h-auto w-full max-w-[600px] object-contain drop-shadow-2xl"
          />
        </div>


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
