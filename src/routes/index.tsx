import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, easeInOut } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Wallet,
  CalendarDays,
  Coins,
  ChevronDown,
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
import icon3dAlarm from "@/assets/hero-3d-alarm.png.asset.json";
import doodleClock from "@/assets/doodle-clock.png";
import doodleRocket from "@/assets/doodle-rocket.png";
import doodleGears from "@/assets/doodle-gears.png";
import doodleChecklist from "@/assets/doodle-checklist.png";
import coinSpin from "@/assets/coin.webm.asset.json";

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
  alarm: { src: icon3dAlarm.url, alt: "3D yellow alarm clock", className: "h-24 w-24 sm:h-32 sm:w-32 scale-110" },
};

const FLOATING_ICONS = [
  // Top Left — 3D rupee coin (left of headline, below nav)
  { id: "rupee", positionClass: "top-[15%] left-[10%]", floatDur: 5.2, floatDelay: 0 },
  // Top Right — 3D UPI badge (right of headline)
  { id: "upi", positionClass: "top-[20%] right-[10%]", floatDur: 6.0, floatDelay: 0.4 },
  // Middle Right — 3D green credit card (right of subtitle)
  { id: "card", positionClass: "top-[55%] right-[8%]", floatDur: 5.6, floatDelay: 0.8 },
  // Bottom Left — 3D receipt (below subtitle)
  { id: "receipt", positionClass: "bottom-[25%] left-[15%]", floatDur: 6.4, floatDelay: 1.2 },
  // Bottom Right — 3D calendar (above scroll indicator, clear of the card icon)
  { id: "calendar", positionClass: "bottom-[15%] right-[30%]", floatDur: 5.8, floatDelay: 1.6 },
  // Bottom Left — 3D alarm clock, mirroring the calendar on the right
  { id: "alarm", positionClass: "bottom-[15%] left-[30%]", floatDur: 6.2, floatDelay: 2.0 },
] as const;

function FloatingIcon({
  id,
  scrollYProgress,
  positionClass,
  floatDur,
  floatDelay,
}: {
  id: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  positionClass: string;
  floatDur: number;
  floatDelay: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  // Distance from this icon's resting spot to the centre of the viewport.
  const [delta, setDelta] = useState({ dx: 0, dy: 0 });

  useEffect(() => {
    const measure = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setDelta({
        dx: window.innerWidth / 2 - (r.left + r.width / 2),
        dy: window.innerHeight / 2 - (r.top + r.height / 2),
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Icons fly to the centre of the screen and shrink to 0 — "sucked into" the phone.
  const x = useTransform(scrollYProgress, [0, 0.28], [0, delta.dx], { clamp: true });
  const y = useTransform(scrollYProgress, [0, 0.28], [0, delta.dy], { clamp: true });
  const scale = useTransform(scrollYProgress, [0, 0.28], [1, 0], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0.2, 0.28], [1, 0], { clamp: true });

  const art = ICON_ART[id];

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${positionClass}`}
    >
      <motion.div style={{ x, y, scale, opacity }}>
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
    </div>
  );
}

function ScrollHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scrollYProgress = useSpring(rawProgress, { stiffness: 260, damping: 40, mass: 0.4 });

  // Text clears out immediately on scroll.
  const headingOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0], { clamp: true });
  const headingY = useTransform(scrollYProgress, [0, 0.2], [0, -80], { clamp: true });

  // Video fades in + scales up at the same time, taking centre stage.
  const videoOpacity = useTransform(scrollYProgress, [0.04, 0.28], [0, 1], { clamp: true });
  const videoScale = useTransform(scrollYProgress, [0.04, 0.34], [0.75, 1], { clamp: true });
  const glowOpacity = useTransform(scrollYProgress, [0.04, 0.3], [0, 1], { clamp: true });

  // Scroll indicator: fully visible at the top, fades out as soon as the user scrolls down.
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0], { clamp: true });

  // Direction-aware playback: play once when entering from the top, never on the
  // way back up, and re-arm only when the user returns to the hero headline.
  const videoRef = useRef<HTMLVideoElement>(null);
  const armedRef = useRef(true);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const video = videoRef.current;
    if (!video) return;

    // Back at the very top (hero headline) — reset and arm for the next pass down.
    if (p <= 0.02) {
      if (!armedRef.current || video.currentTime > 0) {
        video.pause();
        video.currentTime = 0;
      }
      armedRef.current = true;
      return;
    }

    // Scrolling down into the video stage: play exactly once per arming.
    if (armedRef.current && p >= 0.1) {
      armedRef.current = false;
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  });


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
          className="pointer-events-none absolute left-1/2 top-[12%] w-[min(840px,92%)] -translate-x-1/2 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-200 dark:shadow-none">
            <Sparkles className="h-3.5 w-3.5 text-[#00a657]" />
            Next-gen finance platform for schools
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl">
            Fed up with chaotic{" "}
            <span className="bg-gradient-to-r from-[#00a657] to-[oklch(0.55_0.15_200)] bg-clip-text text-transparent">
              Fee Collection?
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-slate-600 dark:text-zinc-400 sm:text-lg">
            Ditch the manual spreadsheets. FYNORA handles smart EMIs, automated WhatsApp nudges, and real-time reconciliation in one seamless platform.
          </p>
        </motion.div>

        {/* Floating icons that fade out with the text */}
        {FLOATING_ICONS.map((cfg) => (
          <FloatingIcon key={cfg.id} scrollYProgress={scrollYProgress} {...cfg} />
        ))}

        {/* Cinematic backlit glow behind the phone */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00a657]/20 blur-[100px]"
        />

        {/* Clean phone video — plays once when scrolled into view, holds final frame */}
        <motion.video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          style={{ opacity: videoOpacity, scale: videoScale, mixBlendMode: "screen" }}
          className="absolute left-1/2 top-1/2 h-[540px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-[40px] object-cover"
        >
          <source src={phoneDemo.url} type="video/mp4" />
        </motion.video>


        {/* Scroll hint — fixed bottom center of the viewport, fades out on scroll, fades in at top */}
        <motion.div
          style={{ opacity: hintOpacity, ...FONT }}
          className="pointer-events-none fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.35em] text-slate-500 dark:text-zinc-500"
        >
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-[#00a657]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SpinningCoin() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          el.currentTime = 0;
          el.play().catch(() => {});
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none mx-auto mt-10 h-40 w-40 sm:h-52 sm:w-52"
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,166,87,0.35)]"
      >
        <source src={coinSpin.url} type="video/webm" />
      </video>
    </motion.div>
  );
}

function StatsSection() {
  const stats = [
    { v: "50%", label: "Time Saved", art: doodleClock, alt: "Colorful doodle of an alarm clock", tilt: "lg:translate-y-10 lg:-rotate-3" },
    { v: "10x", label: "Faster Fee Collection", art: doodleRocket, alt: "Colorful doodle of a launching rocket", tilt: "lg:translate-y-[-10px] lg:-rotate-1" },
    { v: "100%", label: "Automated Reconciliation", art: doodleGears, alt: "Colorful doodle of a sync gear", tilt: "lg:translate-y-[-10px] lg:rotate-1" },
    { v: "0", label: "Accounting Errors", art: doodleChecklist, alt: "Colorful doodle of a checklist with a green tick", tilt: "lg:translate-y-10 lg:rotate-3" },
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
          <SpinningCoin />
        </div>
        <div className="mt-12 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ v, label, art, alt, tilt }) => (

            <div
              key={label}
              className={`group relative isolate flex aspect-square flex-col overflow-hidden rounded-[40px] bg-zinc-800 p-6 text-white shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)] transition-transform duration-300 will-change-transform hover:z-10 hover:translate-y-0 hover:rotate-0 hover:scale-[1.04] ${tilt}`}
            >
              <div className="text-4xl font-bold tracking-tight text-white">{v}</div>
              <div className="mt-1 text-base font-medium text-zinc-300">{label}</div>
              <div className="mt-2 flex flex-1 items-end justify-center pb-1">
                <img
                  src={art}
                  alt={alt}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="h-24 w-24 select-none object-contain sm:h-28 sm:w-28"
                />
              </div>
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
    heading: "Tired of chasing parents for pending fees?",
    text: "Automate bulk payment links and reminders via WhatsApp and SMS. Parents pay in taps, not trips.",
    tag: "Automated Nudges",
    check1: "1-Click Send",
    check2: "Instant Delivery"
  },
  {
    video: video2.url,
    heading: "Need a tamper-proof audit trail?",
    text: "Monitor every system action, waiver, and transaction in real-time with a secure, unchangeable audit ledger.",
    tag: "IMMUTABLE SECURITY",
    check1: "Bank-grade Security",
    check2: "100% Tamper-proof"
  },
  {
    video: video3.url,
    heading: "Scattered student fee records?",
    text: "Track and filter defaulters instantly by class, section, or urgency to keep cash flow organized.",
    tag: "Single Source of Truth",
    check1: "Real-time Sync",
    check2: "Smart Filters"
  },
  {
    video: video4.url,
    heading: "Want to turn heavy fees into 0% Interest Micro-EMIs?",
    text: "Break down large tuition amounts into manageable monthly payments and notify parents instantly via WhatsApp.",
    tag: "SMART FEE SPLITS",
    check1: "AI Auto-Suggest",
    check2: "Zero Hidden Charges"
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
                    <CheckCircle2 className="h-4 w-4 text-[#00a657]" /> {(b as any).check1}
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#00a657]" /> {(b as any).check2}
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
