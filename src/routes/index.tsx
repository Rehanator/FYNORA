import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, LineChart, Rocket, Gauge, Quote } from "lucide-react";

import heroVideo from "@/assets/1.mp4.asset.json";
import strategicVideo from "@/assets/2.mp4.asset.json";
import reviewVideo from "@/assets/3.mp4.asset.json";
import bookkeepingVideo from "@/assets/4.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Controller — Financial Management for Service SMEs" },
      {
        name: "description",
        content:
          "Comprehensive financial management for growing service SMEs: strategic oversight, monthly financial reviews and far more than bookkeeping.",
      },
      { property: "og:title", content: "The Controller — Financial Management for Service SMEs" },
      {
        property: "og:description",
        content:
          "Comprehensive financial management for growing service SMEs: strategic oversight, monthly financial reviews and far more than bookkeeping.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "The Controller — Financial Management for Service SMEs" },
      {
        name: "twitter:description",
        content:
          "Comprehensive financial management for growing service SMEs: strategic oversight, monthly financial reviews and far more than bookkeeping.",
      },
    ],
  }),
  component: ControllerLanding,
});

const INK = "#093242";
const BLUE = "#3166e8";
const RAISED = "#ebf6fa";
const SHADOW = "rgba(0, 15, 66, 0.16) 0px 4px 24px 0px";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

function LoopVideo({ src, label }: { src: string; label: string }) {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      aria-label={label}
      className="mix-blend-multiply w-full h-auto rounded-[24px] object-cover"
    />
  );
}

function CtaButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#contact"
      className={`group inline-flex items-center gap-2 rounded-[12px] px-6 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#3166e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3166e8] focus-visible:ring-offset-2 ${className}`}
      style={{ backgroundColor: INK }}
    >
      Schedule a call
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </a>
  );
}

const QUESTIONS = [
  { name: "Julie R.", role: "CEO, Agency", q: "Can we hire this month?" },
  { name: "Marc D.", role: "Founder, IT Services", q: "Which clients are actually profitable?" },
  { name: "Sofia L.", role: "COO, Consulting", q: "Will cash cover payroll in 90 days?" },
  { name: "Adam P.", role: "Partner, Studio", q: "Are our rates still right for 2026?" },
];

const STEPS = [
  {
    icon: LineChart,
    title: "Analysis",
    body: "We map your books, margins and cash cycle to find where the numbers stop telling the truth.",
  },
  {
    icon: Rocket,
    title: "Deployment",
    body: "We install the reporting, controls and cadence your team needs — no new software chaos.",
  },
  {
    icon: Gauge,
    title: "Control",
    body: "Every month you get reliable figures, clear decisions and a controller who owns the follow-up.",
  },
];

const FEATURES = [
  {
    title: "Strategic financial management for growth",
    body: "Budgets, scenarios and cash forecasts built around your service delivery model — so growth decisions stop being guesses.",
    bullets: ["Rolling 13-week cash forecast", "Margin analysis per client and project", "Hiring and pricing scenarios"],
    video: strategicVideo.url,
    label: "Animation of strategic financial planning",
  },
  {
    title: "A monthly financial review",
    body: "A structured session with a dedicated controller: what happened, why it happened, and the three decisions that matter next month.",
    bullets: ["Closed books by day 10", "Plain-language KPI dashboard", "Written action list after every review"],
    video: reviewVideo.url,
    label: "Animation of a monthly financial review",
  },
  {
    title: "Much more than bookkeeping",
    body: "Bookkeeping is the raw material. We turn it into governance: controls, compliance, lender-ready reporting and board packs.",
    bullets: ["Internal controls and approvals", "Bank and investor reporting", "Year-end handled with your accountant"],
    video: bookkeepingVideo.url,
    label: "Animation illustrating services beyond bookkeeping",
  },
];

function ControllerLanding() {
  return (
    <div className="min-h-dvh bg-white text-[#093242]" style={{ fontFamily: "urbane, ui-sans-serif, system-ui, sans-serif", fontSize: 16 }}>
      {/* Hero */}
      <section className="mx-auto w-[min(1200px,calc(100%-2rem))] pt-16 pb-20 sm:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: BLUE }}>
              The Controller
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Comprehensive financial management for growing service{" "}
              <span style={{ color: BLUE }}>SMEs</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#093242]/75">
              An outsourced financial controller for service businesses that have outgrown
              spreadsheets — reliable figures, monthly reviews, and decisions you can defend.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <CtaButton />
              <a
                href="#approach"
                className="inline-flex items-center gap-2 rounded-[12px] border border-[#093242]/15 px-6 py-3.5 text-base font-semibold transition-colors duration-200 hover:bg-[#ebf6fa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3166e8] focus-visible:ring-offset-2"
              >
                See our approach
              </a>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} className="min-w-0">
            <LoopVideo src={heroVideo.url} label="3D animation of financial dashboards" />
          </motion.div>
        </div>
      </section>

      {/* Questions grid */}
      <section className="py-20" style={{ backgroundColor: RAISED }}>
        <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              We help you answer these questions with{" "}
              <span style={{ color: BLUE }}>reliable figures</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[#093242]/75">
              Every founder we work with is asking the same handful of questions. The difference is
              whether the answer comes from a hunch or from the books.
            </p>
          </motion.div>

          <ul className="grid gap-6 sm:grid-cols-2">
            {QUESTIONS.map((item, i) => (
              <motion.li
                key={item.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className={`rounded-[24px] bg-white p-6 ${i % 2 === 1 ? "sm:mt-10" : ""}`}
                style={{ boxShadow: SHADOW }}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: BLUE }}
                    aria-hidden="true"
                  >
                    {item.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">{item.name}</span>
                    <span className="block truncate text-sm text-[#093242]/60">{item.role}</span>
                  </span>
                </div>
                <p className="mt-5 text-lg font-medium leading-snug">“{item.q}”</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3-step approach */}
      <section id="approach" className="mx-auto w-[min(1200px,calc(100%-2rem))] py-24 scroll-mt-20">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl"
        >
          A three-step approach, repeated every month
        </motion.h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              className="min-w-0"
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-[12px]"
                style={{ backgroundColor: RAISED, color: BLUE }}
              >
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#093242]/45">
                Step {i + 1}
              </p>
              <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-[#093242]/75">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Zig-zag features */}
      <section className="mx-auto w-[min(1200px,calc(100%-2rem))] pb-24">
        <div className="flex flex-col gap-24">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={`min-w-0 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <h3 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  {feature.title}
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-[#093242]/75">{feature.body}</p>
                <ul className="mt-7 space-y-3">
                  {feature.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: BLUE }}
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`min-w-0 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <LoopVideo src={feature.video} label={feature.label} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24" style={{ backgroundColor: RAISED }}>
        <motion.figure
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto w-[min(880px,calc(100%-2rem))] rounded-[24px] bg-white p-8 sm:p-12"
          style={{ boxShadow: SHADOW }}
        >
          <Quote className="h-8 w-8" style={{ color: BLUE }} aria-hidden="true" />
          <blockquote className="mt-6 text-2xl font-medium leading-snug sm:text-3xl">
            “We went from arguing about numbers to deciding with them. The monthly review is now the
            most useful hour in our calendar.”
          </blockquote>
          <figcaption className="mt-8 flex min-w-0 items-center gap-3">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-bold text-white"
              style={{ backgroundColor: INK }}
              aria-hidden="true"
            >
              É
            </span>
            <span className="min-w-0">
              <span className="block truncate font-semibold">Élise Tremblay</span>
              <span className="block truncate text-sm text-[#093242]/60">
                President, Nord Services Group
              </span>
            </span>
          </figcaption>
        </motion.figure>
      </section>

      {/* Footer */}
      <footer id="contact" className="mx-auto w-[min(1200px,calc(100%-2rem))] py-20 scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: BLUE }}>
              The Controller
            </p>
            <h2 className="mt-4 max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">
              Get the monthly figures brief
            </h2>
            <form
              className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@company.com"
                className="min-w-0 flex-1 rounded-[12px] border border-[#093242]/15 bg-white px-4 py-3 text-base placeholder:text-[#093242]/45 focus-visible:border-[#3166e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3166e8] focus-visible:ring-offset-2"
              />
              <button
                type="submit"
                className="shrink-0 rounded-[12px] px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#093242] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3166e8] focus-visible:ring-offset-2"
                style={{ backgroundColor: BLUE }}
              >
                Subscribe
              </button>
            </form>
          </div>
          <CtaButton />
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-[#093242]/10 pt-8 text-sm text-[#093242]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} The Controller. All rights reserved.</p>
          <nav className="flex flex-wrap gap-6">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a
                key={l}
                href="#contact"
                className="rounded-[12px] transition-colors hover:text-[#3166e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3166e8] focus-visible:ring-offset-2"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
