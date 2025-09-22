'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type StatMetric = {
  label: string;
  current: number;
  goal?: number;
  suffix?: string;
  prefix?: string;
};

type NavLink = {
  href: string;
  label: string;
};

type HeroCopy = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
  proof: string;
  trust: string;
};

type USPItem = {
  id: string;
  label: string;
  detail: string;
};

type VideoClip = {
  id: string;
  label: string;
  title: string;
  description: string;
  metric: string;
  videoSrc: string;
  poster: string;
};

type BentoTile = {
  id: string;
  badge?: string;
  title: string;
  copy: string;
  metric?: string;
  tone: "light" | "dark";
};

type StoryCard = {
  id: string;
  title: string;
  excerpt: string;
  stat: string;
  image: string;
  alt: string;
};

type FAQ = {
  question: string;
  answer: string;
};

type FinalCTACopy = {
  eyebrow: string;
  headline: string;
  body: string;
  button: string;
  secondary: string;
};

type StickyCopy = {
  headline: string;
  subheadline: string;
  button: string;
};

type SectionCopy = {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
};

export type LandingContent = {
  brandName: string;
  navLinks: NavLink[];
  navDonateLabel: string;
  hero: HeroCopy;
  heroStats: StatMetric[];
  usp: {
    heading: SectionCopy;
    items: USPItem[];
  };
  howItWorks: {
    heading: SectionCopy;
    clips: VideoClip[];
  };
  bento: {
    heading: SectionCopy;
    tiles: BentoTile[];
  };
  stories: {
    heading: SectionCopy;
    cards: StoryCard[];
  };
  faq: {
    heading: SectionCopy;
    items: FAQ[];
  };
  final: FinalCTACopy;
  sticky: StickyCopy;
};

function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    const handleScrollUpdate = () => ScrollTrigger.update();
    const handleResize = () => ScrollTrigger.refresh();

    const startLenis = () => {
      if (lenis) return;

      lenis = new Lenis({
        duration: 1.05,
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
      lenis.on("scroll", handleScrollUpdate);
      window.addEventListener("resize", handleResize);
    };

    const stopLenis = () => {
      if (!lenis) return;

      lenis.off("scroll", handleScrollUpdate);
      lenis.destroy();
      lenis = null;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      window.removeEventListener("resize", handleResize);
    };

    if (!mediaQuery.matches) {
      startLenis();
    }

    const handlePreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        stopLenis();
      } else {
        startLenis();
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handlePreferenceChange);
    } else {
      mediaQuery.addListener(handlePreferenceChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handlePreferenceChange);
      } else {
        mediaQuery.removeListener(handlePreferenceChange);
      }
      stopLenis();
    };
  }, []);
}

const CTA_PRIMARY = "https://www.paypal.com/donate";
const CTA_FACEBOOK = "https://www.facebook.com";

const EN_CONTENT: LandingContent = {
  brandName: "Angels Haven for Paws",
  navLinks: [
    { href: "#usp", label: "Why £1" },
    { href: "#how", label: "How it works" },
    { href: "#bento", label: "Impact system" },
    { href: "#stories", label: "Rescue stories" },
    { href: "#faq", label: "FAQ" },
  ],
  navDonateLabel: "Donate £1",
  hero: {
    eyebrow: "Angels Haven • UK ↔ TR",
    headline: "Every Paw Matters — £1 Feeds a Dog Today",
    subheadline:
      "Micro-donations move two tonnes of food each month, fund emergency care, and fly rescues to safe foster homes across Turkey and the UK.",
    primaryCta: "Donate £1 Now",
    secondaryCta: "See the rescue flow",
    secondaryHref: "#how",
    proof: "2,146 donors funded 1,842 meals last month · Daily impact recap in under 5 minutes",
    trust: "Stripe & PayPal • Apple / Google Pay • We never store card details",
  },
  heroStats: [
    { label: "Food moved this month", current: 2000, suffix: " kg" },
    { label: "Dogs in foster & rehab", current: 38 },
    { label: "Emergency treatments funded", current: 12 },
  ],
  usp: {
    heading: {
      eyebrow: "Designed to convert",
      title: "Flagship motion, radical transparency, one CTA",
      copy: "Every element is tuned to keep donors in the flow until a dog is fed.",
      align: "left",
    },
    items: [
      {
        id: "instant-proof",
        label: "Instant proof",
        detail: "Live ticker, receipts, and reels update the moment your £1 arrives.",
      },
      {
        id: "secure-checkout",
        label: "Frictionless checkout",
        detail: "Apple Pay, Google Pay, Stripe, and PayPal 1-click with TLS 1.3.",
      },
      {
        id: "always-on",
        label: "Always-on transparency",
        detail: "24/7 ops feed with GPS logs, vet reports, and donation allocation.",
      },
    ],
  },
  howItWorks: {
    heading: {
      eyebrow: "How it works",
      title: "Scroll-triggered scenes walk you from tap to wagging tail",
      copy: "Three cinematic beats show exactly what happens after you donate.",
    },
    clips: [
      {
        id: "select",
        label: "Step 01",
        title: "Choose £1 or set your amount",
        description: "Radial selector pulses with haptic-style feedback as the live goal shifts in real time.",
        metric: "Avg. time to start: 6s",
        videoSrc: "/videos/hero-loop.mp4",
        poster: "/images/hero-rescue.png",
      },
      {
        id: "checkout",
        label: "Step 02",
        title: "Checkout without breaking stride",
        description: "Apple Pay, Google Pay, Stripe, and PayPal are wired into a single, encrypted sheet — one tap and you're done.",
        metric: "Completion rate: 82%",
        videoSrc: "/videos/farm-tour.mp4",
        poster: "/images/story-before.png",
      },
      {
        id: "follow",
        label: "Step 03",
        title: "Follow the impact feed",
        description: "Daily reels, vet receipts, and GPS heatmaps narrate the dog you just helped from street to foster home.",
        metric: "Updates drop hourly",
        videoSrc: "/videos/hero-loop.mp4",
        poster: "/images/story-after.png",
      },
    ],
  },
  bento: {
    heading: {
      eyebrow: "Impact system",
      title: "Ops, storytelling, and community in one rhythm",
      copy: "We borrowed launch-site polish to keep the mission warm and conversion-primed.",
    },
    tiles: [
      {
        id: "meals",
        badge: "Ops",
        title: "2 tonnes of food monthly",
        copy: "Logistics partners across Fethiye, Dalyan, and Izmir receive routed deliveries every 14 days.",
        metric: "Routes verified via GPS",
        tone: "light",
      },
      {
        id: "response",
        badge: "Emergency",
        title: "< 6 hr response time",
        copy: "Alerts funnel to an ops lead who unlocks vet care, treatment, and medication in under six hours on average.",
        metric: "Funded cases: 12 this month",
        tone: "dark",
      },
      {
        id: "flights",
        badge: "Transport",
        title: "Flight-ready in 21 days",
        copy: "Micro-gifts stack to cover vaccination, paperwork, and transport, moving dogs to UK foster sofas fast.",
        metric: "Avg. flight cost £420",
        tone: "light",
      },
      {
        id: "community",
        badge: "Community",
        title: "Live donor lounge",
        copy: "Private impact feed, motion recaps, and volunteer callouts keep supporters close to the rescue journey.",
        metric: "2,146 active donors",
        tone: "light",
      },
    ],
  },
  stories: {
    heading: {
      eyebrow: "Rescue stories",
      title: "Micro-donations turning into macro rescues",
      copy: "Scroll the chapters donors replay the most.",
    },
    cards: [
      {
        id: "mila",
        title: "Mila · Market street to London sofa",
        excerpt:
          "Found trembling outside a supermarket in Fethiye. £1 gifts funded vaccinations, nourishment, and a flight to London within 14 days.",
        stat: "Day 14: Mila asleep on a foster sofa",
        image: "/images/story-after.png",
        alt: "Mila resting on a sofa after rescue",
      },
      {
        id: "atlas",
        title: "Atlas · Emergency surgery to trail runs",
        excerpt:
          "Hit by a car near Antalya. Community donors paid for surgery, hydrotherapy, and relocation to Brighton — now he runs coastal trails.",
        stat: "Day 28: Atlas cleared for adoption",
        image: "/images/story-before.png",
        alt: "Atlas recovering happily",
      },
    ],
  },
  faq: {
    heading: {
      eyebrow: "FAQ",
      title: "Everything you’d ask before donating",
      copy: "If it isn’t covered here, we jump on a Loom or WhatsApp call within hours.",
    },
    items: [
      {
        question: "Do I really see where £1 goes?",
        answer:
          "Yes. Every donation triggers a live log update with meal counts, vet receipts, and a highlight in the daily impact reel.",
      },
      {
        question: "Is checkout encrypted?",
        answer:
          "We integrate Stripe and PayPal with TLS 1.3, Apple Pay, Google Pay, and Fraud Radar — no card details ever touch our servers.",
      },
      {
        question: "Can I pause or cancel recurring?",
        answer:
          "Absolutely. Manage recurring gifts instantly via your receipt — no forms, no wait time. One click to pause.",
      },
      {
        question: "How fast do rescues happen?",
        answer:
          "Emergency cases move from alert to funded treatment in under six hours on average, with timeline updates as each step completes.",
      },
      {
        question: "Will there be a receipt for tax?",
        answer:
          "Receipts hit your inbox instantly with HMRC-compliant summaries and a running ledger for monthly statements.",
      },
      {
        question: "What’s next after donating?",
        answer:
          "You join our private impact feed, unlock behind-the-scenes footage, and can opt in for meet-ups or flight volunteer missions.",
      },
    ],
  },
  final: {
    eyebrow: "Ready to fund the next rescue?",
    headline: "Make today safer for one more dog",
    body: "It takes £1 to trigger the chain: food on the ground, treatment underway, transport booked. Join the donors powering 2 tonnes of aid monthly.",
    button: "Donate £1 Now",
    secondary: "Visit the community feed",
  },
  sticky: {
    headline: "£1 feeds a dog today",
    subheadline: "Instant receipt · Encrypted checkout",
    button: "Donate",
  },
};

function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M48.5 12c-6 0-11 3.8-12.5 9C34.5 15.8 29.5 12 23.5 12 14 12 8 18 8 26c0 16 24 30 24 30s24-14 24-30c0-8-6-14-7.5-14z"
        fill="#1e6b55"
      />
      <circle cx="32" cy="36" r="10" fill="#ffb34b" />
      <circle cx="22" cy="32" r="4.4" fill="#ffb34b" />
      <circle cx="42" cy="32" r="4.4" fill="#ffb34b" />
      <circle cx="26.5" cy="23.5" r="4.1" fill="#ffb34b" />
      <circle cx="37.5" cy="23.5" r="4.1" fill="#ffb34b" />
    </svg>
  );
}

function AnimatedCounter({ value, suffix, goal, prefix }: { value: number; suffix?: string; goal?: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const formattedSuffix = suffix ?? "";
  const formattedPrefix = prefix ?? "";

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (!ref.current) return;
      const rounded = Math.round(latest);
      const number = rounded.toLocaleString();
      const usePrefix = formattedPrefix || (formattedSuffix === "£" ? "£" : "");
      const suffixText = formattedPrefix ? formattedSuffix : formattedSuffix === "£" ? "" : formattedSuffix;
      ref.current.textContent = `${usePrefix}${number}${suffixText}`;
    });
    return unsubscribe;
  }, [formattedPrefix, formattedSuffix, spring]);

  return (
    <>
      <span ref={ref} />
      {goal !== undefined && goal > 0 && (
        <span className="ml-1 text-xs text-white/70">/ {goal.toLocaleString()}</span>
      )}
    </>
  );
}

function SectionHeading({ copy }: { copy: SectionCopy }) {
  const alignClass = copy.align === "left" ? "items-start text-left" : "items-center text-center";
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignClass}`}>
      {copy.eyebrow && (
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
          {copy.eyebrow}
        </span>
      )}
      <h2 className="heading-font heading-xl text-ink">{copy.title}</h2>
      {copy.copy && <p className="text-base text-foreground/75 md:text-lg">{copy.copy}</p>}
    </div>
  );
}

function Navigation({ content }: { content: LandingContent }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-ink/10 bg-background/85 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="section-shell flex items-center justify-between py-4">
        <motion.a
          href="#top"
          className="group flex items-center gap-3"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <motion.div
            className="gradient-ring flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_18px_42px_rgba(13,61,45,0.35)]"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <LogoMark className="h-9 w-9" />
          </motion.div>
          <span className="heading-font text-lg text-ink group-hover:text-primary">
            {content.brandName}
          </span>
        </motion.a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-foreground/70 lg:flex">
          {content.navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={CTA_PRIMARY}
            className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold text-ink shadow-sm transition hover:bg-secondary/90"
          >
            {content.navDonateLabel}
          </a>
        </div>
      </div>
    </header>
  );
}

function AmbientVideo({
  src,
  poster,
  autoStart = true,
  loop = true,
  className,
}: {
  src: string;
  poster: string;
  autoStart?: boolean;
  loop?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(autoStart);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      const reduce = mediaQuery.matches;
      setShouldAutoPlay(!reduce && autoStart);

      const video = videoRef.current;
      if (!video) return;

      if (reduce || !autoStart) {
        video.pause();
      } else {
        const playPromise = video.play();
        if (typeof playPromise?.catch === "function") {
          playPromise.catch(() => {
            /* Autoplay can be blocked; ignore to keep fallback silent */
          });
        }
      }
    };

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
    } else {
      mediaQuery.addListener(updatePreference);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updatePreference);
      } else {
        mediaQuery.removeListener(updatePreference);
      }
    };
  }, [autoStart]);

  return (
    <video
      ref={videoRef}
      className={className ?? "absolute inset-0 h-full w-full object-cover"}
      autoPlay={shouldAutoPlay}
      loop={shouldAutoPlay && loop}
      muted
      playsInline
      poster={poster}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

function Hero({ content }: { content: LandingContent }) {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = heroRef.current;
    if (!container) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ctx: gsap.Context | null = null;

    const setStaticState = () => {
      container.querySelectorAll<HTMLElement>('[data-animate=hero-intro]').forEach((node) => {
        node.style.opacity = "1";
        node.style.transform = "none";
      });
    };

    const clearInlineStyles = () => {
      container.querySelectorAll<HTMLElement>('[data-animate=hero-intro]').forEach((node) => {
        node.style.removeProperty("opacity");
        node.style.removeProperty("transform");
      });
    };

    const runIntro = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        gsap.from("[data-animate=hero-intro]", {
          y: 36,
          opacity: 0,
          stagger: 0.08,
          duration: 1.15,
          ease: "power3.out",
          delay: 0.2,
        });
      }, container);
    };

    const applyPreference = (shouldReduce: boolean) => {
      if (shouldReduce) {
        if (ctx) {
          ctx.revert();
          ctx = null;
        }
        setStaticState();
        return;
      }

      clearInlineStyles();
      runIntro();
    };

    applyPreference(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      applyPreference(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }

      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  const hero = content.hero;

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative overflow-hidden bg-ink text-white"
    >
      <div className="absolute inset-0">
        <AmbientVideo src="/videos/hero-loop.mp4" poster="/images/hero-rescue.png" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(12,28,20,0.25),transparent_52%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#062017]/92 via-[#0b2b21]/82 to-[#143d2e]/78" />
        <div className="pointer-events-none absolute -left-24 top-[-18%] h-[420px] w-[420px] rounded-full bg-secondary/35 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-[-20%] h-[520px] w-[520px] rounded-full bg-primary/25 blur-3xl" />
      </div>
      <div className="section-shell relative grid min-h-screen items-center gap-16 py-[var(--space-12)] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/85" data-animate="hero-intro">
            <span>{hero.eyebrow}</span>
          </div>
          <div className="space-y-6">
            <motion.h1
              data-animate="hero-intro"
              className="display-hero max-w-3xl text-white drop-shadow-[0_35px_80px_rgba(0,0,0,0.45)]"
            >
              {hero.headline}
            </motion.h1>
            <p className="max-w-2xl text-lg text-white/85" data-animate="hero-intro">
              {hero.subheadline}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4" data-animate="hero-intro">
            <motion.a
              href={CTA_PRIMARY}
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-3 text-base font-semibold text-ink shadow-[0_28px_65px_rgba(255,179,75,0.32)] transition hover:bg-secondary/90"
            >
              {hero.primaryCta}
              <span className="text-lg">→</span>
            </motion.a>
            <a
              href={hero.secondaryHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline-offset-4 transition hover:text-white hover:underline"
            >
              {hero.secondaryCta}
            </a>
          </div>
          <div className="flex flex-col gap-3 text-sm text-white/70" data-animate="hero-intro">
            <span className="inline-flex items-center gap-2 text-white/80">
              <span className="inline-flex h-2 w-2 items-center justify-center rounded-full bg-secondary" />
              {hero.proof}
            </span>
            <span>{hero.trust}</span>
          </div>
        </div>
        <motion.aside
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
          className="rounded-[2.5rem] border border-white/15 bg-white/10 p-8 backdrop-blur"
        >
          <div className="grid gap-6">
            {content.heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.32em] text-white/60">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  <AnimatedCounter value={stat.current} suffix={stat.suffix} />
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white/70">
            <Image src="/images/founder-tulay.png" width={44} height={44} alt="Founder Tülay Demir" className="h-11 w-11 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-white/85">Tülay Demir — Founder</p>
              <p>“We design this funnel like a film premiere because every rescue deserves that energy.”</p>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function USPStrip({ content }: { content: LandingContent }) {
  return (
    <section id="usp" className="section-shell py-[var(--space-11)]">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <SectionHeading copy={content.usp.heading} />
        <a
          href={CTA_PRIMARY}
          className="inline-flex items-center justify-center self-start rounded-full border border-ink/10 bg-surface px-5 py-2 text-sm font-semibold text-ink shadow-sm transition hover:border-primary/40 hover:text-primary"
        >
          Start with £1 →
        </a>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {content.usp.items.map((item) => (
          <motion.article
            key={item.id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="rounded-3xl border border-ink/10 bg-surface-elevated p-7 shadow-[0_28px_58px_rgba(10,28,20,0.08)]"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">{item.label}</div>
            <p className="mt-4 text-sm text-foreground/80">{item.detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function HowItWorksSection({ content }: { content: LandingContent }) {
  return (
    <section id="how" className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,107,85,0.18),transparent_60%)]" />
      <div className="section-shell relative flex flex-col gap-12 py-[var(--space-12)]">
        <SectionHeading copy={content.howItWorks.heading} />
        <div className="grid gap-6 lg:grid-cols-3">
          {content.howItWorks.clips.map((clip, index) => (
            <motion.div
              key={clip.id}
              className="group relative overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/10 p-6 backdrop-blur"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[1.8rem] border border-white/10">
                <AmbientVideo
                  src={clip.videoSrc}
                  poster={clip.poster}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">{clip.label}</span>
                <h3 className="heading-font heading-sm text-white">{clip.title}</h3>
                <p className="text-sm text-white/75">{clip.description}</p>
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary/90">{clip.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoSection({ content }: { content: LandingContent }) {
  return (
    <section id="bento" className="section-shell py-[var(--space-12)]">
      <SectionHeading copy={content.bento.heading} />
      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        {content.bento.tiles.map((tile) => {
          const isDark = tile.tone === "dark";
          const colSpan = tile.id === "response" ? "lg:col-span-6" : "lg:col-span-3";
          const baseClass = isDark
            ? "bg-ink text-white border-ink/20"
            : "bg-surface-elevated text-foreground border-ink/10";
          return (
            <motion.article
              key={tile.id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 210, damping: 22 }}
              className={`flex h-full flex-col justify-between gap-6 rounded-[2.4rem] border p-7 shadow-[0_28px_58px_rgba(10,28,20,0.08)] ${baseClass} ${colSpan}`}
            >
              <div className="space-y-4">
                {tile.badge && (
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] ${isDark ? "bg-white/10 text-secondary" : "bg-primary/10 text-primary"}`}>
                    {tile.badge}
                  </span>
                )}
                <h3 className={`heading-font heading-sm ${isDark ? "text-white" : "text-ink"}`}>{tile.title}</h3>
                <p className={`text-sm ${isDark ? "text-white/80" : "text-foreground/80"}`}>{tile.copy}</p>
              </div>
              {tile.metric && (
                <span className={`text-xs font-semibold uppercase tracking-[0.28em] ${isDark ? "text-secondary/90" : "text-primary/80"}`}>
                  {tile.metric}
                </span>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function StoriesSection({ content }: { content: LandingContent }) {
  return (
    <section id="stories" className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,179,75,0.12),transparent_70%)]" />
      <div className="section-shell relative flex flex-col gap-12 py-[var(--space-12)]">
        <SectionHeading copy={content.stories.heading} />
        <div className="grid gap-6 md:grid-cols-2">
          {content.stories.cards.map((card, index) => (
            <motion.article
              key={card.id}
              className="rounded-[2.4rem] border border-white/12 bg-white/10 p-6 backdrop-blur"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            >
              <div className="relative mb-5 h-56 overflow-hidden rounded-[1.8rem]">
                <Image src={card.image} alt={card.alt} fill className="object-cover" />
              </div>
              <h3 className="heading-font heading-sm text-white">{card.title}</h3>
              <p className="mt-3 text-sm text-white/75">{card.excerpt}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-secondary/90">{card.stat}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.question ?? null);
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {items.map((faq) => {
        const isOpen = open === faq.question;
        return (
          <motion.div
            key={faq.question}
            className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-[0_26px_54px_rgba(10,28,20,0.08)]"
            initial={false}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 text-left"
              onClick={() => setOpen(isOpen ? null : faq.question)}
            >
              <span className="heading-font text-lg text-ink">{faq.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-2xl text-primary"
              >
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

function FAQSection({ content }: { content: LandingContent }) {
  return (
    <section id="faq" className="section-shell py-[var(--space-12)]">
      <SectionHeading copy={content.faq.heading} />
      <FAQAccordion items={content.faq.items} />
    </section>
  );
}

function FinalSection({ content }: { content: LandingContent }) {
  const final = content.final;
  return (
    <section className="section-shell py-[var(--space-12)]">
      <div className="rounded-[2.8rem] border border-ink/10 bg-ink p-10 text-white shadow-[0_36px_80px_rgba(10,28,20,0.28)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/75">
              {final.eyebrow}
            </span>
            <h2 className="heading-font heading-xl text-white">{final.headline}</h2>
            <p className="text-sm text-white/80 md:text-base">{final.body}</p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <a
              href={CTA_PRIMARY}
              className="inline-flex items-center justify-center rounded-full bg-secondary px-8 py-3 text-base font-semibold text-ink shadow-[0_28px_60px_rgba(255,179,75,0.35)] transition hover:bg-secondary/90"
            >
              {final.button}
            </a>
            <a
              href={CTA_FACEBOOK}
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-white/80 transition hover:border-secondary hover:text-secondary"
            >
              {final.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyDonateBar({ content }: { content: LandingContent }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 z-50 w-full max-w-[min(560px,calc(100%-2.5rem))] -translate-x-1/2 rounded-full border border-ink/5 bg-ink/95 px-5 py-4 text-white shadow-[0_40px_65px_rgba(10,28,20,0.45)] backdrop-blur lg:hidden"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <LogoMark className="h-10 w-10" />
              <div className="text-left">
                <p className="text-sm font-semibold">{content.sticky.headline}</p>
                <p className="text-xs text-white/70">{content.sticky.subheadline}</p>
              </div>
            </div>
            <a
              href={CTA_PRIMARY}
              className="inline-flex items-center justify-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:bg-secondary/90"
            >
              {content.sticky.button}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Landing({ content }: { content: LandingContent }) {
  useSmoothScroll();

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navigation content={content} />
      <Hero content={content} />
      <StickyDonateBar content={content} />
      <USPStrip content={content} />
      <HowItWorksSection content={content} />
      <BentoSection content={content} />
      <StoriesSection content={content} />
      <FAQSection content={content} />
      <FinalSection content={content} />
    </main>
  );
}

export default function Home() {
  return <Landing content={EN_CONTENT} />;
}
