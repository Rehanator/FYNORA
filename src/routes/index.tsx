import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle, Sparkles, ShieldCheck, Zap } from "lucide-react";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FYNORA — The Future of School Fee Management" },
      {
        name: "description",
        content:
          "Eliminate chaotic spreadsheets. Automate collections, offer smart EMI splits, and reconcile payments instantly with our modern FinTech suite for schools.",
      },
      { property: "og:title", content: "FYNORA — The Future of School Fee Management" },
      {
        property: "og:description",
        content:
          "Eliminate chaotic spreadsheets. Automate collections, offer smart EMI splits, and reconcile payments instantly with our modern FinTech suite for schools.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative">
      <section className="relative mx-auto flex min-h-[calc(100vh-6rem)] w-[min(1200px,calc(100%-1.5rem))] flex-col items-center justify-center pt-16 pb-24 text-center sm:pt-24">
        <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-medium text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-[oklch(0.55_0.15_200)]" />
          Purpose-built for K-12 finance offices
        </span>

        <h1 className="mt-6 max-w-4xl bg-gradient-to-br from-[oklch(0.22_0.02_260)] via-[oklch(0.35_0.09_220)] to-[oklch(0.5_0.14_200)] bg-clip-text text-5xl font-semibold leading-[1.05] tracking-tight text-transparent dark:from-[oklch(0.98_0.01_250)] dark:via-[oklch(0.85_0.10_220)] dark:to-[oklch(0.75_0.15_200)] sm:text-6xl md:text-7xl">
          The Future of School Fee Management
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Eliminate chaotic spreadsheets. Automate collections, offer smart EMI splits, and
          reconcile payments instantly with our modern FinTech suite.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[oklch(0.65_0.16_200)] to-[oklch(0.62_0.15_260)] px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[oklch(0.62_0.14_200_/_0.4)] transition hover:brightness-110"
          >
            Open Admin Dashboard
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <button
            onClick={() =>
              document.getElementById("product-preview")?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            className="glass inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-white/60"
          >
            <PlayCircle className="h-4 w-4 text-[oklch(0.5_0.15_200)]" />
            See How It Works
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[oklch(0.55_0.16_155)]" /> Tamper-proof audit trail
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-[oklch(0.6_0.16_70)]" /> UPI-first, instant reconciliation
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[oklch(0.55_0.14_300)]" /> Smart Edu-EMI splits
          </span>
        </div>

        {/* Floating dashboard mockup */}
        <div id="product-preview" className="relative mt-16 w-full scroll-mt-24">
          <div className="pointer-events-none absolute inset-x-8 -bottom-6 h-24 rounded-[40px] bg-[oklch(0.5_0.14_200)] opacity-25 blur-3xl" />
          <div className="glass-strong relative overflow-hidden rounded-3xl p-2 shadow-[0_40px_100px_-30px_oklch(0_0_0/0.35)] ring-1 ring-black/[0.04]">
            <Link to="/dashboard" className="block">
            <img
              src={dashboardMockup}
              alt="Preview of the FYNORA admin dashboard showing revenue analytics, defaulters and WhatsApp payment automation."
              width={1600}
              height={1008}
              className="w-full rounded-2xl transition hover:brightness-[1.02]"
            />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
