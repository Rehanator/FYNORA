import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

type CoinVariant = "gold" | "emerald";

type CoinData = {
  id: number;
  x: number;
  delay: number;
  duration: number;
  rotationX: [number, number];
  rotationY: [number, number];
  rotationZ: [number, number];
  scale: number;
  variant: CoinVariant;
  drift: number;
};

const COIN_COLORS: Record<CoinVariant, { face: string; ring: string; sheen: string; shadow: string }> = {
  gold: {
    face: "linear-gradient(145deg, #FFD84D 0%, #E8B323 45%, #B8870F 100%)",
    ring: "linear-gradient(145deg, #F5C842 0%, #C9961A 60%, #8C6307 100%)",
    sheen: "rgba(255,255,255,0.55)",
    shadow: "rgba(140,99,7,0.45)",
  },
  emerald: {
    face: "linear-gradient(145deg, #34D399 0%, #059669 50%, #047857 100%)",
    ring: "linear-gradient(145deg, #10B981 0%, #047857 55%, #065F46 100%)",
    sheen: "rgba(255,255,255,0.45)",
    shadow: "rgba(4,90,70,0.45)",
  },
};

function CoinSVG({ variant, size = 48 }: { variant: CoinVariant; size?: number }) {
  const c = COIN_COLORS[variant];
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden className="select-none">
      <defs>
        <radialGradient id={`gloss-${variant}`} cx="30%" cy="25%" r="60%">
          <stop offset="0%" stopColor={c.sheen} />
          <stop offset="60%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={c.ring} />
      <circle cx="32" cy="34" r="26" fill={c.face} />
      <circle cx="32" cy="34" r="26" fill={`url(#gloss-${variant})`} />
      <path
        d="M20 30h24M44 30c-2 2-6 2-12 2s-10 0-12-2M20 36h24M44 36c-2 2-6 2-12 2s-10 0-12-2M30 24v18M22 42c3-3 7-5 8-9h4c1 4 5 6 8 9"
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse
        cx="32"
        cy="62"
        rx="22"
        ry="3"
        fill={c.shadow}
        opacity="0.35"
      />
    </svg>
  );
}

function usePrefersReducedMotionSafe() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return !mounted ? false : prefersReducedMotion;
}

function makeCoins(count: number, seed = 0): CoinData[] {
  const rng = mulberry32(seed || 12345);
  const out: CoinData[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      id: i,
      x: 8 + rng() * 84,
      delay: rng() * 0.8,
      duration: 1.6 + rng() * 1.2,
      rotationX: [-120 - rng() * 120, 360 + rng() * 360],
      rotationY: [-180 - rng() * 240, 360 + rng() * 480],
      rotationZ: [-45 + rng() * 90, -20 + rng() * 40],
      scale: 0.55 + rng() * 0.75,
      variant: rng() > 0.55 ? "emerald" : "gold",
      drift: -20 + rng() * 40,
    });
  }
  return out;
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Mode = "scroll" | "burst";

export type CoinDropHandle = {
  triggerBurst: (count?: number) => void;
};

type ScrollProps = {
  mode: "scroll";
  triggerRef?: never;
  coinCount?: number;
  targetRef?: React.RefObject<HTMLElement>;
  scrollStart?: number;
  scrollEnd?: number;
};

type BurstProps = {
  mode: "burst";
  triggerRef: React.RefObject<CoinDropHandle | null>;
  coinCount?: number;
  targetRef?: never;
  scrollStart?: never;
  scrollEnd?: never;
};

export type CoinDropProps = (ScrollProps | BurstProps) & {
  className?: string;
  intensity?: number;
};

/**
 * Physics-inspired 3D falling rupee coin animation.
 *
 * Two modes:
 *  - "scroll": coins cascade in as the user scrolls through a range of `scrollYProgress`.
 *  - "burst":  imperatively triggered via `triggerRef.current.triggerBurst(n)`,
 *              useful for celebrating an approved UPI transaction.
 */
export function CoinDropAnimation(props: CoinDropProps) {
  const { mode, className, intensity = 1 } = props;
  const baseCount = props.coinCount ?? (mode === "scroll" ? 18 : 14);
  const reduced = usePrefersReducedMotionSafe();

  /* ── scroll-driven pipeline ─────────────────────────────────────── */
  const scrollCoins = useMemo(() => makeCoins(Math.round(baseCount * intensity), 77), [baseCount, intensity]);
  const { scrollYProgress } = useScroll({
    target: mode === "scroll" ? props.targetRef : undefined,
    offset: mode === "scroll" ? ["start start", "end end"] : undefined,
  });
  const progSpring = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.5 });
  const dropAmount = useTransform(progSpring, [mode === "scroll" ? (props.scrollStart ?? 0.05) : 0, mode === "scroll" ? (props.scrollEnd ?? 0.55) : 1], [0, 1]);

  /* ── burst pipeline ─────────────────────────────────────────────── */
  const [burstTick, setBurstTick] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const burstCoins = useMemo(() => makeCoins(Math.round(baseCount * intensity), burstTick || 31), [baseCount, intensity, burstTick]);
  const burstRef = useRef<number | null>(null);

  const triggerBurst = useCallback((count = 14) => {
    if (reduced) return;
    setBurstTick((t) => (t + 1) % 10_000);
    setBurstKey((k) => k + 1);
    if (burstRef.current) window.clearTimeout(burstRef.current);
    // cycle so AnimatePresence can unmount cleanly between bursts
    burstRef.current = window.setTimeout(() => setBurstKey((k) => k + 1), 3600);
    void count;
  }, [reduced]);

  useEffect(() => {
    if (mode === "burst" && props.triggerRef) {
      props.triggerRef.current = { triggerBurst };
    }
  }, [mode, props, triggerBurst]);

  useEffect(() => {
    return () => {
      if (burstRef.current) window.clearTimeout(burstRef.current);
    };
  }, []);

  const showScroll = mode === "scroll";
  const showBurst = mode === "burst" && burstKey % 2 === 1;

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={{ perspective: 1400 }}
    >
      {/* Ambient collection vault glow at the bottom */}
      <div
        className="absolute left-1/2 bottom-0 h-28 w-[120%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(5,150,105,0.28) 0%, rgba(234,179,8,0.12) 45%, rgba(0,0,0,0) 75%)",
          filter: "blur(16px)",
        }}
      />

      {showScroll &&
        scrollCoins.map((coin) => (
          <ScrollCoin key={`s-${coin.id}`} coin={coin} dropAmount={dropAmount} />
        ))}

      <AnimatePresence initial={false}>
        {showBurst &&
          burstCoins.map((coin, idx) => (
            <BurstCoin key={`b-${burstKey}-${coin.id}`} coin={coin} order={idx} />
          ))}
      </AnimatePresence>
    </div>
  );
}

/* ── Scroll-driven coins: fall as dropAmount advances ─────────────── */
function ScrollCoin({
  coin,
  dropAmount,
}: {
  coin: CoinData;
  dropAmount: ReturnType<typeof useTransform>;
}) {
  const dropY = useTransform(dropAmount, (p) => {
    const eased = easeOutBounce(Math.max(0, Math.min(1, p)));
    return -80 + eased * (window?.innerHeight ?? 900 + 120);
  });
  const dropX = useTransform(dropAmount, (p) => coin.drift * Math.min(1, p * 1.4));
  const rx = useTransform(dropAmount, (p) => lerp(coin.rotationX[0], coin.rotationX[1], Math.min(1, p * 1.2)));
  const ry = useTransform(dropAmount, (p) => lerp(coin.rotationY[0], coin.rotationY[1], Math.min(1, p * 1.2)));
  const rz = useTransform(dropAmount, (p) => lerp(coin.rotationZ[0], coin.rotationZ[1], Math.min(1, p)));
  const opacity = useTransform(dropAmount, (p) => p < 0.02 ? 0 : p > 0.92 ? Math.max(0, 1 - (p - 0.92) / 0.08) : 1);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${coin.x}%`,
        top: 0,
        x: dropX,
        y: dropY,
        rotateX: rx,
        rotateY: ry,
        rotateZ: rz,
        opacity,
        scale: coin.scale,
        transformStyle: "preserve-3d",
        filter: `drop-shadow(0 ${10 * coin.scale}px ${18 * coin.scale}px ${COIN_COLORS[coin.variant].shadow})`,
      }}
    >
      <CoinSVG variant={coin.variant} size={Math.round(54 * coin.scale)} />
    </motion.div>
  );
}

/* ── Burst coins: enter with a spring pop, fall with bounce ─────── */
function BurstCoin({ coin, order }: { coin: CoinData; order: number }) {
  const stagger = order * 0.03;
  const startX = 50 + (Math.random() - 0.5) * 12;
  const startY = 10;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        transformStyle: "preserve-3d",
        filter: `drop-shadow(0 12px 22px ${COIN_COLORS[coin.variant].shadow})`,
      }}
      initial={{
        opacity: 0,
        y: -120,
        x: (coin.x - 50) * 0.3,
        scale: 0,
        rotateX: coin.rotationX[0],
        rotateY: coin.rotationY[0],
        rotateZ: coin.rotationZ[0],
      }}
      animate={{
        opacity: [0, 1, 1, 0.2, 0],
        y: [
          -120,
          -120,
          window?.innerHeight ? window.innerHeight * 0.7 : 560,
          window?.innerHeight ? window.innerHeight * 0.62 : 500,
          window?.innerHeight ? window.innerHeight * 0.95 : 760,
        ],
        x: [0, 0, coin.drift, coin.drift * 0.9, coin.drift * 1.1],
        scale: [0, 0, coin.scale * 1.2, coin.scale, coin.scale * 0.9],
        rotateX: [coin.rotationX[0], coin.rotationX[0], coin.rotationX[1], coin.rotationX[1] + 40, coin.rotationX[1] + 80],
        rotateY: [coin.rotationY[0], coin.rotationY[0], coin.rotationY[1], coin.rotationY[1] - 60, coin.rotationY[1] - 120],
        rotateZ: [coin.rotationZ[0], coin.rotationZ[0], coin.rotationZ[1], coin.rotationZ[1] + 10, coin.rotationZ[1] + 20],
      }}
      transition={{
        duration: coin.duration,
        delay: stagger + coin.delay * 0.4,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.08, 0.72, 0.86, 1],
      }}
      exit={{ opacity: 0, y: 200, transition: { duration: 0.4 } }}
    >
      <CoinSVG variant={coin.variant} size={Math.round(52 * coin.scale)} />
    </motion.div>
  );
}

function easeOutBounce(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) return n1 * x * x;
  if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
  if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
  return n1 * (x -= 2.625 / d1) * x + 0.984375;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
