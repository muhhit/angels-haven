'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type StatMetric = {
  label: string;
  current: number;
  goal?: number;
  suffix?: string;
};

type StoryCard = {
  name: string;
  headline: string;
  body: string;
  before: { image: string; alt: string };
  after: { image: string; alt: string };
};

type CampaignCard = {
  name: string;
  description: string;
  current: number;
  goal: number;
  cta: string;
  isPrimary?: boolean;
};

type DonationTier = {
  label: string;
  subtext?: string;
  highlight?: boolean;
};

type FAQ = {
  question: string;
  answer: string;
};

const CTA_PRIMARY = "https://www.paypal.com/donate";
const CTA_FACEBOOK = "https://www.facebook.com"; // TODO: replace with real link
const CTA_REPORT = "https://example.com/angels-haven-transparency.pdf";

const heroContent = {
  headline: "Every Paw Matters — Donate Today",
  subheadline:
    "Your small gift becomes food, care, and safety for dogs across the UK & Turkey — with monthly transparent reports and 1-click secure checkout.",
  primaryCta: "£1 Feeds a Dog Today",
  proofBar: "1,842 meals funded in the last 30 days · Daily updates in our Facebook group",
  trustLine: "Encrypted checkout • Instant email receipt • We never store card details",
};

const problemPoints = [
  "Shelters are full; meals run out daily.",
  "Medical bills can&apos;t wait — emergencies don&apos;t schedule themselves.",
  "Most donors never see their impact — you will.",
];

const uspStrip = "£1 = One Meal · Monthly Transparency · 1-Click Secure Checkout · UK–TR Operations";

const uspTiles = [
  {
    title: "Immediate Impact",
    copy: "Your £1 funds one meal today — watch the counter climb in real time.",
  },
  {
    title: "Radical Transparency",
    copy: "Monthly breakdown across food, shelter, treatment, and transport. No guesswork.",
  },
  {
    title: "Safe & Easy",
    copy: "1-click encrypted checkout with instant receipt. We never store card details.",
  },
];

const howSteps = [
  "Choose an amount (start with £1).",
  "Pay securely — Apple Pay, Google Pay, card, or PayPal.",
  "See the impact instantly: receipt, monthly summary, daily FB updates.",
];

const liveImpact: StatMetric[] = [
  { label: "Meals funded this month", current: 3350, goal: 5000 },
  { label: "Dogs helped this week", current: 27 },
  { label: "Emergency treatments funded", current: 11 },
];

const stories: StoryCard[] = [
  {
    name: "Mila",
    headline: "From Street to Safety (14 Days)",
    body:
      "Mila was trembling outside a supermarket in Fethiye. Within two weeks she received full vaccinations, nourishment, and a foster sofa in London — all funded by £1 gifts like yours.",
    before: { image: "/images/story-before.png", alt: "Mila before rescue" },
    after: { image: "/images/story-after.png", alt: "Mila after adoption" },
  },
  {
    name: "Duman",
    headline: "Running Again After Treatment",
    body:
      "Duman&apos;s leg was shattered after a car accident. Emergency donors paid for surgery, rehab, and flight costs. He now sprints on the beaches of Brighton, thanks to micro-donations.",
    before: { image: "/images/story-before.png", alt: "Duman before treatment" },
    after: { image: "/images/story-after.png", alt: "Duman after treatment" },
  },
];

const campaigns: CampaignCard[] = [
  {
    name: "Feed a Dog for £1 a Day",
    description: "Every £1 = 1 meal. Today&apos;s target: 200 meals.",
    current: 3350,
    goal: 5000,
    cta: "Give £1 Now",
    isPrimary: true,
  },
  {
    name: "Be an Angel — Sponsor a Paw (Monthly)",
    description: "Consistent support with monthly photo and story updates.",
    current: 0,
    goal: 0,
    cta: "Sponsor Monthly →",
  },
];

const donationTiers: DonationTier[] = [
  { label: "£1 — One Meal Today", highlight: true },
  { label: "£5 — Two Days of Meals" },
  { label: "£15 — Emergency Care Contribution" },
  { label: "£30 — One Week of Shelter" },
  { label: "Other — Choose your amount" },
];

const transparency = {
  description:
    "Every month we publish a clear breakdown across food, shelter, treatment, and transport. No jargon, no surprises.",
  pie: [
    { label: "Food", value: 40 },
    { label: "Shelter", value: 25 },
    { label: "Treatment", value: 25 },
    { label: "Transport", value: 10 },
  ],
};

const trustPoints = [
  "Encrypted checkout — we never store card details",
  "Instant email receipt for your records",
  "Aligned with UK standards across UK–TR operations",
  "Daily updates in our Facebook group",
];

const faqs: FAQ[] = [
  { question: "Do I get a receipt?", answer: "Yes—your receipt lands in your inbox instantly." },
  { question: "Is payment secure?", answer: "Yes—checkout is encrypted and we never store card details." },
  { question: "Where does my money go?", answer: "Monthly transparency reports show food, shelter, treatment, and transport percentages." },
  { question: "Does £1 really matter?", answer: "Absolutely—£1 funds one meal today. Micro-gifts stack up fast." },
  { question: "Is this UK/TR compliant?", answer: "Yes—operations align with UK standards and run jointly in the UK & Turkey." },
  { question: "Can I cancel recurring anytime?", answer: "Yes—manage or cancel with one click from your receipt." },
];

const finalCta = {
  headline: "Make Today a Little Safer for One Dog",
  button: "£1 Feeds a Dog Today",
  secondary: "Join our Facebook group for daily updates",
};

function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M48.5 12c-6 0-11 3.8-12.5 9C34.5 15.8 29.5 12 23.5 12 14 12 8 18 8 26c0 16 24 30 24 30s24-14 24-30c0-8-6-14-7.5-14z"
        fill="#1b5b45"
      />
      <circle cx="32" cy="36" r="10" fill="#f39a3d" />
      <circle cx="22" cy="32" r="4.4" fill="#f39a3d" />
      <circle cx="42" cy="32" r="4.4" fill="#f39a3d" />
      <circle cx="26.5" cy="23.5" r="4.1" fill="#f39a3d" />
      <circle cx="37.5" cy="23.5" r="4.1" fill="#f39a3d" />
    </svg>
  );
}

function AnimatedCounter({ value, suffix, goal }: { value: number; suffix?: string; goal?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const formattedSuffix = suffix ?? "";

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (!ref.current) return;
      const rounded = Math.round(latest);
      const prefix = formattedSuffix === "£" ? "£" : "";
      const suffixText = formattedSuffix === "£" ? "" : formattedSuffix;
      ref.current.textContent = `${prefix}${rounded}${suffixText}`;
    });
    return unsubscribe;
  }, [formattedSuffix, spring]);

  return (
    <>
      <span ref={ref} />
      {goal !== undefined && goal > 0 && (
        <span className="ml-1 text-sm text-white/70">/ {goal.toLocaleString()}</span>
      )}
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
      {eyebrow && (
        <span className="badge-muted inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em]">
          {eyebrow}
        </span>
      )}
      <h2 className="heading-font text-3xl leading-tight text-ink sm:text-4xl md:text-[2.6rem]">{title}</h2>
      {subtitle && <p className="max-w-2xl text-lg text-foreground/80">{subtitle}</p>}
    </div>
  );
}

function StickyCTA() {
  return (
    <div className="fixed inset-x-4 bottom-5 z-50 sm:hidden">
      <div className="flex items-center justify-between gap-4 rounded-full border border-white/20 bg-ink/95 px-5 py-4 text-white shadow-[0_20px_45px_rgba(17,36,27,0.35)]">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9, rotate: -6 }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <LogoMark className="h-7 w-7" />
        </motion.button>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold">£1 feeds a dog today</p>
          <p className="mt-1 text-xs text-white/70">Encrypted checkout · Instant receipt</p>
        </div>
        <a
          href={CTA_PRIMARY}
          className="inline-flex items-center justify-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:bg-secondary/90"
        >
          Donate
        </a>
      </div>
    </div>
  );
}

function FloatingPaws() {
  const pawPositions = useMemo(
    () => [
      { style: { top: "10%", left: "12%" }, delay: 0 },
      { style: { top: "20%", right: "15%" }, delay: 1.4 },
      { style: { bottom: "18%", left: "22%" }, delay: 0.8 },
      { style: { bottom: "12%", right: "20%" }, delay: 2 },
      { style: { top: "35%", left: "45%" }, delay: 1.1 },
    ],
    []
  );

  return (
    <>
      {pawPositions.map((pos, idx) => (
        <motion.span
          key={idx}
          className="absolute text-[2.4rem]"
          style={pos.style}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: [0, 0.9, 0], y: [-10, 10, -10], scale: [0.8, 1.05, 0.8] }}
          transition={{ duration: 9, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
        >
          🐾
        </motion.span>
      ))}
    </>
  );
}

function HeroVideo({ src, poster }: { src: string; poster: string }) {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

function ScrollVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const trigger = ScrollTrigger.create({
      trigger: video,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        video.currentTime = 0;
        void video.play();
      },
      onEnterBack: () => void video.play(),
      onLeave: () => video.pause(),
      onLeaveBack: () => video.pause(),
    });

    return () => {
      video.pause();
      trigger.kill();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="metadata"
      poster={poster}
      className="absolute inset-0 h-full w-full object-cover"
      controls={false}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}


function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.question ?? null);
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {items.map((faq) => {
        const isOpen = open === faq.question;
        return (
          <motion.div key={faq.question} className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm" initial={false}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 text-left"
              onClick={() => setOpen(isOpen ? null : faq.question)}
            >
              <span className="heading-font text-xl text-ink">{faq.question}</span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="text-2xl text-primary">
                ⌄
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.p
                  className="mt-4 text-sm text-foreground/75"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function DonationTierSelector({ tiers }: { tiers: DonationTier[] }) {
  const [selected, setSelected] = useState(tiers[0]?.label ?? "");

  return (
    <div className="flex flex-wrap gap-3">
      {tiers.map((tier) => (
        <button
          key={tier.label}
          onClick={() => setSelected(tier.label)}
          className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
            selected === tier.label
              ? "border-primary bg-primary text-white shadow-lg"
              : "border-ink/15 bg-white text-ink hover:border-primary/40"
          }`}
        >
          {tier.label}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-background/95 via-background/80 to-background/60 backdrop-blur">
        <div className="section-shell flex items-center justify-between py-4">
          <motion.a href="/" className="group flex items-center gap-3" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}>
            <motion.div
              className="gradient-ring flex h-11 w-11 items-center justify-center rounded-full"
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              whileTap={{ scale: 0.92, rotate: -4 }}
            >
              <LogoMark className="h-8 w-8" />
            </motion.div>
            <span className="heading-font text-lg text-ink group-hover:text-primary">Angels Haven for Paws</span>
          </motion.a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-foreground/80 md:flex">
            <a href="#problem" className="hover:text-primary">
              Why donate
            </a>
            <a href="#how" className="hover:text-primary">
              How it works
            </a>
            <a href="#impact" className="hover:text-primary">
              Impact
            </a>
            <a href="#faq" className="hover:text-primary">
              FAQ
            </a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href={CTA_REPORT} className="text-sm font-semibold text-ink underline-offset-4 transition hover:text-primary hover:underline">
              Transparency report
            </a>
            <a
              href={CTA_PRIMARY}
              className="inline-flex items-center justify-center rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-ink shadow-sm transition hover:bg-secondary/90"
            >
              £1 Feeds a Dog
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <HeroVideo src="/videos/hero-loop.mp4" poster="/images/story-after.png" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f19]/85 via-[#102b22]/70 to-[#1d4437]/60" />
          <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-5%] h-[26rem] w-[26rem] rounded-full bg-primary/35 blur-3xl" />
          <FloatingPaws />
        </div>
        <div className="section-shell relative flex min-h-[78vh] flex-col justify-center gap-12 py-24 text-white sm:py-36">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/90">
              <span>Angel Haven</span>
              <span className="h-1 w-1 rounded-full bg-white/60" />
              <span>UK & Turkey</span>
            </div>
            <div className="space-y-5">
              <motion.h1
                className="heading-font text-[3.4rem] leading-[1.03] text-white drop-shadow-[0_35px_60px_rgba(0,0,0,0.45)] sm:text-[4rem]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                {heroContent.headline}
              </motion.h1>
              <p className="max-w-2xl text-lg text-white/85 sm:text-xl">{heroContent.subheadline}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={CTA_PRIMARY}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-3 text-base font-semibold text-ink shadow-[0_25px_55px_rgba(20,63,48,0.3)] transition hover:bg-secondary/90"
              >
                {heroContent.primaryCta}
              </a>
              <a
                href={CTA_PRIMARY}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Donate in 1 Click
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/75">
              <p>{heroContent.trustLine}</p>
              <a href={CTA_FACEBOOK} className="inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline">
                Join our Facebook group for daily updates →
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-wrap gap-4 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white/85 shadow-[0_15px_35px_rgba(17,36,27,0.25)] backdrop-blur"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              {heroContent.proofBar}
            </span>
          </motion.div>
        </div>
      </section>

      <section id="problem" className="bg-cream py-20">
        <div className="section-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="The Hard Truth"
              title="The Hard Truth (and the Simple Fix)"
              subtitle="Shelters are full; meals run out daily. Emergencies don&apos;t wait — but your £1 meal can."
              align="left"
            />
            <div className="mt-10 space-y-4">
              {problemPoints.map((point) => (
                <motion.div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <span className="mt-1 text-lg">❗</span>
                  <p className="text-base text-foreground/80">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            className="relative h-80 overflow-hidden rounded-3xl border border-ink/10 shadow-lg"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image src="/images/story-before.png" alt="Shelter dog waiting for food" fill className="object-cover" />
            <div className="absolute bottom-4 left-4 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-primary">Shelters run out by sunset</div>
          </motion.div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="section-shell space-y-10">
          <SectionHeading
            eyebrow="Why your £1 works"
            title="Why Your £1 Here Works Harder"
            subtitle="Micro-gifts add up quickly when the process is transparent, fast, and secure."
          />
          <div className="rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm">{uspStrip}</div>
          <div className="grid gap-6 md:grid-cols-3">
            {uspTiles.map((tile) => (
              <motion.div
                key={tile.title}
                className="rounded-3xl border border-ink/10 bg-white p-8 shadow-sm"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <h3 className="heading-font text-xl text-ink">{tile.title}</h3>
                <p className="mt-4 text-sm text-foreground/75">{tile.copy}</p>
              </motion.div>
            ))}
          </div>
          <a href={CTA_PRIMARY} className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
            See my £1 feed a dog →
          </a>
        </div>
      </section>

      <section id="how" className="section-shell py-20">
        <SectionHeading
          eyebrow="How it works"
          title="3 Steps to Turn £1 into a Meal"
          subtitle="Start small, feel the impact immediately, and stay in the loop."
          align="left"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {howSteps.map((step, idx) => (
            <motion.div
              key={step}
              className="rounded-3xl border border-ink/10 bg-white p-8 shadow-sm"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: "easeOut" }}
            >
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">Step {idx + 1}</span>
              <p className="mt-4 text-base text-foreground/80">{step}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10">
          <a
            href={CTA_PRIMARY}
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary/90"
          >
            Donate in 1 Click
          </a>
        </div>
      </section>

      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="See it happen"
          title="Watch a rescue unfold"
          subtitle="Scroll to play a 30-second glimpse of life at Angels Haven — from midnight pickup to sunrise rehab."
        />
        <div className="mt-10 overflow-hidden rounded-3xl border border-ink/10 shadow-lg">
          <div className="relative h-[22rem] sm:h-[26rem]">
            <ScrollVideo src="/videos/farm-tour.mp4" poster="/images/story-before.png" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-primary">Recorded at Angels Haven farm</div>
          </div>
        </div>
        <p className="mt-4 text-sm text-foreground/70">Video auto-plays as you reach it. Volume is muted to respect your environment; tap to unmute if you&apos;d like sound.</p>
      </section>

      <section id="impact" className="bg-gradient-to-br from-ink via-ink to-primary py-20 text-white">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionHeading
            eyebrow="Live impact"
            title="Your Impact, Live"
            subtitle="Numbers update daily. Micro-gifts add up fast."
            align="left"
          />
          <div ref={statsRef} className="grid gap-6 sm:grid-cols-3 lg:col-span-2">
            {liveImpact.map((metric, idx) => (
              <motion.div
                key={metric.label}
                className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur"
                initial={{ opacity: 0, y: 22 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              >
                <p className="text-2xl font-semibold text-white">
                  <AnimatedCounter value={metric.current} goal={metric.goal} />
                </p>
                <p className="mt-2 text-sm text-white/80">{metric.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="lg:col-span-full space-y-3">
            <a
              href={CTA_PRIMARY}
              className="inline-flex items-center gap-2 rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Help Close the Gap →
            </a>
            <p className="text-xs text-white/70">Numbers update daily. Micro-gifts add up fast.</p>
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <SectionHeading eyebrow="Stories" title="Real Dogs. Real Change." subtitle="Swipe through the journeys your £1 unlocks." align="left" />
        <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-10">
            {stories.map((story) => (
              <motion.article
                key={story.name}
                className="grid gap-4 sm:grid-cols-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="relative h-64 overflow-hidden rounded-3xl border border-ink/10">
                  <Image src={story.before.image} alt={story.before.alt} fill className="object-cover" />
                  <div className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                    Before
                  </div>
                </div>
                <div className="relative h-64 overflow-hidden rounded-3xl border border-ink/10">
                  <Image src={story.after.image} alt={story.after.alt} fill className="object-cover" />
                  <div className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-ink">
                    After
                  </div>
                </div>
                <div className="sm:col-span-2 space-y-3 rounded-3xl bg-white p-6 shadow-sm">
                  <h3 className="heading-font text-xl text-ink">{story.headline}</h3>
                  <p className="text-sm text-foreground/75">{story.body}</p>
                  <a
                    href={CTA_PRIMARY}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Fund More Recoveries →
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
          <motion.div
            className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-ink/10 bg-white p-8 shadow-lg"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="heading-font text-2xl text-ink">Choose How You Help</h3>
            <div className="space-y-6">
              {campaigns.map((campaign) => {
                const percentage = campaign.goal > 0 ? Math.min(100, Math.round((campaign.current / campaign.goal) * 100)) : 0;
                return (
                  <div key={campaign.name} className={`rounded-3xl border p-6 ${campaign.isPrimary ? "border-primary bg-primary/10" : "border-ink/10 bg-foreground/5"}`}>
                    <div className="flex items-center justify-between">
                      <h4 className="heading-font text-lg text-ink">{campaign.name}</h4>
                      {campaign.goal > 0 && (
                        <span className="text-sm font-semibold text-primary">{percentage}%</span>
                      )}
                    </div>
                    {campaign.goal > 0 && (
                      <div className="mt-3 h-2 rounded-full bg-foreground/10">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
                      </div>
                    )}
                    <p className="mt-3 text-sm text-foreground/70">{campaign.description}</p>
                    <a href={CTA_PRIMARY} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
                      {campaign.cta}
                    </a>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Donation tiers"
          title="Pick a Gift (Change Today)"
          subtitle="Tap an amount to start. £1 is highlighted because it&apos;s the fastest way to feed a dog today."
        />
        <div className="mt-12 space-y-6">
          <DonationTierSelector tiers={donationTiers} />
          <p className="text-sm text-foreground/70">Instant receipt. Manage or cancel recurring gifts anytime.</p>
          <a
            href={CTA_PRIMARY}
            className="inline-flex items-center justify-center rounded-full bg-secondary px-7 py-3 text-base font-semibold text-ink shadow-lg transition hover:bg-secondary/90"
          >
            Donate in 1 Click
          </a>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="section-shell space-y-10">
          <SectionHeading
            eyebrow="Transparency"
            title="Where Your Money Goes"
            subtitle={transparency.description}
          />
          <div className="flex flex-col gap-3">
            {transparency.pie.map((slice) => (
              <div key={slice.label} className="flex items-center gap-4">
                <span className="w-24 text-sm font-semibold text-primary">{slice.label}</span>
                <div className="h-2 flex-1 rounded-full bg-foreground/10">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${slice.value}%` }} />
                </div>
                <span className="w-12 text-sm font-semibold text-primary">{slice.value}%</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href={CTA_REPORT} className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
              View Last Month&apos;s Report →
            </a>
            <span className="text-sm text-foreground/70">Aligned with UK standards; operating across UK & Turkey.</span>
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <SectionHeading eyebrow="Trust & Safety" title="Safe by Design" subtitle="We take security and compliance seriously so you can give confidently." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {trustPoints.map((point) => (
            <motion.div
              key={point}
              className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className="text-2xl">🔒</span>
              <p className="mt-4 text-sm text-foreground/75">{point}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8">
          <a href={CTA_FACEBOOK} className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
            See today&apos;s updates →
          </a>
        </div>
      </section>

      <section id="faq" className="section-shell py-20">
        <SectionHeading eyebrow="FAQ" title="Objection-free giving" subtitle="Short answers to the most common questions." />
        <FAQAccordion items={faqs} />
      </section>

      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Community"
          title="What Angel Haven supporters say"
          subtitle="Hundreds of UK donors keep this pipeline moving so Tülay can focus on rescues."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <motion.div
            className="rounded-3xl border border-ink/10 bg-white p-10 shadow-lg"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <p className="text-lg text-foreground/80">
              &quot;The raw Angels Briefing livestreams let me see every surgery, cuddle session and airport handover. It&apos;s the only charity where I feel on the ground without leaving London.&quot;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/15 text-center text-xl leading-[2.5rem]">🐶</div>
              <div>
                <p className="text-base font-semibold text-primary">Susan</p>
                <p className="text-sm text-foreground/60">Angel Club member since 2021</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="rounded-3xl border border-ink/10 bg-white p-10 shadow-lg"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          >
            <p className="text-lg text-foreground/80">
              &quot;I escorted two flights with Tülay. Watching the coordination from Fethiye to Heathrow convinced me to sponsor three crates a year.&quot;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/15 text-center text-xl leading-[2.5rem]">🐾</div>
              <div>
                <p className="text-base font-semibold text-primary">Martin & Jude</p>
                <p className="text-sm text-foreground/60">Flight Partners · Manchester</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 pb-40 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-ink to-ink" />
        <div className="section-shell relative flex flex-col items-center gap-6 text-center text-white">
          <h2 className="heading-font text-3xl sm:text-4xl">{finalCta.headline}</h2>
          <p className="max-w-2xl text-lg text-white/85">
            £1 feeds a dog today. Secure checkout takes seconds, and you&apos;ll see the receipt instantly.
          </p>
          <a
            href={CTA_PRIMARY}
            className="inline-flex items-center justify-center rounded-full bg-secondary px-8 py-3 text-base font-semibold text-ink shadow-lg transition hover:bg-secondary/90"
          >
            {finalCta.button}
          </a>
          <a href={CTA_FACEBOOK} className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline">
            {finalCta.secondary}
          </a>
        </div>
      </section>

      <footer className="bg-ink py-10 text-white/70">
        <div className="section-shell flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Angels Haven for Paws. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:hello@angelshavenforpaws.org" className="hover:text-white">
              Contact
            </a>
            <a href="#" className="hover:text-white">
              Privacy & Cookies
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href={CTA_FACEBOOK} className="hover:text-white">
              Facebook
            </a>
          </div>
        </div>
      </footer>

      <StickyCTA />
    </main>
  );
}
