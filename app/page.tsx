'use client';

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type MediaAsset = {
  poster: string;
  video?: string;
  alt: string;
};

type StatMetric = {
  label: string;
  value: number;
  suffix?: string;
};

type HeroQuickAction = {
  id: string;
  label: string;
  caption: string;
  href: string;
  icon: "adopt" | "sponsor" | "visit" | "donate";
};

type HeroContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  summary: string;
  ctaLabel: string;
  ctaHref: string;
  donateHref: string;
  donateAmounts: number[];
  stats: StatMetric;
  quickActions: HeroQuickAction[];
  media: MediaAsset;
  defaultSelectionLabel: string;
  liveCounter: {
    label: string;
    initial: number;
    minIncrement: number;
    maxIncrement: number;
    intervalMs: number;
    suffix?: string;
  };
  socialProof: {
    id: string;
    metric: string;
    caption: string;
    media?: MediaAsset;
  }[];
  urgency: {
    remainingLabel: string;
    remainingValue: string;
    goalLabel: string;
    goalPercent: number;
    footer: string;
  };
  recurringHint: string;
  ticker: {
    headline: string;
    entries: DonationTickerEntry[];
  };
};

type StepItem = {
  id: string;
  badge: string;
  title: string;
  copy: string;
  media: MediaAsset;
};

type StoryItem = {
  id: string;
  title: string;
  copy: string;
  stat: string;
  media: {
    before: MediaAsset;
    after: MediaAsset;
    clip?: MediaAsset;
  };
  ctaLabel: string;
  ctaHref: string;
};

type BentoItem = {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  ctaLabel: string;
  href: string;
};

type AdoptionPet = {
  id: string;
  name: string;
  age: string;
  breed: string;
  temperament: string;
  story: string;
  image: string;
  badge?: string;
  medicalNotes?: string;
  adoptHref: string;
  sponsorHref: string;
};

type AdoptionContent = {
  eyebrow: string;
  headline: string;
  intro: string;
  cta: {
    adopt: { label: string; href: string };
    sponsor: { label: string; href: string };
  };
  pets: AdoptionPet[];
  steps: { id: string; title: string; description: string }[];
  fallback: {
    headline: string;
    copy: string;
    donateLabel: string;
    donateHref: string;
  };
};

type FAQItem = {
  question: string;
  answer: string;
};

type DonationTickerEntry = {
  id: string;
  name: string;
  amount: number;
  city: string;
  minutesAgo: number;
  method: string;
};

type TrustSignal = {
  id: string;
  title: string;
  detail: string;
  proof: string;
  icon?: string;
};

type TrustMetric = {
  id: string;
  label: string;
  value: string;
  caption: string;
};

type Accreditation = {
  id: string;
  label: string;
  description: string;
  href?: string;
};

type TrustReview = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

type TrustMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
};

type MediaMention = {
  id: string;
  outlet: string;
  href: string;
  date: string;
  headline: string;
};

type TrustContent = {
  headline: string;
  copy: string;
  signals: TrustSignal[];
  metrics: TrustMetric[];
  accreditations: Accreditation[];
  reviews: TrustReview[];
  team: TrustMember[];
  media: MediaMention[];
  contact: { label: string; value: string; href?: string }[];
  proofDocument: { label: string; href: string; description: string };
};

type FooterContent = {
  registration: string;
  address: string;
  email: string;
  phone: string;
  hours: string;
  socials: { label: string; href: string }[];
  policies: { label: string; href: string }[];
  legal: { label: string; href: string }[];
};

export type LandingContent = {
  hero: HeroContent;
  usp: string[];
  steps: StepItem[];
  stories: StoryItem[];
  adoption: AdoptionContent;
  bento: BentoItem[];
  faq: FAQItem[];
  final: {
    eyebrow: string;
    headline: string;
    body: string;
    ctaLabel: string;
    secondaryLabel: string;
    secondaryHref: string;
    donateHref: string;
  };
  trust: TrustContent;
  footer: FooterContent;
};

const CTA_PRIMARY = "https://www.paypal.com/donate";
const CTA_REPORT = "https://example.com/angels-haven-transparency.pdf";
const CTA_COMMUNITY = "https://www.facebook.com";

const RAIL_SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "how", label: "Flow" },
  { id: "stories", label: "Stories" },
  { id: "impact", label: "Impact" },
  { id: "trust", label: "Trust" },
] as const;

type RailSectionId = (typeof RAIL_SECTIONS)[number]["id"];

function trackEvent(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const data = { event, ...payload };
  const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(layer)) {
    layer.push(data);
  } else {
    window.dispatchEvent(new CustomEvent(event, { detail: payload }));
  }
}

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(query.matches);
    const handler = (event: MediaQueryListEvent) => setPrefers(event.matches);
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", handler);
    } else {
      query.addListener(handler);
    }
    return () => {
      if (typeof query.removeEventListener === "function") {
        query.removeEventListener("change", handler);
      } else {
        query.removeListener(handler);
      }
    };
  }, []);
  return prefers;
}

function usePointerShift(disabled: boolean) {
  useEffect(() => {
    if (typeof window === "undefined" || disabled) return;
    let raf = 0;
    const setVars = (x: number, y: number) => {
      document.documentElement.style.setProperty("--pointer-x", x.toFixed(3));
      document.documentElement.style.setProperty("--pointer-y", y.toFixed(3));
    };
    const handle = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 2;
      const y = (event.clientY / innerHeight - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setVars(x, y));
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handle);
      document.documentElement.style.setProperty("--pointer-x", "0");
      document.documentElement.style.setProperty("--pointer-y", "0");
    };
  }, [disabled]);
}

function useSmoothScroll(disabled: boolean) {
  useEffect(() => {
    if (typeof window === "undefined" || disabled) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    let lenis: Lenis | null = null;
    let rafId: number | null = null;
    let resizeAttached = false;

    const handleScrollUpdate = () => ScrollTrigger.update();
    const handleResize = () => ScrollTrigger.refresh();

    const attachResize = () => {
      if (!resizeAttached) {
        window.addEventListener("resize", handleResize, { passive: true });
        resizeAttached = true;
      }
    };

    const detachResize = () => {
      if (resizeAttached) {
        window.removeEventListener("resize", handleResize);
        resizeAttached = false;
      }
    };

    const startLenis = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.05,
        lerp: 0.08,
        smoothWheel: true,
      });
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      lenis.on("scroll", handleScrollUpdate);
      attachResize();
    };

    const stopLenis = () => {
      if (!lenis) return;
      lenis.off("scroll", handleScrollUpdate);
      lenis.destroy();
      lenis = null;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      detachResize();
    };

    const handleDesktopToggle = (event: MediaQueryListEvent) => {
      if (event.matches) {
        startLenis();
      } else {
        stopLenis();
      }
    };

    if (desktopQuery.matches) {
      startLenis();
    }
    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", handleDesktopToggle);
    } else {
      desktopQuery.addListener(handleDesktopToggle);
    }

    return () => {
      if (typeof desktopQuery.removeEventListener === "function") {
        desktopQuery.removeEventListener("change", handleDesktopToggle);
      } else {
        desktopQuery.removeListener(handleDesktopToggle);
      }
      stopLenis();
    };
  }, [disabled]);
}

function AnimatedCounter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const spring = useSpring(0, { stiffness: 90, damping: 20 });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (!ref.current) return;
      ref.current.textContent = `${Math.round(latest).toLocaleString()}${suffix ?? ""}`;
    });
    return unsubscribe;
  }, [spring, suffix]);

  return <span ref={ref} />;
}

function MagneticButton({ href, children, className, onHover }: { href: string; children: ReactNode; className?: string; onHover?: () => void }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const node = ref.current;
    if (!node) return;

    const handleMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      node.style.transform = `translate(${x * 0.15}px, ${y * 0.18}px)`;
    };

    const reset = () => {
      node.style.transform = "translate(0, 0)";
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", reset);
    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", reset);
    };
  }, [prefersReducedMotion]);

  return (
    <a
      ref={ref}
      href={href}
      className={`cta-primary inline-flex items-center gap-2 px-8 py-3 text-sm uppercase tracking-[0.32em] ${className ?? ""}`}
      onMouseEnter={onHover}
    >
      {children}
    </a>
  );
}

function Navigation({ content, solid }: { content: LandingContent; solid: boolean }) {
  return (
    <header
      className={`pointer-events-auto fixed inset-x-0 top-0 z-[90] transition-colors duration-300 ${
        solid ? "bg-[rgba(11,15,13,0.7)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="section-shell flex items-center justify-between py-4">
        <a href="#hero" className="flex items-center gap-3 text-sm font-semibold tracking-[0.22em] text-white/80">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white">
            AH
          </span>
          <span className="hidden text-xs uppercase text-white/70 md:inline">Angels Haven</span>
        </a>
        <nav className="hidden items-center gap-10 text-sm font-medium text-white/70 md:flex">
          <a href="#how" className="transition hover:text-white">
            How it works
          </a>
          <a href="#stories" className="transition hover:text-white">
            Rescue stories
          </a>
          <a href="#impact" className="transition hover:text-white">
            Impact
          </a>
          <a href="#trust" className="transition hover:text-white">
            Trust
          </a>
          <a href="#faq" className="transition hover:text-white">
            FAQ
          </a>
          <a href="/about" className="transition hover:text-white">
            About
          </a>
          <a href="/transparency" className="transition hover:text-white">
            Transparency
          </a>
        </nav>
        <MagneticButton
          href={content.hero.donateHref}
          className="hidden md:inline-flex"
          onHover={() => trackEvent("cta_click_primary", { surface: "nav-hover" })}
        >
          £1 Feeds a Dog Today
        </MagneticButton>
      </div>
    </header>
  );
}

function RailIndicators() {
  const [active, setActive] = useState<RailSectionId>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as RailSectionId);
          }
        });
      },
      { threshold: 0.35 }
    );

    RAIL_SECTIONS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-[3%] top-1/2 z-[70] hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
      {RAIL_SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className="group flex flex-col items-center gap-2 text-[0.55rem] uppercase tracking-[0.32em] text-white/40"
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          <span className="rail-indicator" data-active={active === id} />
          <span className={`transition-colors ${active === id ? "text-white/85" : ""}`}>{label}</span>
        </button>
      ))}
    </div>
  );
}

function HeroMedia({ media, active, prefersReducedMotion }: { media: MediaAsset; active: boolean; prefersReducedMotion: boolean }) {
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(min-width: 640px)");
    setCanPlayVideo(query.matches);
    const handler = (event: MediaQueryListEvent) => setCanPlayVideo(event.matches);
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", handler);
      return () => query.removeEventListener("change", handler);
    }
    query.addListener(handler);
    return () => query.removeListener(handler);
  }, []);

  const shouldPlay = active && !prefersReducedMotion && Boolean(media.video) && canPlayVideo;
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image src={media.poster} alt={media.alt} fill priority className={`object-cover transition-opacity duration-700 ${shouldPlay ? "opacity-0" : "opacity-100"}`} />
      {shouldPlay && media.video && (
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster={media.poster}>
          <source src={media.video} type="video/mp4" />
        </video>
      )}
      <div className="hero-mask" />
      <div className="hero-glow" data-variant="1" />
      <div className="hero-glow" data-variant="2" />
    </div>
  );
}

function Hero({ content, prefersReducedMotion }: { content: LandingContent; prefersReducedMotion: boolean }) {
  const mediaObserverRef = useRef<IntersectionObserver | null>(null);
  const [videoActive, setVideoActive] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = heroRef.current;
    if (!container || prefersReducedMotion) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVideoActive(entry.isIntersecting);
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(container);
    mediaObserverRef.current = observer;
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVideoActive(false);
      mediaObserverRef.current?.disconnect();
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const container = heroRef.current;
    if (!container) return;
    if (prefersReducedMotion) {
      gsap.set(container.querySelectorAll("[data-hero-animate]") as NodeListOf<HTMLElement>, { opacity: 1, y: 0 });
      return;
    }
    const screenQuery = window.matchMedia("(min-width: 768px)");
    if (!screenQuery.matches) {
      gsap.set(container.querySelectorAll("[data-hero-animate]") as NodeListOf<HTMLElement>, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-animate]", {
        y: 36,
        opacity: 0,
        stagger: 0.08,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const { hero } = content;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-surface relative flex min-h-[100dvh] snap-start items-center justify-center overflow-hidden"
    >
      <HeroMedia media={hero.media} active={videoActive} prefersReducedMotion={prefersReducedMotion} />
      <div className="section-shell relative z-10 grid gap-12 py-32 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-8">
          <span data-hero-animate className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            {hero.eyebrow}
          </span>
          <div className="space-y-6 text-white">
            <h1 data-hero-animate className="display-hero max-w-3xl">
              {hero.headline}
            </h1>
            <p data-hero-animate className="max-w-xl text-base text-white/75">
              {hero.subheadline}
            </p>
            <p data-hero-animate className="text-sm uppercase tracking-[0.35em] text-white/45">
              {hero.summary}
            </p>
          </div>
          <div className="flex flex-col gap-6" data-hero-animate>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                href={hero.ctaHref}
                onHover={() => trackEvent("cta_click_primary", { surface: "hero-primary" })}
              >
                {hero.ctaLabel}
              </MagneticButton>
              <button
                type="button"
                className="cta-muted text-xs uppercase tracking-[0.3em] text-white/70"
                onClick={() => {
                  trackEvent("cta_click_secondary", { surface: "hero" });
                  window.open(CTA_REPORT, "_blank");
                }}
              >
                Monthly report
              </button>
            </div>
            <DonationAmounts amounts={hero.donateAmounts} href={hero.donateHref} label={hero.defaultSelectionLabel} />
            <RecurringHint hint={hero.recurringHint} />
            <LiveDonationPulse config={hero.liveCounter} prefersReducedMotion={prefersReducedMotion} />
            <UrgencyBanner data={hero.urgency} />
            <HeroSocialProof items={hero.socialProof} prefersReducedMotion={prefersReducedMotion} />
            <RecentDonationsTicker ticker={hero.ticker} prefersReducedMotion={prefersReducedMotion} />
          </div>
        </div>
        <motion.aside
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
          className="glass-card flex h-fit flex-col gap-6 rounded-[2.4rem] border border-white/15 bg-white/8 p-6 text-white/80"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">{hero.stats.label}</p>
            <p className="mt-2 text-4xl font-semibold text-white">
              <AnimatedCounter value={hero.stats.value} suffix={hero.stats.suffix} />
            </p>
          </div>
          <HeroQuickActions actions={hero.quickActions} />
        </motion.aside>
      </div>
      <ScrollPrompt />
    </section>
  );
}

function HeroQuickActions({ actions }: { actions: HeroQuickAction[] }) {
  if (!actions.length) return null;
  return (
    <div className="flex flex-col gap-3 text-sm">
      <span className="text-xs uppercase tracking-[0.28em] text-white/55">Quick ways to help</span>
      <div className="flex flex-col gap-3">
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            className="group flex items-start gap-3 rounded-[1.8rem] border border-white/12 bg-white/6 px-4 py-3 transition hover:border-white/35 hover:bg-white/12"
            onClick={() => trackEvent("hero_quick_action", { id: action.id })}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
              <QuickActionIcon icon={action.icon} />
            </span>
            <span className="flex flex-1 flex-col">
              <span className="text-sm font-semibold text-white">{action.label}</span>
              <span className="text-[0.75rem] text-white/65">{action.caption}</span>
            </span>
            <span className="mt-1 text-xs uppercase tracking-[0.24em] text-white/45">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function ScrollPrompt() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/50 md:flex"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
    >
      Scroll to explore
      <motion.span
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      >
        ↓
      </motion.span>
    </motion.div>
  );
}

function DonationAmounts({ amounts, href, label }: { amounts: number[]; href: string; label?: string }) {
  const [active, setActive] = useState<number | null>(amounts[0] ?? null);
  return (
    <div className="flex flex-wrap gap-2">
      {amounts.map((amount) => {
        const isActive = active === amount;
        return (
          <motion.button
            key={amount}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className={`inline-flex min-w-[72px] items-center justify-center rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] transition ${
              isActive ? "bg-white text-[#101815]" : "border border-white/20 text-white/70 hover:text-white"
            }`}
            onClick={() => {
              setActive(amount);
              trackEvent("donation_amount_select", { amount, currency: "GBP" });
              window.open(href, "_blank");
            }}
          >
            £{amount}
          </motion.button>
        );
      })}
      {label && (
        <div className="mt-2 flex w-full items-center gap-2 text-xs text-white/70">
          <span className="text-base">★</span>
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}

function LiveDonationPulse({
  config,
  prefersReducedMotion,
}: {
  config: HeroContent["liveCounter"];
  prefersReducedMotion: boolean;
}) {
  const { initial, intervalMs, minIncrement, maxIncrement, label, suffix } = config;
  const [count, setCount] = useState(initial);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = window.setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * (maxIncrement - minIncrement + 1)) + minIncrement);
    }, intervalMs);
    return () => window.clearInterval(interval);
  }, [intervalMs, minIncrement, maxIncrement, prefersReducedMotion]);

  return (
    <div className="glass-card flex items-center gap-4 rounded-[2rem] border border-white/15 bg-white/8 px-5 py-4 text-white/80">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">
        ⏱
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-xs uppercase tracking-[0.28em] text-white/55">{label}</span>
        <span className="text-lg font-semibold text-white">{count.toLocaleString()} {suffix}</span>
      </div>
    </div>
  );
}

function HeroSocialProof({ items, prefersReducedMotion }: { items: HeroContent["socialProof"]; prefersReducedMotion: boolean }) {
  if (!items.length) return null;
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="glass-card flex flex-col gap-3 rounded-[1.6rem] border border-white/12 bg-white/6 px-4 py-4 text-white/80">
          {item.media ? (
            <div className="relative h-32 overflow-hidden rounded-[1.2rem] border border-white/12">
              <Image src={item.media.poster} alt={item.media.alt} fill className={`object-cover transition-opacity duration-500 ${item.media.video && !prefersReducedMotion ? 'opacity-0' : 'opacity-100'}`} />
              {item.media.video && !prefersReducedMotion && (
                <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster={item.media.poster}>
                  <source src={item.media.video} type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-black/0" />
            </div>
          ) : null}
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-white">{item.metric}</span>
            <span className="text-xs uppercase tracking-[0.28em] text-white/55">{item.caption}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RecentDonationsTicker({ ticker, prefersReducedMotion }: { ticker: HeroContent["ticker"]; prefersReducedMotion: boolean }) {
  const [entries, setEntries] = useState(() => ticker.entries);

  useEffect(() => {
    setEntries(ticker.entries);
  }, [ticker.entries]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (entries.length <= 1) return;
    const id = window.setInterval(() => {
      setEntries((prev) => {
        if (prev.length <= 1) return prev;
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 4800);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, entries.length]);

  return (
    <div className="glass-card flex flex-col gap-3 rounded-[2rem] border border-white/12 bg-white/8 px-5 py-4 text-white/85" aria-live="polite">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/55">
        <span>{ticker.headline}</span>
        <span className="inline-flex items-center gap-1 text-[0.65rem]">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[#ff6f61]" aria-hidden="true" />
          Live
        </span>
      </div>
      <ul className="flex flex-col gap-3 text-sm text-white/80">
        {entries.slice(0, 4).map((entry) => (
          <li key={entry.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white/6 px-3 py-2">
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-white">{entry.name}</span>
              <span className="text-xs uppercase tracking-[0.24em] text-white/55">{entry.city} • {entry.method}</span>
            </div>
            <div className="flex flex-col items-end leading-tight">
              <span className="text-base font-semibold text-white">£{entry.amount}</span>
              <span className="text-xs text-white/55">{entry.minutesAgo}m ago</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


function UrgencyBanner({ data }: { data: HeroContent["urgency"] }) {
  const percent = Math.min(100, Math.max(0, data.goalPercent));
  return (
    <div className="glass-card flex flex-col gap-3 rounded-[2rem] border border-white/12 bg-white/8 px-5 py-4 text-white/80">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/55">
        <span>{data.remainingLabel}</span>
        <span>{data.goalLabel}</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-semibold text-white">{data.remainingValue}</span>
        <span className="text-xs text-white/60">{percent}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/15">
        <div className="h-full rounded-full bg-white" style={{ width: `${percent}%` }} />
      </div>
      <span className="text-xs text-white/60">{data.footer}</span>
    </div>
  );
}


function TrustSection({ content, prefersReducedMotion }: { content: TrustContent; prefersReducedMotion: boolean }) {
  return (
    <section id="trust" className="snap-none bg-[#f2eee8] py-28 text-[#101815]">
      <div className="section-shell space-y-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#61726c]">Due diligence</span>
            <h2 className="heading-xl text-[#101815]">{content.headline}</h2>
            <p className="max-w-2xl text-sm text-[#3b4743]">{content.copy}</p>
          </div>
          <div className="grid gap-4">
            {content.metrics.map((metric) => (
              <motion.article
                key={metric.id}
                className="rounded-3xl border border-[#101815]/10 bg-white/80 p-6 shadow-[0_22px_60px_rgba(16,24,21,0.08)]"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#61726c]">{metric.label}</p>
                <p className="mt-2 text-3xl font-semibold text-[#101815]">{metric.value}</p>
                <p className="mt-2 text-sm text-[#3b4743]">{metric.caption}</p>
              </motion.article>
            ))}
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {content.signals.map((signal) => (
            <motion.article
              key={signal.id}
              className="rounded-3xl border border-[#101815]/10 bg-white/90 p-6 text-[#101815] shadow-[0_18px_42px_rgba(16,24,21,0.08)]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-[#61726c]">{signal.title}</p>
              <p className="mt-3 text-sm text-[#3b4743]">{signal.detail}</p>
              <p className="mt-4 text-xs text-[#3b4743]/80">{signal.proof}</p>
            </motion.article>
          ))}
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {content.accreditations.map((item) => (
                <span key={item.id} className="inline-flex items-center gap-2 rounded-full border border-[#101815]/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#42504b]">
                  {item.label}
                </span>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {content.reviews.map((review) => (
                <motion.blockquote
                  key={review.id}
                  className="rounded-3xl border border-[#101815]/10 bg-white/90 p-6 text-[#101815] shadow-[0_18px_42px_rgba(16,24,21,0.08)]"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <p className="text-sm text-[#2f3936]">“{review.quote}”</p>
                  <footer className="mt-4 text-xs uppercase tracking-[0.26em] text-[#61726c]">
                    {review.name} • {review.role}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-[#101815]/10 bg-white/90 p-6 shadow-[0_22px_60px_rgba(16,24,21,0.08)]">
            <h3 className="heading-sm text-[#101815]">Proof kit</h3>
            <p className="mt-3 text-sm text-[#3b4743]">{content.proofDocument.description}</p>
            <a href={content.proofDocument.href} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#0d5044]" target="_blank" rel="noreferrer">
              {content.proofDocument.label}
            </a>
            <div className="mt-6 space-y-2 text-sm text-[#3b4743]">
              {content.contact.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.28em] text-[#61726c]">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="text-[#0d5044]">{item.value}</a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <h3 className="heading-md text-[#101815]">Meet the team powering rescues</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {content.team.map((member) => (
                <motion.article
                  key={member.id}
                  className="rounded-3xl border border-[#101815]/10 bg-white/95 p-6 shadow-[0_18px_42px_rgba(16,24,21,0.08)]"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <p className="text-sm font-semibold text-[#101815]">{member.name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#61726c]">{member.role}</p>
                  <p className="mt-3 text-sm text-[#3b4743]">{member.bio}</p>
                </motion.article>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="heading-md text-[#101815]">Press & independent mentions</h3>
            <ul className="space-y-3 text-sm text-[#3b4743]">
              {content.media.map((item) => (
                <li key={item.id} className="flex flex-col rounded-2xl border border-[#101815]/10 bg-white/95 px-4 py-3">
                  <span className="text-xs uppercase tracking-[0.26em] text-[#61726c]">{item.date} • {item.outlet}</span>
                  <a href={item.href} className="text-[#0d5044]" target="_blank" rel="noreferrer">
                    {item.headline}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterBar({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-[#050807] py-12 text-white/70">
      <div className="section-shell grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-3 text-sm">
          <span className="text-xs uppercase tracking-[0.28em] text-white/45">Registered charity</span>
          <p className="text-white">{content.registration}</p>
          <p>{content.address}</p>
          <p>{content.hours}</p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.28em] text-white/60">
            {content.socials.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-white" target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-6 text-sm">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.28em] text-white/45">Get in touch</span>
            <a href={`mailto:${content.email}`} className="block text-white">{content.email}</a>
            <a href={`tel:${content.phone.replace(' ', '')}`} className="block text-white">{content.phone}</a>
          </div>
          <div className="space-y-3 text-xs uppercase tracking-[0.28em] text-white/60">
            <div className="flex flex-wrap gap-4">
              {content.policies.map((item) => (
                <a key={item.label} href={item.href} className="transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {content.legal.map((item) => (
                <a key={item.label} href={item.href} className="transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function RecurringHint({ hint }: { hint: string }) {
  if (!hint) return null;
  return <p className="text-xs text-white/60">{hint}</p>;
}

function USPStrip({ items }: { items: string[] }) {
  return (
    <section className="snap-none border-t border-b border-white/10 bg-[rgba(12,16,14,0.72)] py-6 text-[0.7rem] uppercase tracking-[0.35em] text-white/60 backdrop-blur">
      <div className="section-shell flex flex-wrap items-center justify-between gap-6">
        {items.map((item) => (
          <span key={item} className="flex items-center gap-3">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-white/40" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function SmartVideo({ media, prefersReducedMotion, onPlay }: { media: MediaAsset; prefersReducedMotion: boolean; onPlay: () => void }) {
  const [shouldPlay, setShouldPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldPlay(true);
          } else {
            setShouldPlay(false);
          }
        });
      },
      { threshold: 0.55 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!shouldPlay || prefersReducedMotion || !media.video) {
      video.pause();
      video.currentTime = 0;
      return;
    }
    const playPromise = video.play();
    if (typeof playPromise?.then === "function") {
      playPromise
        .then(() => onPlay())
        .catch(() => undefined);
    }
  }, [shouldPlay, prefersReducedMotion, media.video, onPlay]);

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/5">
      <Image src={media.poster} alt={media.alt} width={720} height={405} className={`h-full w-full object-cover transition-opacity duration-500 ${shouldPlay && !prefersReducedMotion && media.video ? "opacity-0" : "opacity-100"}`} />
      {!prefersReducedMotion && media.video && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${shouldPlay ? "opacity-100" : "opacity-0"}`}
          muted
          loop
          playsInline
          poster={media.poster}
        >
          <source src={media.video} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-black/0" />
    </div>
  );
}

function HowItWorks({ content, prefersReducedMotion }: { content: LandingContent; prefersReducedMotion: boolean }) {
  return (
    <section id="how" className="snap-start flex min-h-[100dvh] items-center bg-[#0d1412]">
      <div className="section-shell grid gap-12 py-28 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-start">
        <div className="sticky top-32 flex flex-col gap-4 text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">How it works</span>
          <h2 className="heading-xl">Scroll-triggered scenes walk you from tap to wagging tail.</h2>
          <p className="text-sm uppercase tracking-[0.28em] text-white/45">Choose amount → Pay securely → See impact</p>
        </div>
        <div className="grid gap-8 lg:pl-12">
          {content.steps.map((step, index) => (
            <motion.article
              key={step.id}
              className="glass-card flex h-full flex-col gap-5 rounded-[2.2rem] border border-white/12 bg-white/5 p-6 text-white"
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-white/55">{step.badge}</span>
              <SmartVideo
                media={step.media}
                prefersReducedMotion={prefersReducedMotion}
                onPlay={() => trackEvent("story_video_play", { id: step.id, surface: "how_it_works" })}
              />
              <div className="space-y-3">
                <h3 className="heading-sm text-white">{step.title}</h3>
                <p className="text-sm text-white/70">{step.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({ media }: { media: StoryItem["media"] }) {
  const [position, setPosition] = useState(52);
  return (
    <div className="relative overflow-hidden rounded-[1.9rem] border border-white/12 bg-white/5">
      <Image src={media.after.poster} alt={media.after.alt} width={720} height={520} className="h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image src={media.before.poster} alt={media.before.alt} width={720} height={520} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-black/0" />
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
        Before
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onInput={(event) => setPosition(Number((event.target as HTMLInputElement).value))}
          className="h-[2px] w-[60%] appearance-none rounded-full bg-white/30"
        />
        After
      </div>
    </div>
  );
}

function Stories({ content, prefersReducedMotion }: { content: LandingContent; prefersReducedMotion: boolean }) {
  return (
    <section id="stories" className="snap-start flex min-h-[100dvh] items-center bg-[#0e1a16]">
      <div className="section-shell grid gap-10 py-28">
        <div className="max-w-3xl space-y-4 text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Rescue stories</span>
          <h2 className="heading-xl">Micro-donations opening cinematic rescue chapters.</h2>
        </div>
        <div className="grid gap-7 md:grid-cols-2">
          {content.stories.map((story, index) => (
            <motion.article
              key={story.id}
              className="glass-card flex h-full flex-col justify-between gap-6 rounded-[2.2rem] border border-white/12 bg-white/5 p-6 text-white"
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            >
              <BeforeAfter media={story.media} />
              <div className="space-y-4">
                <div>
                  <h3 className="heading-sm">{story.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{story.copy}</p>
                </div>
                <SmartVideo
                  media={{ poster: story.media.after.poster, video: story.media.clip?.video, alt: story.media.after.alt }}
                  prefersReducedMotion={prefersReducedMotion}
                  onPlay={() => trackEvent("story_video_play", { id: story.id, surface: "stories" })}
                />
                <p className="text-xs uppercase tracking-[0.32em] text-white/55">{story.stat}</p>
              </div>
              <a
                href={story.ctaHref}
                className="cta-muted inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/75"
                onClick={() => trackEvent("cta_click_primary", { surface: "stories", id: story.id })}
              >
                {story.ctaLabel}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdoptionShowcase({
  content,
  prefersReducedMotion,
}: {
  content: LandingContent["adoption"];
  prefersReducedMotion: boolean;
}) {
  return (
    <section id="adopt" className="snap-start relative overflow-hidden bg-[#0b1612]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1c6956_0%,transparent_58%)] opacity-40" aria-hidden />
      <div className="section-shell relative z-10 flex flex-col gap-12 py-28 text-white">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              {content.eyebrow}
            </span>
            <h2 className="heading-xl">{content.headline}</h2>
            <p className="text-base text-white/75">{content.intro}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <MagneticButton
                href={content.cta.adopt.href}
                onHover={() => trackEvent("cta_click_primary", { surface: "adoption-primary" })}
              >
                {content.cta.adopt.label}
              </MagneticButton>
              <button
                type="button"
                className="cta-muted inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/8 px-6 py-3 text-xs uppercase tracking-[0.32em] text-white/75 transition hover:border-white/40 hover:text-white"
                onClick={() => {
                  trackEvent("cta_click_primary", { surface: "adoption-sponsor" });
                  window.open(content.cta.sponsor.href, "_blank");
                }}
              >
                {content.cta.sponsor.label}
              </button>
            </div>
          </div>
          <div className="glass-card h-fit rounded-[2.4rem] border border-white/15 bg-white/8 p-6 text-white/80">
            <h3 className="heading-sm text-white">Adoption journey in 3 steps</h3>
            <ul className="mt-4 space-y-4 text-sm text-white/70">
              {content.steps.map((step) => (
                <li key={step.id} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/8 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                    {step.id}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{step.title}</p>
                    <p className="text-[0.85rem] text-white/65">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.pets.map((pet, index) => (
            <motion.article
              key={pet.id}
              className="group glass-card flex h-full flex-col overflow-hidden rounded-[2.3rem] border border-white/15 bg-white/8"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: prefersReducedMotion ? 0 : index * 0.08 }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={pet.image}
                  alt={`Portrait of ${pet.name}`}
                  fill
                  sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                {pet.badge ? (
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/20 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white backdrop-blur">
                    {pet.badge}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6 text-white">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="heading-sm text-white">{pet.name}</h3>
                    <span className="text-xs uppercase tracking-[0.28em] text-white/50">{pet.age}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-white/60">
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 uppercase tracking-[0.24em]">
                      {pet.breed}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 uppercase tracking-[0.24em]">
                      {pet.temperament}
                    </span>
                    {pet.medicalNotes ? (
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 uppercase tracking-[0.24em]">
                        {pet.medicalNotes}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-white/70">{pet.story}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-3">
                  <a
                    href={pet.adoptHref}
                    className="cta-primary inline-flex items-center justify-center px-6 py-2 text-[0.7rem] uppercase tracking-[0.32em]"
                    onClick={() => trackEvent("cta_click_primary", { surface: "adoption-card", id: pet.id })}
                  >
                    Start adoption
                  </a>
                  <a
                    href={pet.sponsorHref}
                    className="cta-muted inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-[0.7rem] uppercase tracking-[0.28em] text-white/75"
                    onClick={() => trackEvent("cta_click_primary", { surface: "adoption-sponsor-card", id: pet.id })}
                  >
                    Sponsor {pet.name}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="glass-card flex flex-col gap-4 rounded-[2.4rem] border border-white/15 bg-white/6 p-6 text-white/80 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h3 className="heading-sm text-white">{content.fallback.headline}</h3>
            <p className="text-sm text-white/70">{content.fallback.copy}</p>
          </div>
          <button
            type="button"
            className="cta-primary inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-[0.32em]"
            onClick={() => {
              trackEvent("cta_click_primary", { surface: "adoption-fallback" });
              window.open(content.fallback.donateHref, "_blank");
            }}
          >
            {content.fallback.donateLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

function Bento({ content }: { content: LandingContent }) {
  return (
    <section id="impact" className="snap-start flex min-h-[100dvh] items-center bg-[#101b16]">
      <div className="section-shell grid gap-12 py-28">
        <div className="max-w-3xl space-y-4 text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Impact system</span>
          <h2 className="heading-xl">Ops, storytelling, and community in one rhythm.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {content.bento.map((tile) => (
            <motion.article
              key={tile.id}
              className="glass-card flex h-full flex-col justify-between gap-5 rounded-[2.2rem] border border-white/12 bg-white/5 p-7 text-white"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">{tile.eyebrow}</span>
                <h3 className="heading-md text-white">{tile.title}</h3>
                <p className="text-sm text-white/70">{tile.copy}</p>
              </div>
              <a
                href={tile.href}
                className="cta-muted inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/80"
                onClick={() => trackEvent("cta_click_primary", { surface: "bento", id: tile.id })}
              >
                {tile.ctaLabel}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ content }: { content: LandingContent }) {
  const [open, setOpen] = useState<string | null>(content.faq[0]?.question ?? null);
  return (
    <section id="faq" className="snap-none bg-[#f6f4f0] py-28 text-[#101815]">
      <div className="section-shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-5">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4f5d58]">FAQ</span>
          <h2 className="heading-xl text-[#101815]">Everything you need before you hit donate.</h2>
        </div>
        <div className="space-y-4">
          {content.faq.map((item) => {
            const isOpen = open === item.question;
            return (
              <motion.div key={item.question} className="rounded-3xl border border-[#101815]/12 bg-white p-6 shadow-[0_24px_56px_rgba(16,24,21,0.08)]" initial={false}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setOpen(isOpen ? null : item.question)}
                >
                  <span className="heading-sm text-[#101815]">{item.question}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-2xl text-[#ff6f61]">
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      className="mt-4 text-sm text-[#4f5d58]"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      {item.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ content }: { content: LandingContent }) {
  const { final } = content;
  return (
    <section id="donate" className="snap-none relative flex min-h-[100dvh] items-center overflow-hidden bg-[#0b1411]">
      <div className="absolute -inset-[30%] bg-[radial-gradient(circle_at_center,#1d6e59_0%,transparent_58%)] opacity-35" />
      <div className="hero-mask" />
      <div className="section-shell relative z-10 grid gap-10 py-28 text-white lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
            {final.eyebrow}
          </span>
          <h2 className="heading-xl">{final.headline}</h2>
          <p className="max-w-xl text-sm text-white/75">{final.body}</p>
        </div>
        <div className="flex flex-col gap-4 self-end">
          <MagneticButton
            href={final.donateHref}
            onHover={() => trackEvent("cta_click_primary", { surface: "final-hover" })}
          >
            {final.ctaLabel}
          </MagneticButton>
          <a href={final.secondaryHref} className="cta-muted inline-flex items-center justify-center text-xs uppercase tracking-[0.3em] text-white/75">
            {final.secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

function StickyDonateDock({ label, href }: { label: string; href: string }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const doc = document.documentElement;
      const height = doc.scrollHeight - window.innerHeight;
      const ratio = height > 0 ? window.scrollY / height : 0;
      setProgress(ratio);
      setVisible(window.scrollY > window.innerHeight * 0.55);
    };
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 56 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 z-[95] w-full max-w-[min(560px,calc(100%-2.5rem))] -translate-x-1/2 overflow-hidden rounded-full border border-white/10 bg-[rgba(11,15,13,0.9)] shadow-[0_30px_80px_rgba(6,10,9,0.65)] backdrop-blur lg:hidden"
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 text-white">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.3em] text-white/55">Donate</span>
              <span className="text-sm font-semibold">{label}</span>
            </div>
            <MagneticButton href={href}>{label}</MagneticButton>
          </div>
          <div className="h-1 w-full bg-white/10">
            <div className="h-full bg-white" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function QuickActionIcon({ icon }: { icon: HeroQuickAction["icon"] }) {
  switch (icon) {
    case "adopt":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4.5 12a3.5 3.5 0 1 1 6.8-1.2" />
          <path d="M19.5 12a3.5 3.5 0 1 0-6.8-1.2" />
          <path d="M5.4 14.5C6.5 17 9.9 19 12 19s5.5-2 6.6-4.5" strokeLinecap="round" />
        </svg>
      );
    case "sponsor":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 21c6-3.2 8-5.9 8-9.2a4.8 4.8 0 0 0-8-3.4 4.8 4.8 0 0 0-8 3.4C4 15.1 6 17.8 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "visit":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 21c4.6-4.6 7-8.3 7-11.3A7 7 0 0 0 5 9.7C5 12.7 7.4 16.4 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="9.7" r="2.3" />
        </svg>
      );
    case "donate":
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 9h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z" />
          <path d="M9 9V7a3 3 0 0 1 6 0v2" />
        </svg>
      );
  }
}

function ExitIntentModal({
  open,
  onClose,
  donateHref,
  adoptionHref,
  prefersReducedMotion,
}: {
  open: boolean;
  onClose: () => void;
  donateHref: string;
  adoptionHref: string;
  prefersReducedMotion: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(6,10,9,0.72)] backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            className="glass-card relative max-w-lg rounded-[2.6rem] border border-white/12 bg-white/10 px-8 py-10 text-white"
            initial={{ scale: prefersReducedMotion ? 1 : 0.92, opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: prefersReducedMotion ? 1 : 0.92, opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-6 top-6 text-white/60 transition hover:text-white"
              onClick={onClose}
              aria-label="Close reminder"
            >
              ×
            </button>
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">Wait—one last wag</span>
            <h3 className="heading-md mt-4 text-white">Before you go, meet the dogs waiting on transport.</h3>
            <p className="mt-3 text-sm text-white/70">
              Two minutes to browse the adoption pack—or tap sponsor and keep meals coming while they wait.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton
                href={adoptionHref}
                onHover={() => trackEvent("cta_click_primary", { surface: "exit-intent-adopt" })}
              >
                Meet the Adoption Pack
              </MagneticButton>
              <button
                type="button"
                className="cta-muted text-xs uppercase tracking-[0.3em] text-white/70"
                onClick={() => {
                  trackEvent("cta_click_primary", { surface: "exit-intent-sponsor" });
                  window.open(donateHref, "_blank");
                }}
              >
                Sponsor Meals
              </button>
              <button
                type="button"
                className="cta-muted text-xs uppercase tracking-[0.3em] text-white/50"
                onClick={onClose}
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Landing({ content }: { content: LandingContent }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [navSolid, setNavSolid] = useState(false);
  const [exitIntentVisible, setExitIntentVisible] = useState(false);
  const [exitIntentDismissed, setExitIntentDismissed] = useState(false);

  const sponsorLabel = content.hero.quickActions.find((action) => action.icon === "sponsor")?.label ?? "Sponsor tonight's meals";

  usePointerShift(prefersReducedMotion);
  useSmoothScroll(prefersReducedMotion);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0 && !exitIntentDismissed) {
        setExitIntentVisible(true);
        trackEvent("exit_intent_shown", {});
      }
    };
    window.addEventListener("mouseout", handleMouseLeave);
    return () => window.removeEventListener("mouseout", handleMouseLeave);
  }, [exitIntentDismissed, prefersReducedMotion]);

  const closeExitModal = () => {
    setExitIntentVisible(false);
    setExitIntentDismissed(true);
  };

  return (
    <main className="relative flex min-h-screen snap-y snap-mandatory flex-col text-white">
      <Navigation content={content} solid={navSolid} />
      <RailIndicators />
      <Hero content={content} prefersReducedMotion={prefersReducedMotion} />
      <USPStrip items={content.usp} />
      <HowItWorks content={content} prefersReducedMotion={prefersReducedMotion} />
      <Stories content={content} prefersReducedMotion={prefersReducedMotion} />
      <AdoptionShowcase content={content.adoption} prefersReducedMotion={prefersReducedMotion} />
      <Bento content={content} />
      <TrustSection content={content.trust} prefersReducedMotion={prefersReducedMotion} />
      <FAQSection content={content} />
      <FinalCTA content={content} />
      <FooterBar content={content.footer} />
      <StickyDonateDock label={sponsorLabel} href={content.hero.donateHref} />
      <ExitIntentModal
        open={exitIntentVisible}
        onClose={closeExitModal}
        donateHref={content.hero.donateHref}
        adoptionHref={content.hero.ctaHref}
        prefersReducedMotion={prefersReducedMotion}
      />
    </main>
  );
}

const EN_CONTENT: LandingContent = {
  hero: {
    eyebrow: "Angels Haven • Adopt ↔ Sponsor",
    headline: "Adopt. Sponsor. Keep rescue dogs safe tonight.",
    subheadline: "Choose a companion ready to fly from Turkey or keep our rescue corridor funded with a micro-sponsor.",
    summary: "Transparent timelines • DEFRA travel compliant • Weekly impact livestreams",
    ctaLabel: "Meet the adoption pack",
    ctaHref: "#adopt",
    donateHref: CTA_PRIMARY,
    donateAmounts: [1, 8, 25, 100],
    defaultSelectionLabel: "Quick sponsor picks",
    stats: {
      label: "Homes matched this month",
      value: 18,
      suffix: "",
    },
    quickActions: [
      {
        id: "adopt-pack",
        label: "Adopt from the pack",
        caption: "Browse dogs cleared for travel",
        href: "#adopt",
        icon: "adopt",
      },
      {
        id: "sponsor-meal",
        label: "Sponsor tonight's meals",
        caption: "£8 covers food & meds",
        href: CTA_PRIMARY,
        icon: "sponsor",
      },
      {
        id: "plan-visit",
        label: "Plan a sanctuary visit",
        caption: "Meet the team or escort a flight",
        href: "mailto:hello@angelshaven.org?subject=Sanctuary%20visit",
        icon: "visit",
      },
    ],
    media: {
      poster: "/images/hero-poster.avif",
      video: "/videos/hero-pack.mp4",
      alt: "Group of rescue dogs looking down toward the camera",
    },
    liveCounter: {
      label: "Families applying this week",
      initial: 64,
      minIncrement: 1,
      maxIncrement: 3,
      intervalMs: 7200,
      suffix: "families",
    },
    socialProof: [
      {
        id: "homecomings",
        metric: "🏡 6 homecomings",
        caption: "in the last 48 hours",
        media: {
          poster: "/images/story-mila.avif",
          video: "/videos/community-loop.mp4",
          alt: "Families greeting new rescue dogs",
        },
      },
      { id: "members", metric: "💙 2,847 monthly", caption: "Sponsors on autopilot" },
      { id: "rating", metric: "⭐ 4.9/5", caption: "Transparency rating" },
    ],
    urgency: {
      remainingLabel: "Dogs cleared to fly",
      remainingValue: "7",
      goalLabel: "Flight fund 73% complete",
      goalPercent: 73,
      footer: "Sponsor final vet checks before Sunday night.",
    },
    recurringHint: "Set a monthly sponsor share so transport never pauses.",
    ticker: {
      headline: "Recent supporters",
      entries: [
        { id: "sarah-lon", name: "Sarah L.", amount: 25, city: "London, UK", minutesAgo: 3, method: "Apple Pay" },
        { id: "umit-izm", name: "Umit K.", amount: 8, city: "Izmir, TR", minutesAgo: 6, method: "Stripe" },
        { id: "amelia-mcr", name: "Amelia R.", amount: 50, city: "Manchester, UK", minutesAgo: 9, method: "PayPal" },
        { id: "cem-ank", name: "Cem A.", amount: 12, city: "Ankara, TR", minutesAgo: 12, method: "Visa" },
        { id: "niamh-edi", name: "Niamh F.", amount: 100, city: "Edinburgh, UK", minutesAgo: 18, method: "Bank Transfer" },
        { id: "melis-ist", name: "Melis D.", amount: 8, city: "Istanbul, TR", minutesAgo: 24, method: "Apple Pay" },
      ],
    },
  },
  usp: [
    "Adopt • Don’t Shop",
    "Ready-to-fly pack",
    "Monthly transparency",
    "1-click sponsor checkout",
  ],
  steps: [
    {
      id: "choose",
      badge: "Step 01",
      title: "Choose your amount",
      copy: "Start at £1 or set a custom gift. The live meter updates instantly as pledges stack.",
      media: {
        poster: "/images/step-choose.avif",
        video: "/videos/step-choose.mp4",
        alt: "Donation amount selector interface",
      },
    },
    {
      id: "pay",
      badge: "Step 02",
      title: "Pay securely in one tap",
      copy: "Apple Pay, Google Pay, Stripe, and PayPal are wired into a single encrypted sheet—no account needed.",
      media: {
        poster: "/images/step-pay.avif",
        video: "/videos/step-pay.mp4",
        alt: "Secure checkout interface",
      },
    },
    {
      id: "impact",
      badge: "Step 03",
      title: "See the impact feed",
      copy: "Follow daily footage, vet receipts, and GPS logs as your £1 moves from street rescue to foster home.",
      media: {
        poster: "/images/step-impact.avif",
        video: "/videos/step-impact.mp4",
        alt: "Impact dashboard",
      },
    },
  ],
  stories: [
    {
      id: "mila",
      title: "Mila • Street to sofa in 14 days",
      copy: "Found trembling in Fethiye. Micro-donations funded food, vaccinations, and a flight to her London foster.",
      stat: "Day 14 • Foster placement confirmed",
      media: {
        before: { poster: "/images/story-before.png", alt: "Mila before rescue" },
        after: { poster: "/images/story-mila.avif", alt: "Mila resting after rescue" },
        clip: { poster: "/images/story-mila.avif", video: "/videos/story-mila.mp4", alt: "Mila video clip" },
      },
      ctaLabel: "Fund more recoveries",
      ctaHref: CTA_PRIMARY,
    },
    {
      id: "duman",
      title: "Duman • Emergency care to trail runs",
      copy: "Hit by traffic near Antalya. The community covered surgery, rehab, and relocation—he now runs Brighton trails.",
      stat: "Day 28 • Cleared for adoption",
      media: {
        before: { poster: "/images/story-before.png", alt: "Duman before treatment" },
        after: { poster: "/images/story-duman.avif", alt: "Duman running happily" },
        clip: { poster: "/images/story-duman.avif", video: "/videos/story-duman.mp4", alt: "Duman video clip" },
      },
      ctaLabel: "Send the next meal",
      ctaHref: CTA_PRIMARY,
    },
  ],
  adoption: {
    eyebrow: "Adopt • Don’t shop",
    headline: "Ready-to-travel dogs waiting for a sofa.",
    intro: "Our field team preps every rescue with behaviour notes, medical clearance, and DEFRA paperwork. Claim your match or keep their care funded until they fly home.",
    cta: {
      adopt: { label: "View adoption dossiers", href: "#adopt" },
      sponsor: { label: "Sponsor the flight fund", href: CTA_PRIMARY },
    },
    pets: [
      {
        id: "nova",
        name: "Nova",
        age: "2 yrs",
        breed: "Anatolian mix",
        temperament: "Gentle",
        story: "Rescued from a beach café in Fethiye. Loves children, walks calmly on lead, and already crate trained.",
        image: "/images/story-mila.avif",
        badge: "Ready to fly • 4 Oct",
        medicalNotes: "Heartworm negative",
        adoptHref: "mailto:adoptions@angelshaven.org?subject=Adopt%20Nova",
        sponsorHref: CTA_PRIMARY,
      },
      {
        id: "argo",
        name: "Argo",
        age: "18 mo",
        breed: "Border collie mix",
        temperament: "Playful",
        story: "Pulled from an industrial estate in Izmir. Thrives with active families and adores agility-style games.",
        image: "/images/story-duman.avif",
        badge: "Escort needed • 12 Oct",
        medicalNotes: "On joint supplements",
        adoptHref: "mailto:adoptions@angelshaven.org?subject=Adopt%20Argo",
        sponsorHref: CTA_PRIMARY,
      },
      {
        id: "lale",
        name: "Lale",
        age: "3 yrs",
        breed: "Golden retriever mix",
        temperament: "Companion",
        story: "Left behind after a market relocation. Velcro personality, already house-trained, perfect for first-time adopters.",
        image: "/images/story-after.png",
        badge: "Foster-to-adopt • London",
        medicalNotes: "Sensitive stomach",
        adoptHref: "mailto:adoptions@angelshaven.org?subject=Adopt%20Lale",
        sponsorHref: CTA_PRIMARY,
      },
    ],
    steps: [
      {
        id: "01",
        title: "Share your home checklist",
        description: "Tell us about your family, other pets, and travel flexibility so we can recommend the right match.",
      },
      {
        id: "02",
        title: "Meet your dog virtually",
        description: "We schedule a video briefing from the sanctuary with behaviour notes, vet reports, and travel timeline.",
      },
      {
        id: "03",
        title: "Flight + aftercare handled",
        description: "We book DEFRA-compliant transport, escort the flight, and support integration for the first 30 days.",
      },
    ],
    fallback: {
      headline: "Not ready to adopt yet?",
      copy: "Sponsor weekly food, medical top-ups, and travel crates so the pack stays safe until their family arrives.",
      donateLabel: "Sponsor meals",
      donateHref: CTA_PRIMARY,
    },
  },
  bento: [
    {
      id: "meals",
      eyebrow: "Meals",
      title: "2 tonnes of food monthly",
      copy: "Logistics partners across Fethiye, Dalyan, and Izmir receive routed deliveries every 14 days.",
      ctaLabel: "View route logs",
      href: CTA_REPORT,
    },
    {
      id: "emergency",
      eyebrow: "Emergency",
      title: "< 6 hr response time",
      copy: "Alerts funnel to an ops lead who unlocks vet care, treatment, and medication in under six hours on average.",
      ctaLabel: "See treatment receipts",
      href: CTA_REPORT,
    },
    {
      id: "sponsor",
      eyebrow: "Sponsor",
      title: "Sponsor a paw",
      copy: "Recurring donors keep transports and foster flights funded—sponsor one dog’s journey each month.",
      ctaLabel: "Sponsor now",
      href: CTA_PRIMARY,
    },
    {
      id: "report",
      eyebrow: "Report",
      title: "Transparency report",
      copy: "Daily ops feed, monthly receipts, and compliance filings keep donors auditing in real time.",
      ctaLabel: "Download report",
      href: CTA_REPORT,
    },
  ],
  faq: [
    {
      question: "Do I really see where £1 goes?",
      answer: "Yes. Each donation unlocks live meal counts, vet receipts, and daily reels inside the impact feed.",
    },
    {
      question: "Is checkout encrypted?",
      answer: "We process via Stripe and PayPal with TLS 1.3, Apple Pay, Google Pay, and Radar fraud protection.",
    },
    {
      question: "Can I pause recurring donations?",
      answer: "Manage recurring gifts instantly inside your receipt—no forms or waiting periods required.",
    },
    {
      question: "How fast does a rescue move?",
      answer: "Emergency cases move from alert to funded treatment in under six hours on average, with timeline updates.",
    },
    {
      question: "Will I receive a tax receipt?",
      answer: "HMRC-compliant receipts hit your inbox instantly and roll up into a monthly statement for easy filing.",
    },
    {
      question: "What happens after I donate?",
      answer: "You join the private community feed, get behind-the-scenes drops, and can opt into flight volunteer missions.",
    },
  ],
  final: {
    eyebrow: "Ready to fund the next rescue?",
    headline: "Make today a little safer for one dog.",
    body: "£1 triggers food, treatment, and transport. Join the donors powering two tonnes of aid every month.",
    ctaLabel: "£1 Feeds a Dog Today",
    secondaryLabel: "Visit the community feed",
    secondaryHref: CTA_COMMUNITY,
    donateHref: CTA_PRIMARY,
  },
  trust: {
    headline: "Proof we’re registered, audited, and on the ground.",
    copy: "Angels Haven operates as a cross-border charity guided by UK governance and Turkish field partners. Every receipt, certificate, and safeguarding check is logged for donors.",
    signals: [
      {
        id: "registration",
        title: "Charity Commission • #1204821",
        detail: "Incorporated 12 Jan 2021 with dual-region mandate (England & Wales).",
        proof: "Verified 2024 via Charity Commission public register.",
      },
      {
        id: "audit",
        title: "Independent audit by Paws & Claws LLP",
        detail: "Annual statements covering UK admin, TR field spend, and emergency reserves.",
        proof: "FY23 review completed 08 Feb 2024—no exceptions raised.",
      },
      {
        id: "safeguard",
        title: "Full safeguarding + DBS clearance",
        detail: "All volunteers, transport partners, and foster homes re-screened every 12 months.",
        proof: "Compliance log accessible inside donor transparency portal.",
      },
    ],
    metrics: [
      { id: "meals", label: "Meals delivered", value: "2,184 / month", caption: "GPS-logged routes across Fethiye, Dalyan, Izmir." },
      { id: "rehomed", label: "Dogs rehomed", value: "182", caption: "UK & EU placements since 2021 launch." },
      { id: "rating", label: "Transparency rating", value: "4.9 / 5", caption: "Average donor review across Trustpilot + Google." },
    ],
    accreditations: [
      { id: "charity-commission", label: "UK Charity Commission", description: "Registered charity", href: "https://register-of-charities.charitycommission.gov.uk" },
      { id: "hcvo", label: "Hackney CVS Member", description: "Community voluntary services", href: "https://hcvs.org.uk" },
      { id: "defra", label: "DEFRA Transport License", description: "Pet travel compliance" },
    ],
    reviews: [
      { id: "review-sarah", quote: "The only rescue that showed me vet bills within minutes of donating. That transparency kept me giving.", name: "Sarah J., London", role: "Monthly donor since 2022" },
      { id: "review-levent", quote: "We escorted two dogs to Heathrow with their team—flawless logistics and welfare standards.", name: "Levent A., Izmir", role: "Volunteer flight guardian" },
      { id: "review-maya", quote: "Our corporate CSR chose Angels Haven because their audits were ready before we even asked.", name: "Maya R., Bristol", role: "CSR Partnerships" },
      { id: "review-hasan", quote: "Emergency cases get covered in hours thanks to the donor community—they saved Duman’s leg.", name: "Hasan T., Antalya", role: "Partner vet" },
    ],
    team: [
      { id: "tulay", name: "Tulay Demir", role: "Founder & Field Ops", bio: "Former airline logistics lead now coordinating rescues and medical triage across Mugla." },
      { id: "aaron", name: "Aaron Blake", role: "UK Programs & Compliance", bio: "Ex-Charity Commission analyst keeping filings, audits, and Gift Aid in check." },
      { id: "seda", name: "Seda Yildiz", role: "Veterinary Partnerships", bio: "Manages 18-clinic network and ensures post-op care meets EU travel standards." },
      { id: "leila", name: "Leila Khan", role: "Donor Experience", bio: "Runs livestreams, WhatsApp updates, and the transparency dashboard." },
    ],
    media: [
      { id: "guardian", outlet: "The Guardian", href: "https://www.theguardian.com/uk", date: "Mar 2024", headline: "Micro-donations funding flights for Turkish rescues" },
      { id: "bbc", outlet: "BBC Radio London", href: "https://www.bbc.co.uk/sounds", date: "Jan 2024", headline: "Angels Haven’s night missions across Istanbul" },
      { id: "wired", outlet: "WIRED Impact", href: "https://www.wired.co.uk", date: "Nov 2023", headline: "How transparency dashboards rebuild donor trust" },
    ],
    contact: [
      { label: "Email", value: "verify@angelshaven.org", href: "mailto:verify@angelshaven.org" },
      { label: "Phone", value: "+44 20 7946 0958", href: "tel:+442079460958" },
      { label: "HQ", value: "18 Market Walk, Islington, London N1 7SR" },
      { label: "TR Ops", value: "Calis Mah. 112. Sokak No:4, Fethiye / Mugla" },
    ],
    proofDocument: {
      label: "Download due diligence pack",
      href: CTA_REPORT,
      description: "Registration certificates, safeguarding policy, transport insurance, and FY23 audit letter.",
    },
  },
  footer: {
    registration: "Charity Commission for England & Wales No. 1204821",
    address: "18 Market Walk, Islington, London N1 7SR • Ops hub: Calis Mah. 112. Sokak No:4, Fethiye / Mugla",
    email: "support@angelshaven.org",
    phone: "+44 20 7946 0958",
    hours: "Phone lines: Mon–Sat 08:00–20:00 GMT",
    socials: [
      { label: "Instagram", href: "https://instagram.com/angelshavenpaws" },
      { label: "YouTube", href: "https://youtube.com/@angelshaven" },
      { label: "TikTok", href: "https://www.tiktok.com/@angelshaven" },
      { label: "LinkedIn", href: "https://linkedin.com/company/angelshaven" },
    ],
    policies: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Impact Report", href: CTA_REPORT },
    ],
    legal: [
      { label: "About", href: "/about" },
      { label: "Transparency", href: "/transparency" },
      { label: "Press", href: "/press" },
    ],
  },
};

export default function Home() {
  return <Landing content={EN_CONTENT} />;
}
