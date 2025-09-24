'use client';

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useSpring } from "framer-motion";

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
  icon: "adopt" | "sponsor" | "visit" | "donate" | "community";
};

type HeroTrustMark = {
  id: string;
  label: string;
  caption: string;
  href?: string;
};

type HeroContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  summary: string;
  highlights: string[];
  facesCaption: string;
  ctaLabel: string;
  ctaHref: string;
  donateHref: string;
  donateAmounts: number[];
  donationStories: { amount: number; label: string }[];
  stats: StatMetric;
  quickActions: HeroQuickAction[];
  trustMarks: HeroTrustMark[];
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

type SanctuaryPillar = {
  id: string;
  title: string;
  copy: string;
};

type SanctuaryStat = {
  id: string;
  value: string;
  label: string;
};

type SanctuaryContent = {
  eyebrow: string;
  headline: string;
  body: string;
  highlight: string;
  image: string;
  quote: { text: string; name: string; role: string };
  pillars: SanctuaryPillar[];
  stats: SanctuaryStat[];
  cta: {
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    note: string;
  };
};

type CertificateItem = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  summary: string;
  href: string;
};

type FounderStoryContent = {
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  credentials: { id: string; label: string; detail: string }[];
  stats: { id: string; value: string; caption: string }[];
  image: string;
  video?: string;
};

type SecurityBadge = {
  id: string;
  label: string;
  description: string;
};

type MediaFeature = {
  id: string;
  label: string;
  outlet: string;
  href: string;
};

type DonorEntry = {
  id: string;
  name: string;
  amount: number;
  city: string;
  recurring: boolean;
  since: string;
};

type GlobalStat = {
  id: string;
  label: string;
  value: string;
  detail: string;
};

type PartnerLogo = {
  id: string;
  name: string;
  href: string;
  description: string;
};

type RescueReel = {
  id: string;
  title: string;
  description: string;
  media: MediaAsset;
};

type EmergencyCampaign = {
  title: string;
  description: string;
  goal: number;
  raised: number;
  currency: string;
  dogsWaiting: number;
  deadline: string;
  deadlineIso: string;
  ctaLabel: string;
  ctaHref: string;
};

type GivingCalculatorStep = {
  amount: number;
  label: string;
  description: string;
};

type ImpactSummary = {
  headline: string;
  totalRaised: number;
  currency: string;
  supporters: number;
  flightsBooked: number;
};

type CommunityHighlight = {
  id: string;
  title: string;
  copy: string;
};

type CommunityStat = {
  id: string;
  value: string;
  label: string;
};

type CommunityContent = {
  eyebrow: string;
  headline: string;
  description: string;
  fb: { members: string; href: string; label: string; proof: string };
  highlights: CommunityHighlight[];
  stats: CommunityStat[];
  cta: { label: string; href: string; secondaryLabel: string; secondaryHref: string };
};

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  media?: MediaAsset;
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
  sanctuary: SanctuaryContent;
  community: CommunityContent;
  testimonials: Testimonial[];
  securityBadges: SecurityBadge[];
  mediaRibbon: MediaFeature[];
  founder: FounderStoryContent;
  certificates: CertificateItem[];
  donorWall: DonorEntry[];
  globalStats: GlobalStat[];
  partners: PartnerLogo[];
  emergency: EmergencyCampaign;
  givingCalculator: {
    defaultAmount: number;
    note: string;
    steps: GivingCalculatorStep[];
  };
  impact24h: ImpactSummary;
  reels: RescueReel[];
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
const CTA_COMMUNITY = "https://www.facebook.com/groups/480707493946285";

const RAIL_SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "how", label: "Flow" },
  { id: "stories", label: "Stories" },
  { id: "sanctuary", label: "Sanctuary" },
  { id: "community", label: "Community" },
  { id: "founder", label: "Founder" },
  { id: "impact", label: "Impact" },
  { id: "certifications", label: "Proof" },
  { id: "partners", label: "Partners" },
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

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) return;

    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = previous;
    };
  }, [disabled]);
}

function useRollingCounter(config: HeroContent["liveCounter"], prefersReducedMotion: boolean) {
  const { initial, intervalMs, minIncrement, maxIncrement } = config;
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = window.setInterval(() => {
      setValue((previous) => previous + Math.floor(Math.random() * (maxIncrement - minIncrement + 1)) + minIncrement);
    }, intervalMs);
    return () => window.clearInterval(interval);
  }, [intervalMs, minIncrement, maxIncrement, prefersReducedMotion]);

  return value;
}

type CountdownState = {
  expired: boolean;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function computeCountdown(deadlineIso: string): CountdownState {
  const target = Date.parse(deadlineIso);
  if (Number.isNaN(target)) {
    return { expired: false, days: "00", hours: "00", minutes: "00", seconds: "00" };
  }
  const diff = target - Date.now();
  if (diff <= 0) {
    return { expired: true, days: "00", hours: "00", minutes: "00", seconds: "00" };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const format = (value: number) => value.toString().padStart(2, "0");
  return {
    expired: false,
    days: format(days),
    hours: format(hours),
    minutes: format(minutes),
    seconds: format(seconds),
  };
}

function useCountdown(deadlineIso: string, prefersReducedMotion: boolean) {
  const [state, setState] = useState(() => computeCountdown(deadlineIso));

  useEffect(() => {
    if (!deadlineIso) return;
    if (prefersReducedMotion) {
      setState(computeCountdown(deadlineIso));
      return;
    }
    const tick = () => setState(computeCountdown(deadlineIso));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [deadlineIso, prefersReducedMotion]);

  return state;
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

function ShareButtons({ message, label = "Share the mission" }: { message: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://angels-haven.vercel.app";
  const payload = `${message} ${shareUrl}`.trim();

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ text: message, url: shareUrl });
        trackEvent("share_native", {});
      } catch (error) {
        console.error("Native share cancelled", error);
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      trackEvent("share_copy", {});
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(payload)}`;

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-[#6b412a]">
      <span className="uppercase tracking-[0.28em] text-[#a3653b]">{label}</span>
      <button
        type="button"
        className="rounded-full border border-[#f1d4b8] bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-[#7a4d31] transition hover:border-[#d98a52] hover:bg-white"
        onClick={handleNativeShare}
      >
        Share now
      </button>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-[#25d366] bg-[#25d366]/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-[#1c8f4a] transition hover:bg-[#25d366]/25"
        onClick={() => trackEvent("share_whatsapp", {})}
      >
        WhatsApp
      </a>
      <button
        type="button"
        className="rounded-full border border-[#f1d4b8] bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-[#7a4d31] transition hover:border-[#d98a52] hover:bg-white"
        onClick={handleCopy}
      >
        {copied ? "Copied!" : "Copy for IG"}
      </button>
    </div>
  );
}

function Navigation({ content, solid }: { content: LandingContent; solid: boolean }) {
  const remaining = Math.max(content.emergency.goal - content.emergency.raised, 0);
  const roundedRemaining = Math.ceil(remaining / 5) * 5;
  const navCtaLabel = remaining > 0 ? `Only £${roundedRemaining.toLocaleString()} to launch` : "Flight funded — keep it open";

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
          <a href="#sanctuary" className="transition hover:text-white">
            Sanctuary
          </a>
          <a href="#founder" className="transition hover:text-white">
            Founder
          </a>
          <a href="#community" className="transition hover:text-white">
            Community
          </a>
          <a href="#impact" className="transition hover:text-white">
            Impact
          </a>
          <a href="#certifications" className="transition hover:text-white">
            Proof
          </a>
          <a href="#partners" className="transition hover:text-white">
            Partners
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
          {navCtaLabel}
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
      <Image
        src={media.poster}
        alt={media.alt}
        fill
        priority
        className={`object-cover object-[center_32%] transition-opacity duration-700 ${shouldPlay ? "opacity-0" : "opacity-100"}`}
      />
      {shouldPlay && media.video && (
        <video
          className="absolute inset-0 h-full w-full object-cover object-[center_32%]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.poster}
        >
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
    const animatedElements = Array.from(container.querySelectorAll("[data-hero-animate]")) as HTMLElement[];

    if (prefersReducedMotion || !window.matchMedia("(min-width: 768px)").matches) {
      animatedElements.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
        element.style.transition = "none";
      });
      return () => {
        animatedElements.forEach((element) => {
          element.style.removeProperty("opacity");
          element.style.removeProperty("transform");
          element.style.removeProperty("transition");
        });
      };
    }

    animatedElements.forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(40px)";
      element.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      element.style.transitionDelay = `${index * 0.1}s`;
      requestAnimationFrame(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      });
    });

    return () => {
      animatedElements.forEach((element) => {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
        element.style.removeProperty("transition");
        element.style.removeProperty("transition-delay");
      });
    };
  }, [prefersReducedMotion]);

  const { hero, securityBadges } = content;
  const heroPets = content.adoption.pets.slice(0, 4);
  const missionCampaign = content.emergency;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-surface relative flex min-h-[100dvh] snap-start items-center justify-center overflow-hidden text-[#2b1a12]"
    >
      <HeroMedia media={hero.media} active={videoActive} prefersReducedMotion={prefersReducedMotion} />
      <div className="section-shell relative z-10 grid gap-12 py-28 text-[#2b1a12] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,420px)]">
        <div className="flex flex-col gap-8">
          <HeroTrustMarks marks={hero.trustMarks} />
          <div data-hero-animate>
            <span className="inline-flex w-fit items-center rounded-full border border-[#f1cfae] bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#9a5b35] shadow-[0_12px_30px_rgba(179,111,68,0.18)]">
              {hero.eyebrow}
            </span>
          </div>
          <div className="space-y-5" data-hero-animate>
            <h1 className="display-hero max-w-3xl text-[#2b1a12]">{hero.headline}</h1>
            <p className="max-w-xl text-lg text-[#523322]">{hero.subheadline}</p>
            <p className="text-xs uppercase tracking-[0.32em] text-[#b97c4d]">{hero.summary}</p>
          </div>
          <HeroHighlights items={hero.highlights} />
          <div className="flex flex-wrap items-center gap-4" data-hero-animate>
            <MagneticButton href={hero.donateHref} onHover={() => trackEvent("cta_click_primary", { surface: "hero-primary" })}>
              {hero.ctaLabel}
            </MagneticButton>
            <a
              href={CTA_REPORT}
              className="cta-muted inline-flex items-center justify-center text-xs uppercase tracking-[0.3em] text-[#744731]"
              onClick={() => trackEvent("cta_click_secondary", { surface: "hero-report" })}
            >
              View transparency pack
            </a>
          </div>
          <HeroMissionBar campaign={missionCampaign} />
          <HeroRescueFaces pets={heroPets} caption={hero.facesCaption} />
          <HeroDonationStories stories={hero.donationStories} />
          <div data-hero-animate>
            <HeroQuickActions actions={hero.quickActions} />
          </div>
        </div>
        <motion.aside
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-5"
        >
          <HeroMissionPanel
            campaign={missionCampaign}
            urgency={hero.urgency}
            liveCounter={hero.liveCounter}
            stats={hero.stats}
            donation={{ amounts: hero.donateAmounts, href: hero.donateHref, label: hero.defaultSelectionLabel }}
            prefersReducedMotion={prefersReducedMotion}
          />
          <RecentDonationsTicker ticker={hero.ticker} prefersReducedMotion={prefersReducedMotion} />
          <SecurityBadgesBar badges={securityBadges} />
        </motion.aside>
      </div>
      <div className="section-shell relative z-10 mt-10">
        <HeroSocialProof items={hero.socialProof} prefersReducedMotion={prefersReducedMotion} />
      </div>
      <ScrollPrompt />
    </section>
  );
}

function HeroTrustMarks({ marks }: { marks: HeroTrustMark[] }) {
  if (!marks?.length) return null;
  return (
    <div
      data-hero-animate
      className="flex flex-wrap items-center gap-3 rounded-full bg-white/80 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.3em] text-[#7d4f32] shadow-[0_12px_30px_rgba(153,101,63,0.15)]"
    >
      <span className="font-semibold text-[#a1623b]">Trusted by</span>
      {marks.map((mark) => {
        const content = (
          <span className="flex items-center gap-1">
            <span>{mark.label}</span>
            <span className="text-[#c07a45]">•</span>
            <span>{mark.caption}</span>
          </span>
        );
        return mark.href ? (
          <a key={mark.id} href={mark.href} className="transition hover:text-[#d1743c]" target="_blank" rel="noreferrer">
            {content}
          </a>
        ) : (
          <span key={mark.id}>{content}</span>
        );
      })}
    </div>
  );
}

function HeroHighlights({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="grid gap-3 text-sm text-[#4c2f1f]" data-hero-animate>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ffdcb5] text-xs font-semibold text-[#8c4f2c]">
            ★
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function HeroRescueFaces({ pets, caption }: { pets: AdoptionPet[]; caption: string }) {
  if (!pets.length || !caption) return null;
  return (
    <div className="flex flex-wrap items-center gap-4" data-hero-animate>
      <div className="flex -space-x-3">
        {pets.slice(0, 4).map((pet) => (
          <div key={pet.id} className="h-12 w-12 overflow-hidden rounded-full border-2 border-white/70 shadow-[0_10px_25px_rgba(153,101,63,0.2)]">
            <Image
              src={pet.image}
              alt={pet.name}
              width={48}
              height={48}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      <p className="max-w-xs text-sm text-[#5a3523]">{caption}</p>
    </div>
  );
}

function HeroMissionPanel({
  campaign,
  urgency,
  liveCounter,
  stats,
  donation,
  prefersReducedMotion,
}: {
  campaign: EmergencyCampaign;
  urgency: HeroContent["urgency"];
  liveCounter: HeroContent["liveCounter"];
  stats: StatMetric;
  donation: { amounts: number[]; href: string; label?: string };
  prefersReducedMotion: boolean;
}) {
  const countdown = useCountdown(campaign.deadlineIso, prefersReducedMotion);
  const families = useRollingCounter(liveCounter, prefersReducedMotion);
  const percent = campaign.goal > 0 ? Math.min(100, Math.round((campaign.raised / campaign.goal) * 100)) : 0;
  const raisedLabel = `${campaign.currency}${campaign.raised.toLocaleString()}`;
  const goalLabel = `${campaign.currency}${campaign.goal.toLocaleString()}`;
  const countdownUnits = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Mins", value: countdown.minutes },
    { label: "Secs", value: countdown.seconds },
  ];
  const shareMessage = `I just backed Angels Haven to fly ${campaign.dogsWaiting} rescue dogs home tonight.`;

  return (
    <div className="glass-card flex flex-col gap-5 rounded-[2.4rem] border border-[#f1d4b8] bg-white/85 p-6 text-[#2b1a12] shadow-[0_24px_60px_rgba(153,101,63,0.18)]">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#9a5b35]">
        <span>Mission control</span>
        <span>{countdown.expired ? "Awaiting next launch" : `T-${countdown.hours}h ${countdown.minutes}m`}</span>
      </div>
      <h3 className="text-lg font-semibold text-[#2b1a12]">{campaign.title}</h3>
      <p className="text-sm text-[#5a3523]">{campaign.description}</p>
      <div className="grid grid-cols-4 gap-2 text-center text-[#2b1a12]">
        {countdownUnits.map((unit) => (
          <div key={unit.label} className="rounded-2xl border border-[#f1d4b8] bg-white/70 px-3 py-2">
            <span className="text-xl font-semibold">{unit.value}</span>
            <span className="block text-[0.6rem] uppercase tracking-[0.28em] text-[#9a5b35]">{unit.label}</span>
          </div>
        ))}
      </div>
      <div className="grid gap-3 text-sm text-[#2f1d15] sm:grid-cols-2">
        <div className="rounded-2xl border border-[#f1d4b8] bg-white/75 px-4 py-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9a5b35]">Raised</span>
          <span className="mt-1 block text-lg font-semibold text-[#2b1a12]">{raisedLabel}</span>
        </div>
        <div className="rounded-2xl border border-[#f1d4b8] bg-white/75 px-4 py-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9a5b35]">Goal</span>
          <span className="mt-1 block text-lg font-semibold text-[#2b1a12]">{goalLabel}</span>
        </div>
        <div className="rounded-2xl border border-[#f1d4b8] bg-white/75 px-4 py-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9a5b35]">Dogs waiting</span>
          <span className="mt-1 block text-lg font-semibold text-[#2b1a12]">{campaign.dogsWaiting}</span>
        </div>
        <div className="rounded-2xl border border-[#f1d4b8] bg-white/75 px-4 py-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9a5b35]">Families this week</span>
          <span className="mt-1 block text-lg font-semibold text-[#2b1a12]">{families.toLocaleString()} {liveCounter.suffix}</span>
        </div>
        <div className="rounded-2xl border border-[#f1d4b8] bg-white/75 px-4 py-3 sm:col-span-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9a5b35]">{stats.label}</span>
          <span className="mt-1 block text-lg font-semibold text-[#2b1a12]">
            <AnimatedCounter value={stats.value} suffix={stats.suffix} />
          </span>
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#ffe6cd]">
        <div className="h-full rounded-full bg-[#f25f5c]" style={{ width: `${percent}%` }} />
      </div>
      <span className="text-xs text-[#845534]">{urgency.footer}</span>
      <DonationAmounts amounts={donation.amounts} href={donation.href} label={donation.label} />
      <a
        href={campaign.ctaHref}
        className="inline-flex items-center justify-center rounded-full border border-[#f1d4b8] bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#7a4d31] transition hover:bg-white"
        onClick={() => trackEvent("cta_click_primary", { surface: "hero-mission" })}
      >
        {campaign.ctaLabel}
      </a>
      <ShareButtons message={shareMessage} label="Spread the mission" />
    </div>
  );
}

function HeroMissionBar({ campaign }: { campaign: EmergencyCampaign }) {
  const remaining = Math.max(campaign.goal - campaign.raised, 0);
  const percent = campaign.goal > 0 ? Math.min(100, Math.round((campaign.raised / campaign.goal) * 100)) : 0;
  return (
    <div data-hero-animate className="glass-card flex flex-wrap items-center gap-4 rounded-[2rem] border border-[#f1d4b8] bg-white/80 px-5 py-4 text-sm text-[#2b1a12] shadow-[0_18px_42px_rgba(153,101,63,0.12)]">
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.3em] text-[#a3653b]">Tonight&apos;s flight meter</span>
        <strong className="text-lg font-semibold text-[#2b1a12]">
          {remaining > 0 ? `${campaign.currency}${remaining.toLocaleString()} remaining` : "Charter fully funded"}
        </strong>
      </div>
      <div className="flex w-full items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#ffe0c5]">
          <div className="h-full rounded-full bg-[#f25f5c]" style={{ width: `${percent}%` }} />
        </div>
        <span className="text-xs font-semibold text-[#a3653b]">{percent}%</span>
      </div>
    </div>
  );
}

function HeroQuickActions({ actions }: { actions: HeroQuickAction[] }) {
  if (!actions.length) return null;
  return (
    <div className="flex flex-col gap-3 text-sm">
      <span className="text-xs uppercase tracking-[0.28em] text-[#9a5b35]">Quick ways to help</span>
      <div className="flex flex-col gap-3">
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            className="group flex items-start gap-3 rounded-[1.8rem] border border-[#f1d4b8] bg-white/75 px-4 py-3 text-[#2b1a12] shadow-[0_12px_30px_rgba(153,101,63,0.12)] transition hover:border-[#d98a52] hover:bg-white"
            onClick={() => trackEvent("hero_quick_action", { id: action.id })}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffd7b0] text-[#854b2a]">
              <QuickActionIcon icon={action.icon} />
            </span>
            <span className="flex flex-1 flex-col">
              <span className="text-sm font-semibold text-[#2b1a12]">{action.label}</span>
              <span className="text-[0.75rem] text-[#6b412a]">{action.caption}</span>
            </span>
            <span className="mt-1 text-xs uppercase tracking-[0.24em] text-[#9a5b35]">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function HeroDonationStories({ stories }: { stories: { amount: number; label: string }[] }) {
  if (!stories.length) return null;
  return (
    <div className="flex flex-wrap gap-3" data-hero-animate>
      {stories.map((story) => (
        <span
          key={story.amount}
          className="inline-flex items-center gap-2 rounded-full border border-[#f1d4b8] bg-white/85 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#7a4d31] shadow-[0_12px_30px_rgba(153,101,63,0.12)]"
        >
          <span className="rounded-full bg-[#ffdcb5] px-2 py-1 text-[#8c4f2c]">£{story.amount}</span>
          <span className="text-[0.7rem] normal-case tracking-normal">{story.label}</span>
        </span>
      ))}
    </div>
  );
}

function SecurityBadgesBar({ badges }: { badges: SecurityBadge[] }) {
  if (!badges.length) return null;
  return (
    <div className="grid gap-3 rounded-[1.9rem] border border-[#f1d4b8] bg-white/75 px-5 py-4 text-[#5b3724] shadow-[0_18px_45px_rgba(153,101,63,0.16)] sm:grid-cols-2" aria-label="Payment and security assurances">
      {badges.map((badge) => (
        <div key={badge.id} className="flex items-start gap-3 text-xs uppercase tracking-[0.28em]">
          <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#f1d4b8] bg-[#ffd7b0]/80 text-[0.7rem] font-semibold text-[#8c4f2c]">
            ✓
          </span>
          <div className="flex flex-col gap-1 text-left">
            <span className="text-[#2b1a12]">{badge.label}</span>
            <span className="text-[0.65rem] normal-case tracking-normal text-[#6b412a]">{badge.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MediaRibbon({ items }: { items: MediaFeature[] }) {
  if (!items.length) return null;
  return (
    <section className="snap-none border-y border-[#f1d4b8] bg-[#fff3e6] py-5 text-[#7a4d31]">
      <div className="section-shell flex flex-wrap items-center justify-center gap-6 text-[0.75rem] uppercase tracking-[0.28em]">
        <span className="text-[#b16c3d]">As seen in</span>
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="flex items-center gap-2 rounded-full border border-[#f1d4b8] bg-white/70 px-4 py-2 text-[#2b1a12] shadow-[0_12px_30px_rgba(153,101,63,0.12)] transition hover:border-[#d98a52] hover:bg-white"
            target="_blank"
            rel="noreferrer"
          >
            <span className="font-semibold text-[#2b1a12]">{item.outlet}</span>
            <span className="hidden text-[0.65rem] normal-case tracking-normal text-[#7a4d31] sm:inline">{item.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function GlobalStatsBand({ stats }: { stats: GlobalStat[] }) {
  if (!stats.length) return null;
  return (
    <section className="snap-none bg-[#ffeede] py-10 text-[#2b1a12]" aria-label="Live rescue statistics">
      <div className="section-shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="glass-card flex flex-col gap-2 rounded-[1.9rem] border border-[#f1d4b8] bg-white/80 p-5 text-[#2b1a12] shadow-[0_24px_60px_rgba(153,101,63,0.15)]"
          >
            <span className="text-3xl font-semibold text-[#2b1a12]">{stat.value}</span>
            <span className="text-xs uppercase tracking-[0.3em] text-[#a3653b]">{stat.label}</span>
            <p className="text-sm text-[#5a3523]">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EmergencyFundMeter({ campaign }: { campaign: EmergencyCampaign }) {
  const percent = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
  return (
    <section className="snap-none bg-[#fff5eb] py-20 text-[#2b1a12]" aria-live="polite">
      <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,360px)] lg:items-center">
        <div className="space-y-5">
          <span className="inline-flex w-fit items-center rounded-full border border-[#f1d4b8] bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#9a5b35] shadow-[0_12px_30px_rgba(153,101,63,0.15)]">
            Emergency flight fund
          </span>
          <h2 className="heading-xl text-[#2b1a12]">{campaign.title}</h2>
          <p className="max-w-2xl text-sm text-[#5a3523]">{campaign.description}</p>
          <div className="glass-card flex flex-col gap-4 rounded-[2rem] border border-[#f1d4b8] bg-white/85 px-6 py-5 text-[#2b1a12] shadow-[0_24px_60px_rgba(153,101,63,0.18)]">
            <div className="flex flex-wrap items-baseline gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-[#a3653b]">Raised</span>
                <p className="text-3xl font-semibold text-[#2b1a12]">
                  {campaign.currency}{campaign.raised.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-[#a3653b]">Goal</span>
                <p className="text-lg text-[#4c2f1f]">
                  {campaign.currency}{campaign.goal.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-[#a3653b]">Dogs waiting</span>
                <p className="text-lg text-[#4c2f1f]">{campaign.dogsWaiting}</p>
              </div>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-[#ffe0c5]">
              <div className="h-full rounded-full bg-[#f25f5c]" style={{ width: `${percent}%` }} />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#a3653b]">Target take-off {campaign.deadline}</p>
            <MagneticButton href={campaign.ctaHref} onHover={() => trackEvent("cta_click_primary", { surface: "emergency" })}>
              {campaign.ctaLabel}
            </MagneticButton>
          </div>
        </div>
        <div className="glass-card space-y-4 rounded-[2.1rem] border border-[#f1d4b8] bg-white/85 p-6 text-sm text-[#4c2f1f] shadow-[0_24px_60px_rgba(153,101,63,0.18)]">
          <h3 className="text-base font-semibold text-[#2b1a12]">Tonight&apos;s flight manifest</h3>
          <p>7 dogs cleared to fly. Each £120 block funds DEFRA crates, vet sign-off, and volunteer escort costs.</p>
          <p>Livestream updates drop at 21:00 TRT inside the Facebook group once the meter hits 100%.</p>
        </div>
      </div>
    </section>
  );
}

function GivingCalculator({ config }: { config: LandingContent["givingCalculator"] }) {
  const amountOptions = config.steps.map((step) => step.amount).sort((a, b) => a - b);
  const minAmount = amountOptions[0] ?? 0;
  const maxAmount = amountOptions[amountOptions.length - 1] ?? 0;
  const [amount, setAmount] = useState(config.defaultAmount);
  const activeStep = config.steps.find((step) => step.amount === amount) ?? config.steps[0];

  const setNearestAmount = (value: number) => {
    if (!amountOptions.length) return;
    const nearest = amountOptions.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev));
    setAmount(nearest);
  };

  return (
    <section className="snap-none bg-[#101b16] py-20 text-white">
      <div className="section-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
        <div className="space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-white/55">Monthly giving calculator</span>
          <h3 className="heading-lg">See what your monthly support unlocks.</h3>
          <p className="text-sm text-white/70">Move the slider to pick a monthly pledge and we’ll show the care it powers.</p>
          <input
            type="range"
            min={minAmount}
            max={maxAmount}
            step={1}
            value={amount}
            onChange={(event) => setNearestAmount(Number(event.target.value))}
            className="w-full accent-white"
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {config.steps.map((step) => (
              <button
                key={step.amount}
                type="button"
                className={`rounded-full border px-4 py-2 text-sm uppercase tracking-[0.28em] transition ${
                  step.amount === amount ? "border-white bg-white text-[#0b1411]" : "border-white/20 text-white/70"
                }`}
                onClick={() => setAmount(step.amount)}
              >
                £{step.amount}
              </button>
            ))}
          </div>
        </div>
        <div className="glass-card flex flex-col gap-4 rounded-[2rem] border border-white/12 bg-white/8 p-6 text-white/80">
          <h4 className="text-sm uppercase tracking-[0.3em] text-white/60">£{amount}/month impact</h4>
          <p className="text-lg font-semibold text-white">{activeStep.label}</p>
          <p className="text-sm text-white/70">{activeStep.description}</p>
          <p className="text-xs uppercase tracking-[0.28em] text-white/50">{config.note}</p>
        </div>
      </div>
    </section>
  );
}

function ImpactPulse({ summary }: { summary: ImpactSummary }) {
  return (
    <section className="snap-none border-y border-[#f1d4b8] bg-[#fff0e0] py-6 text-[#2b1a12]">
      <div className="section-shell flex flex-wrap items-center justify-between gap-4 text-sm text-[#4c2f1f]">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-3 w-3 animate-pulse rounded-full bg-[#f25f5c]" aria-hidden />
          <span className="uppercase tracking-[0.32em] text-[#a3653b]">{summary.headline}</span>
        </div>
        <div className="flex flex-wrap gap-6">
          <span className="flex items-center gap-2">
            <strong className="text-[#2b1a12]">{summary.currency}{summary.totalRaised.toLocaleString()}</strong>
          <span className="uppercase tracking-[0.24em] text-[#a3653b]">raised last 24h</span>
          </span>
          <span className="flex items-center gap-2">
            <strong className="text-[#2b1a12]">{summary.supporters}</strong>
            <span className="uppercase tracking-[0.24em] text-[#a3653b]">supporters</span>
          </span>
          <span className="flex items-center gap-2">
            <strong className="text-[#2b1a12]">{summary.flightsBooked}</strong>
            <span className="uppercase tracking-[0.24em] text-[#a3653b]">flights booked</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function FounderSpotlight({ content }: { content: FounderStoryContent }) {
  if (!content) return null;
  return (
    <section id="founder" className="snap-start relative overflow-hidden bg-[#101a15] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-48 right-[-220px] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,206,176,0.38),transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-40 left-[-200px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(36,148,116,0.32),transparent_68%)] blur-3xl" />
      </div>
      <div className="section-shell relative z-10 grid gap-12 py-28 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            {content.eyebrow}
          </span>
          <h2 className="heading-xl">{content.headline}</h2>
          <div className="space-y-4 text-base text-white/75">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {content.credentials.map((item) => (
              <div key={item.id} className="glass-card flex h-full flex-col gap-2 rounded-[1.8rem] border border-white/12 bg-white/10 p-4 text-sm text-white/75">
                <span className="text-xs uppercase tracking-[0.32em] text-white/60">{item.label}</span>
                <p className="text-[0.95rem] text-white">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            {content.stats.map((stat) => (
              <div key={stat.id} className="flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-white">{stat.value}</span>
                <span className="max-w-[200px] text-xs uppercase tracking-[0.28em] text-white/55">{stat.caption}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <div className="overflow-hidden rounded-[2.4rem] border border-white/15 bg-white/10">
            <Image src={content.image} alt={content.headline} width={560} height={640} className="h-full w-full object-cover" />
          </div>
          {content.video ? (
            <video
              controls
              preload="metadata"
              poster={content.image}
              className="h-full w-full overflow-hidden rounded-[2rem] border border-white/12 bg-white/10"
            >
              <source src={content.video} type="video/mp4" />
            </video>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CertificationGallery({ items }: { items: CertificateItem[] }) {
  if (!items.length) return null;
  return (
    <section id="certifications" className="snap-start bg-[#0f1813] py-28 text-white">
      <div className="section-shell space-y-10">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/65">Compliance & governance</span>
          <h2 className="heading-xl">Verified documentation you can download anytime.</h2>
          <p className="max-w-3xl text-sm text-white/70">
            Every certificate links directly to the issuing authority or downloadable PDF so major donors and partners can audit in minutes.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((certificate) => (
            <a
              key={certificate.id}
              href={certificate.href}
              className="group flex h-full flex-col justify-between gap-4 rounded-[2.2rem] border border-white/12 bg-white/8 p-6 text-white/80 transition hover:border-white/35 hover:bg-white/12"
              target="_blank"
              rel="noreferrer"
            >
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-white/55">{certificate.issuer}</span>
                <h3 className="heading-sm text-white">{certificate.title}</h3>
                <p className="text-sm text-white/70">{certificate.summary}</p>
              </div>
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/55">
                <span>{certificate.year}</span>
                <span className="inline-flex items-center gap-1 text-white/70">
                  View
                  <span aria-hidden>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersShowcase({ partners }: { partners: PartnerLogo[] }) {
  if (!partners.length) return null;
  return (
    <section id="partners" className="snap-none bg-[#0c140f] py-20 text-white">
      <div className="section-shell space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-white/55">Trusted partners</span>
          <h3 className="heading-lg">Grounded by regulators, vets, and logistics pros.</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.href}
              className="group flex h-full flex-col gap-2 rounded-[1.9rem] border border-white/12 bg-white/6 p-4 text-sm text-white/75 transition hover:border-white/35 hover:bg-white/12 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-base font-semibold text-white">{partner.name}</span>
              <span className="text-[0.75rem] text-white/60">{partner.description}</span>
              <span className="mt-auto text-[0.65rem] uppercase tracking-[0.3em] text-white/45">View →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
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
              isActive
                ? "bg-[#f25f5c] text-white shadow-[0_12px_30px_rgba(242,95,92,0.35)]"
                : "border border-[#f1d4b8] text-[#6b412a] hover:border-[#d98a52] hover:bg-white"
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
        <div className="mt-2 flex w-full items-center gap-2 text-xs text-[#8f5936]">
          <span className="text-base text-[#f25f5c]">★</span>
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}

function HeroSocialProof({ items, prefersReducedMotion }: { items: HeroContent["socialProof"]; prefersReducedMotion: boolean }) {
  if (!items.length) return null;
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="glass-card flex flex-col gap-3 rounded-[1.6rem] border border-[#f1d4b8] bg-white/80 px-4 py-4 text-[#2b1a12]">
          {item.media ? (
            <div className="relative h-32 overflow-hidden rounded-[1.2rem] border border-[#f1d4b8]">
              <Image src={item.media.poster} alt={item.media.alt} fill className={`object-cover transition-opacity duration-500 ${item.media.video && !prefersReducedMotion ? "opacity-0" : "opacity-100"}`} />
              {item.media.video && !prefersReducedMotion && (
                <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster={item.media.poster}>
                  <source src={item.media.video} type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e120b]/45 via-transparent to-transparent" />
            </div>
          ) : null}
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-[#2b1a12]">{item.metric}</span>
            <span className="text-xs uppercase tracking-[0.28em] text-[#8f5936]">{item.caption}</span>
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
    <div className="glass-card flex flex-col gap-3 rounded-[2rem] border border-[#f1d4b8] bg-white/80 px-5 py-4 text-[#2b1a12]" aria-live="polite">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-[#9a5b35]">
        <span>{ticker.headline}</span>
        <span className="inline-flex items-center gap-1 text-[0.65rem]">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[#f25f5c]" aria-hidden="true" />
          Live
        </span>
      </div>
      <ul className="flex flex-col gap-3 text-sm text-[#2f1d15]">
        {entries.slice(0, 4).map((entry) => (
          <li key={entry.id} className="flex items-center justify-between gap-3 rounded-2xl border border-[#f1d4b8] bg-white/85 px-3 py-2">
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-[#2b1a12]">{entry.name}</span>
              <span className="text-xs uppercase tracking-[0.24em] text-[#8f5936]">{entry.city} • {entry.method}</span>
            </div>
            <div className="flex flex-col items-end leading-tight">
              <span className="text-base font-semibold text-[#2b1a12]">£{entry.amount}</span>
              <span className="text-xs text-[#8f5936]">{entry.minutesAgo}m ago</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


function TrustSection({ content, prefersReducedMotion }: { content: TrustContent; prefersReducedMotion: boolean }) {
  return (
    <section id="trust" className="snap-none relative overflow-hidden bg-[#f2eee8] py-28 text-[#101815]">
      <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden>
        <div className="absolute -left-16 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,199,164,0.45),transparent_65%)] blur-3xl" />
        <div className="absolute -right-24 bottom-[-140px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,170,151,0.32),transparent_68%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_95%,rgba(198,235,221,0.28),transparent_70%)]" />
      </div>
      <div className="section-shell relative z-10 space-y-16">
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

function USPStrip({ items }: { items: string[] }) {
  return (
    <section className="snap-none border-y border-[#f1d4b8] bg-[#fff3e6] py-6 text-[0.7rem] uppercase tracking-[0.35em] text-[#7a4d31] backdrop-blur">
      <div className="section-shell flex flex-wrap items-center justify-between gap-6">
        {items.map((item) => (
          <span key={item} className="flex items-center gap-3">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#f25f5c]/70" />
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
      <Image
        src={media.poster}
        alt={media.alt}
        width={720}
        height={405}
        loading="lazy"
        className={`h-full w-full object-cover transition-opacity duration-500 ${shouldPlay && !prefersReducedMotion && media.video ? "opacity-0" : "opacity-100"}`}
      />
      {!prefersReducedMotion && media.video && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${shouldPlay ? "opacity-100" : "opacity-0"}`}
          muted
          loop
          playsInline
          preload="metadata"
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

function SanctuarySpotlight({
  content,
  prefersReducedMotion,
}: {
  content: LandingContent["sanctuary"];
  prefersReducedMotion: boolean;
}) {
  return (
    <section
      id="sanctuary"
      className="snap-start relative overflow-hidden bg-[#122017] text-white"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-32 left-[-160px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,196,159,0.42),transparent_68%)] blur-3xl" />
        <div className="absolute -bottom-48 right-[-200px] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgba(39,150,117,0.35),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_88%,rgba(255,178,141,0.22),transparent_72%)] opacity-80" />
      </div>
      <div className="section-shell relative z-10 grid gap-12 py-28 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="space-y-7">
          <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            {content.eyebrow}
          </span>
          <h2 className="heading-xl text-white">{content.headline}</h2>
          <p className="max-w-2xl text-base text-white/75">{content.body}</p>
          <p className="text-sm uppercase tracking-[0.32em] text-white/50">{content.highlight}</p>
          <div className="grid gap-4 pt-2 md:grid-cols-2">
            {content.pillars.map((pillar, index) => (
              <motion.article
                key={pillar.id}
                className="glass-card flex h-full flex-col gap-3 rounded-[2rem] border border-white/12 bg-white/10 p-5 text-white"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: prefersReducedMotion ? 0 : index * 0.06 }}
              >
                <span className="text-xs uppercase tracking-[0.28em] text-white/60">{pillar.title}</span>
                <p className="text-sm text-white/70">{pillar.copy}</p>
              </motion.article>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <MagneticButton
              href={content.cta.primaryHref}
              onHover={() => trackEvent("cta_click_primary", { surface: "sanctuary-primary" })}
            >
              {content.cta.primaryLabel}
            </MagneticButton>
            <button
              type="button"
              className="cta-muted inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-white/80"
              onClick={() => {
                trackEvent("cta_click_primary", { surface: "sanctuary-secondary" });
                window.open(content.cta.secondaryHref, "_blank");
              }}
            >
              {content.cta.secondaryLabel}
            </button>
            <span className="text-xs uppercase tracking-[0.28em] text-white/45">{content.cta.note}</span>
          </div>
          <div className="flex flex-wrap gap-6 pt-5 text-sm text-white/70">
            {content.stats.map((stat) => (
              <div key={stat.id} className="flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-white">{stat.value}</span>
                <span className="max-w-[160px] text-xs uppercase tracking-[0.28em] text-white/55">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2.8rem] border border-white/15 bg-white/10 p-6 text-white/80 backdrop-blur">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/10">
            <Image
              src={content.image}
              alt={`${content.quote.name} walking rescue dogs at the sanctuary`}
              width={520}
              height={640}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          </div>
          <blockquote className="mt-6 space-y-3 text-sm text-white/75">
            <p>“{content.quote.text}”</p>
            <footer className="text-xs uppercase tracking-[0.3em] text-white/55">
              {content.quote.name} • {content.quote.role}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function CommunitySection({
  content,
  testimonials,
  donorWall,
  prefersReducedMotion,
}: {
  content: LandingContent["community"];
  testimonials: LandingContent["testimonials"];
  donorWall: DonorEntry[];
  prefersReducedMotion: boolean;
}) {
  return (
    <section id="community" className="snap-start relative overflow-hidden bg-[#0d1914] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-40 right-[-200px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(42,160,128,0.32),transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-56 left-[-220px] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,188,146,0.32),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_88%,rgba(233,209,186,0.18),transparent_72%)] opacity-80" />
      </div>
      <div className="section-shell relative z-10 space-y-16 py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,360px)] lg:items-start">
          <div className="space-y-7">
            <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              {content.eyebrow}
            </span>
            <h2 className="heading-xl text-white">{content.headline}</h2>
            <p className="max-w-3xl text-base text-white/75">{content.description}</p>
            <a
              href={content.fb.href}
              className="glass-card inline-flex items-center gap-3 rounded-[2rem] border border-white/15 bg-white/10 px-5 py-4 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
              onClick={() => trackEvent("community_click_fb", { surface: "community-card" })}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white text-xs font-semibold uppercase tracking-[0.24em]">
                FB
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-white">{content.fb.label}</span>
                <span className="text-xs uppercase tracking-[0.3em] text-white/60">{content.fb.members}</span>
              </span>
              <span className="ml-auto text-xs uppercase tracking-[0.24em] text-white/45">→</span>
            </a>
          </div>
          <div className="glass-card flex flex-col gap-4 rounded-[2.6rem] border border-white/15 bg-white/10 p-6 text-white/80">
            <div className="space-y-2">
              <h3 className="heading-sm text-white">{content.fb.label}</h3>
              <p className="text-sm text-white/70">{content.fb.proof}</p>
            </div>
            <MagneticButton
              href={content.cta.href}
              onHover={() => trackEvent("cta_click_primary", { surface: "community-primary" })}
            >
              {content.cta.label}
            </MagneticButton>
            <button
              type="button"
              className="cta-muted inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-white/80"
              onClick={() => {
                trackEvent("cta_click_primary", { surface: "community-secondary" });
                window.open(content.cta.secondaryHref, "_blank");
              }}
            >
              {content.cta.secondaryLabel}
            </button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {content.highlights.map((item, index) => (
            <motion.article
              key={item.id}
              className="glass-card flex h-full flex-col gap-3 rounded-[2.1rem] border border-white/12 bg-white/8 p-6 text-white"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: prefersReducedMotion ? 0 : index * 0.05 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">{item.title}</span>
              <p className="text-sm text-white/75">{item.copy}</p>
            </motion.article>
          ))}
        </div>
        <div className="flex flex-wrap gap-12 text-sm text-white/70">
          {content.stats.map((stat) => (
            <div key={stat.id} className="flex items-baseline gap-3">
              <span className="text-4xl font-semibold text-white">{stat.value}</span>
              <span className="max-w-[220px] text-xs uppercase tracking-[0.3em] text-white/55">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="space-y-10">
          <div className="flex items-center justify-between gap-6">
            <h3 className="heading-md text-white">Community voices</h3>
            <span className="text-xs uppercase tracking-[0.28em] text-white/55">
              Verified donor & adopter testimonials
            </span>
          </div>
          <DonorWall entries={donorWall} />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.blockquote
                key={testimonial.id}
                className="glass-card flex h-full flex-col justify-between rounded-[2.2rem] border border-white/12 bg-white/8 p-6 text-white/80"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: prefersReducedMotion ? 0 : index * 0.05 }}
              >
                <div className="flex items-center gap-2 text-[#ffb88c]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className={`text-base ${starIndex < testimonial.rating ? "opacity-100" : "opacity-30"}`}
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-xs uppercase tracking-[0.28em] text-white/60">{testimonial.rating.toFixed(1)}/5</span>
                </div>
                {testimonial.media ? (
                  <div className="mt-4">
                    <SmartVideo
                      media={testimonial.media}
                      prefersReducedMotion={prefersReducedMotion}
                      onPlay={() => trackEvent("testimonial_video_play", { id: testimonial.id })}
                    />
                  </div>
                ) : null}
                <p className="mt-4 text-sm text-white/80">“{testimonial.quote}”</p>
                <footer className="mt-6 text-xs uppercase tracking-[0.3em] text-white/55">
                  {testimonial.name} • {testimonial.role}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DonorWall({ entries }: { entries: DonorEntry[] }) {
  if (!entries.length) return null;
  return (
    <div className="grid gap-3 rounded-[2.2rem] border border-white/12 bg-white/6 p-6 text-white/80">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/55">
        <span>Major donor wall</span>
        <span className="text-white/45">Thank you for keeping flights funded</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between gap-3 rounded-[1.6rem] border border-white/10 bg-white/8 px-4 py-3">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">{entry.name}</span>
              <span className="text-xs uppercase tracking-[0.26em] text-white/55">
                {entry.city} • {entry.recurring ? "Recurring" : "One-off"}
              </span>
            </div>
            <div className="text-right">
              <span className="text-base font-semibold text-white">£{entry.amount}</span>
              <p className="text-[0.65rem] text-white/55">Since {entry.since}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RescueReels({ reels, prefersReducedMotion }: { reels: RescueReel[]; prefersReducedMotion: boolean }) {
  if (!reels.length) return null;
  return (
    <section id="reels" className="snap-start bg-[#fff7f0] py-24 text-[#2b1a12]">
      <div className="section-shell space-y-10">
        <div className="space-y-3 text-center md:text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#a3653b]">Rescue reel series</span>
          <h2 className="heading-xl text-[#2b1a12]">Watch recoveries from sanctuary morning to sofa night.</h2>
          <p className="mx-auto max-w-3xl text-sm text-[#5a3523] md:mx-0">
            These daily clips come straight from the sanctuary team and new adopters so you can audit every joyful milestone.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reels.map((reel, index) => (
            <motion.article
              key={reel.id}
              className="glass-card flex h-full flex-col gap-4 rounded-[2.1rem] border border-[#f1d4b8] bg-white/85 p-6 text-[#2b1a12] shadow-[0_24px_60px_rgba(153,101,63,0.15)]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: prefersReducedMotion ? 0 : index * 0.08 }}
            >
              <SmartVideo media={reel.media} prefersReducedMotion={prefersReducedMotion} onPlay={() => trackEvent("rescue_reel_play", { id: reel.id })} />
              <div className="space-y-2">
                <h3 className="heading-sm text-[#2b1a12]">{reel.title}</h3>
                <p className="text-sm text-[#5a3523]">{reel.description}</p>
              </div>
              <MagneticButton
                href={CTA_PRIMARY}
                className="self-start px-6 text-xs uppercase tracking-[0.3em]"
                onHover={() => trackEvent("rescue_reel_cta", { id: reel.id })}
              >
                Fund the next rescue
              </MagneticButton>
            </motion.article>
          ))}
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
    <section id="faq" className="snap-none relative overflow-hidden bg-[#f6f4f0] py-28 text-[#101815]">
      <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden>
        <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,198,170,0.4),transparent_65%)] blur-3xl" />
        <div className="absolute left-[-160px] bottom-[-140px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(209,232,221,0.42),transparent_68%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,210,190,0.18),transparent_70%)]" />
      </div>
      <div className="section-shell relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
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
          className="fixed bottom-6 left-1/2 z-[95] w-full max-w-[min(640px,calc(100%-2.5rem))] -translate-x-1/2 overflow-hidden rounded-[2.2rem] border border-white/10 bg-[rgba(11,15,13,0.94)] shadow-[0_30px_80px_rgba(6,10,9,0.65)] backdrop-blur lg:hidden"
        >
          <div className="flex flex-col gap-4 px-6 py-5 text-white">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.3em] text-white/55">Keep the corridor open</span>
                <span className="text-lg font-semibold">{label}</span>
              </div>
              <MagneticButton
                href={href}
                className="px-6 py-3 text-xs uppercase tracking-[0.32em]"
                onHover={() => trackEvent("cta_click_primary", { surface: "mobile-dock" })}
              >
                Donate now
              </MagneticButton>
            </div>
            <p className="text-xs text-white/60">Tap to give in under 20 seconds — Apple Pay, Google Pay, and PayPal supported.</p>
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
    case "community":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 21c-4.4-3-7.5-5.9-7.5-9.4a4.5 4.5 0 0 1 7.5-3.4 4.5 4.5 0 0 1 7.5 3.4c0 3.5-3.1 6.4-7.5 9.4Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 11a3 3 0 0 0 6 0" strokeLinecap="round" />
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
  shareMessage,
}: {
  open: boolean;
  onClose: () => void;
  donateHref: string;
  adoptionHref: string;
  prefersReducedMotion: boolean;
  shareMessage: string;
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
            <div className="mt-6">
              <ShareButtons message={shareMessage} label="Share with your circle" />
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
  const campaignRemaining = Math.max(content.emergency.goal - content.emergency.raised, 0);
  const exitShareMessage = campaignRemaining > 0
    ? `I'm helping Angels Haven close the £${campaignRemaining.toLocaleString()} gap so tonight's dogs can fly home.`
    : "Angels Haven's rescue flight takes off tonight—join me in keeping the corridor open.";

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
    <main className="relative flex min-h-screen snap-y snap-mandatory flex-col text-[#2b1a12]">
      <Navigation content={content} solid={navSolid} />
      <RailIndicators />
      <Hero content={content} prefersReducedMotion={prefersReducedMotion} />
      <MediaRibbon items={content.mediaRibbon} />
      <ImpactPulse summary={content.impact24h} />
      <GlobalStatsBand stats={content.globalStats} />
      <EmergencyFundMeter campaign={content.emergency} />
      <USPStrip items={content.usp} />
      <HowItWorks content={content} prefersReducedMotion={prefersReducedMotion} />
      <GivingCalculator config={content.givingCalculator} />
      <Stories content={content} prefersReducedMotion={prefersReducedMotion} />
      <RescueReels reels={content.reels} prefersReducedMotion={prefersReducedMotion} />
      <AdoptionShowcase content={content.adoption} prefersReducedMotion={prefersReducedMotion} />
      <SanctuarySpotlight content={content.sanctuary} prefersReducedMotion={prefersReducedMotion} />
      <FounderSpotlight content={content.founder} />
      <CommunitySection
        content={content.community}
        testimonials={content.testimonials}
        donorWall={content.donorWall}
        prefersReducedMotion={prefersReducedMotion}
      />
      <Bento content={content} />
      <CertificationGallery items={content.certificates} />
      <PartnersShowcase partners={content.partners} />
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
        shareMessage={exitShareMessage}
      />
    </main>
  );
}

const EN_CONTENT: LandingContent = {
  hero: {
    eyebrow: "Live rescue mission • Heathrow charter",
    headline: "Be the person who gets a rescue dog onto tonight's flight home.",
    subheadline: "Seven crate-trained friends are packed for Heathrow. Your £1 keeps meals moving; £120 closes the charter gap.",
    summary: "Charity Commission #1204821 • DEFRA-licensed corridor • WhatsApp impact drops within minutes",
    highlights: [
      "Watch the live countdown and see crates fill in real time.",
      "Meet Nova, Argo, Lale, and tonight's flight manifest.",
      "Every pound you send arrives with receipts, vet notes, and arrival selfies.",
    ],
    facesCaption: "Nova, Argo and Lale are waiting on the runway—your gift moves them home tonight.",
    ctaLabel: "Launch tonight's flight",
    ctaHref: "#adopt",
    donateHref: CTA_PRIMARY,
    donateAmounts: [8, 25, 60, 120],
    defaultSelectionLabel: "Choose a mission boost",
    donationStories: [
      { amount: 8, label: "Delivers 3 bowls of recovery stew" },
      { amount: 25, label: "Files export papers for one dog" },
      { amount: 60, label: "Covers a DEFRA crate share" },
      { amount: 120, label: "Books tonight's charter seat" },
    ],
    stats: {
      label: "Dogs funded this month",
      value: 18,
      suffix: "",
    },
    quickActions: [
      {
        id: "sponsor-crate",
        label: "Sponsor a crate",
        caption: "£60 splits a DEFRA crate three ways",
        href: CTA_PRIMARY,
        icon: "sponsor",
      },
      {
        id: "adopt-pack",
        label: "Meet the flight pack",
        caption: "Read the adoption dossiers",
        href: "#adopt",
        icon: "adopt",
      },
      {
        id: "escort-flight",
        label: "Escort a flight",
        caption: "Join the next Heathrow handover",
        href: "mailto:hello@angelshaven.org?subject=Flight%20escort%20volunteer",
        icon: "visit",
      },
      {
        id: "join-briefing",
        label: "Join mission brief",
        caption: "14.6k neighbours in the live ops group",
        href: CTA_COMMUNITY,
        icon: "community",
      },
    ],
    trustMarks: [
      {
        id: "charity",
        label: "Charity Commission",
        caption: "Reg. 1204821",
        href: "https://register-of-charities.charitycommission.gov.uk/charity-details/?regid=1204821",
      },
      {
        id: "wired",
        label: "WIRED Impact",
        caption: "Transparency short list 2024",
        href: "https://www.wired.co.uk",
      },
      {
        id: "defra",
        label: "DEFRA Travel",
        caption: "Licensed rescue corridor",
        href: "https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs",
      },
    ],
    media: {
      poster: "/images/hero-poster.avif",
      video: "/videos/hero-pack.mp4",
      alt: "Rescue dogs racing across sanctuary grass",
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
      { id: "group", metric: "👥 14.6k neighbours", caption: "Active inside the live ops group" },
      { id: "audit", metric: "Audit complete", caption: "Paws & Claws LLP FY23 assurance" },
    ],
    urgency: {
      remainingLabel: "Dogs cleared for take-off",
      remainingValue: "7",
      goalLabel: "Flight fund 73% complete",
      goalPercent: 73,
      footer: "Two escorts and vet clearances left—help us hit 100% before Sunday night.",
    },
    recurringHint: "Become a monthly guardian to keep the corridor open every weekend.",
    ticker: {
      headline: "Live donor feed",
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
        before: { poster: "/images/hero-rescue.png", alt: "Mila before rescue" },
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
        before: { poster: "/images/hero-rescue.png", alt: "Duman before treatment" },
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
  sanctuary: {
    eyebrow: "Tülay’s Sanctuary • İzmir countryside",
    headline: "Healing, trust, and wagging tails before every European flight.",
    body: "Founder Tülay and our local volunteers turn a four-acre farm into a recovery village—medicating street rescues, rebuilding muscle tone, and filming updates for future families.",
    highlight: "Sunrise check-ins, bone broth dinners, and WhatsApp videos keep adopters looped in from day one.",
    image: "/images/founder-tulay.png",
    quote: {
      text: "Watching them sprint again is the proof that every £1 you send lands in a heartbeat, not a spreadsheet.",
      name: "Tülay Arslan",
      role: "Founder & sanctuary lead",
    },
    pillars: [
      {
        id: "triage",
        title: "Sunrise triage",
        copy: "Wounds cleaned, meds given, and each dog logged for the vet’s midday round before the sun warms the paddocks.",
      },
      {
        id: "social",
        title: "Family socialising",
        copy: "Neighbours and school volunteers spend hours on the grass so nervous pups relearn people as safety.",
      },
      {
        id: "travel",
        title: "Flight prep",
        copy: "DEFRA paperwork, crate conditioning, and calm airport rehearsals mean travel days feel familiar.",
      },
      {
        id: "updates",
        title: "Daily updates",
        copy: "Short clips and milestones drop into adopter and sponsor chats every evening straight from the farm.",
      },
    ],
    stats: [
      { id: "rehab", value: "36", label: "Dogs in rehab beds this month" },
      { id: "escorts", value: "12", label: "Volunteer escorts booked for EU journeys" },
      { id: "acres", value: "4", label: "Acre woodland paddocks for recovery" },
    ],
    cta: {
      primaryLabel: "Sponsor a rehab stay",
      primaryHref: CTA_PRIMARY,
      secondaryLabel: "Send supplies to Tülay",
      secondaryHref: "mailto:hello@angelshaven.org?subject=Supplies%20for%20T%C3%BClay",
      note: "100% of sanctuary gifts fuel feed, meds, and travel prep.",
    },
  },
  community: {
    eyebrow: "Community • Transparency",
    headline: "14,682 neighbours keep Angels Haven accountable every night.",
    description: "The private Facebook group is our mission control—livestreams from Tülay’s farm, vet invoices, flight rosters, and donor Q&As before they hit the newsletter.",
    fb: {
      members: "14,682 members • 32 posts/day",
      href: CTA_COMMUNITY,
      label: "Join Angels Haven Rescue Updates",
      proof: "Admins verify every adopter, donor, and volunteer. Weekly pinned posts include download links to ledgers, vet receipts, and escort rosters.",
    },
    highlights: [
      {
        id: "livestreams",
        title: "Nightly livestream checkpoints",
        copy: "Tülay goes live from İzmir at 21:00 TRT with kennel walk-throughs, medication logs, and meal prep updates.",
      },
      {
        id: "escorts",
        title: "Volunteer escort hub",
        copy: "Templates, packing lists, and live airport chats help new escorts accompany dogs on London, Berlin, and Amsterdam flights.",
      },
      {
        id: "ledger",
        title: "Open finance threads",
        copy: "Stripe and PayPal exports are posted on the first of every month with line-by-line vet, feed, and transport spend.",
      },
      {
        id: "alerts",
        title: "Rapid response alerts",
        copy: "Critical rescues trigger @everyone tags—funding goals close in under 90 minutes thanks to the group.",
      },
    ],
    stats: [
      { id: "escorts", value: "312", label: "Flights escorted by community volunteers" },
      { id: "donors", value: "18,247", label: "Recurring donors tracked across Stripe & PayPal" },
      { id: "support", value: "96%", label: "Support tickets resolved within 24 hours" },
      { id: "streams", value: "365", label: "Livestreams broadcast over the last 12 months" },
    ],
    cta: {
      label: "Join the Facebook group",
      href: CTA_COMMUNITY,
      secondaryLabel: "Download the latest impact report",
      secondaryHref: CTA_REPORT,
    },
  },
  testimonials: [
    {
      id: "amelia",
      quote: "I escort flights twice a year—supporters watched our Heathrow touchdown live and had already covered the follow-up vet visit.",
      name: "Amelia R., London",
      role: "Monthly donor & foster",
      rating: 5,
      media: {
        poster: "/images/story-mila.avif",
        video: "/videos/story-mila.mp4",
        alt: "Amelia describing escorting flights",
      },
    },
    {
      id: "umit",
      quote: "Every receipt is uploaded in the Facebook group within hours. Seeing the ledger made me upgrade to an annual sponsor.",
      name: "Ümit K., İzmir",
      role: "Sanctuary volunteer",
      rating: 4.9,
      media: {
        poster: "/images/story-duman.avif",
        video: "/videos/story-duman.mp4",
        alt: "Ümit sharing sanctuary updates",
      },
    },
    {
      id: "niamh",
      quote: "We trusted Angels Haven with corporate CSR funds because their governance pack and live Q&As leave nothing hidden.",
      name: "Niamh F., Edinburgh",
      role: "CSR programme lead",
      rating: 4.8,
      media: {
        poster: "/images/step-impact.avif",
        video: "/videos/step-impact.mp4",
        alt: "Niamh explaining CSR partnership",
      },
    },
  ],
  securityBadges: [
    { id: "ssl", label: "TLS 1.3", description: "256-bit encryption via Cloudflare & Next.js edge" },
    { id: "pci", label: "PCI DSS", description: "Stripe + PayPal Level 1 gateways" },
    { id: "gdpr", label: "GDPR Ready", description: "EU data residency & consent-based tracking" },
    { id: "trust", label: "Transparency Panel", description: "Live ledgers published weekly in Facebook group" },
  ],
  mediaRibbon: [
    { id: "guardian-feature", label: "Micro-donations funding flights", outlet: "The Guardian", href: "https://www.theguardian.com/uk" },
    { id: "bbc-late", label: "Night missions across Istanbul", outlet: "BBC Radio London", href: "https://www.bbc.co.uk/sounds" },
    { id: "wired-panel", label: "Transparency dashboards rebuild trust", outlet: "WIRED Impact", href: "https://www.wired.co.uk" },
  ],
  founder: {
    eyebrow: "Meet Tülay",
    headline: "The aviation logistician turning a Turkish farm into a lifeline",
    paragraphs: [
      "Tülay Arslan left a decade-long airline logistics career to formalise rescue corridors between coastal Turkey and safe homes across the UK and EU.",
      "She documents every meal, vet procedure, and export clearance in nightly livestreams so donors never wonder where a pound went.",
    ],
    credentials: [
      { id: "defra", label: "DEFRA Certified", detail: "Pet travel specialist since 2016" },
      { id: "flight", label: "435 Flights", detail: "Coordinated for rescue escorts" },
      { id: "ops", label: "Ops Playbooks", detail: "24-step emergency care protocol" },
      { id: "languages", label: "Bilingual", detail: "Bridging UK donor + TR field teams" },
    ],
    stats: [
      { id: "dogs", value: "182", caption: "Dogs rehomed since 2021" },
      { id: "livestreams", value: "365", caption: "Livestreams broadcast in the last year" },
      { id: "volunteers", value: "94", caption: "Active sanctuary & escort volunteers" },
    ],
    image: "/images/founder-tulay.png",
    video: "/videos/hero-pack.mp4",
  },
  certificates: [
    {
      id: "charity-commission",
      title: "Charity Commission Registration",
      issuer: "Charity Commission for England & Wales",
      year: "2024",
      summary: "Official registration entry confirming compliance with UK charity law.",
      href: "https://register-of-charities.charitycommission.gov.uk/charity-details/?regid=1204821",
    },
    {
      id: "hackney-cvs",
      title: "Hackney CVS Membership",
      issuer: "Hackney Council for Voluntary Service",
      year: "2024",
      summary: "Validated membership in the borough’s safeguarding and governance network.",
      href: "https://hcvs.org.uk",
    },
    {
      id: "defra-license",
      title: "DEFRA Animal Transport License",
      issuer: "Department for Environment, Food & Rural Affairs",
      year: "2025",
      summary: "Transportation authorisation for cross-border pet relocation under DEFRA TRACES.",
      href: CTA_REPORT,
    },
    {
      id: "audit-letter",
      title: "Paws & Claws LLP FY23 Audit",
      issuer: "Paws & Claws LLP",
      year: "2024",
      summary: "Independent assurance covering income, reserves, and emergency disbursements.",
      href: CTA_REPORT,
    },
    {
      id: "insurance",
      title: "Global Rescue Insurance Cover",
      issuer: "Global Rescue Underwriters",
      year: "2025",
      summary: "Policy covering volunteer escorts, sanctuary operations, and cargo liability.",
      href: CTA_REPORT,
    },
  ],
  donorWall: [
    { id: "amelia-donor", name: "Amelia R.", amount: 250, city: "London, UK", recurring: true, since: "2021" },
    { id: "umit-donor", name: "Ümit K.", amount: 140, city: "Izmir, TR", recurring: true, since: "2022" },
    { id: "morgan", name: "Morgan L.", amount: 500, city: "Manchester, UK", recurring: false, since: "2024" },
    { id: "melis", name: "Melis D.", amount: 75, city: "Istanbul, TR", recurring: true, since: "2023" },
  ],
  globalStats: [
    { id: "meals", label: "Meals served", value: "72k", detail: "Tracked across Fethiye, Dalyan, İzmir since launch" },
    { id: "med", label: "Medical cases", value: "418", detail: "Emergency surgeries funded within 6 hours" },
    { id: "escorts", label: "Volunteer escorts", value: "312", detail: "Flights accompanied by trained community members" },
    { id: "recurring", label: "Recurring donors", value: "18,247", detail: "Stripe + PayPal autopay families keeping the corridor alive" },
  ],
  partners: [
    { id: "defra", name: "DEFRA", href: "https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs", description: "Pet travel compliance partner" },
    { id: "paws-claws", name: "Paws & Claws LLP", href: "https://example.com/paws-and-claws", description: "Independent auditors" },
    { id: "global-rescue", name: "Global Rescue Underwriters", href: "https://example.com/global-rescue", description: "Transport insurance" },
    { id: "hackney-cvs", name: "Hackney CVS", href: "https://hcvs.org.uk", description: "Safeguarding network" },
    { id: "vet-network", name: "TR Vet Network", href: "https://example.com/tr-vet", description: "18-clinic medical collective" },
  ],
  emergency: {
    title: "7 dogs are flight-ready but the charter balance is short",
    description: "Every £120 block fuels DEFRA travel crates, final vet checks, and volunteer escorts. Once we hit 100%, the Heathrow corridor re-opens on Sunday night.",
    goal: 8400,
    raised: 6240,
    currency: "£",
    dogsWaiting: 7,
    deadline: "Sunday 19:00 GMT",
    deadlineIso: "2025-02-16T19:00:00Z",
    ctaLabel: "Fund the last mile",
    ctaHref: CTA_PRIMARY,
  },
  givingCalculator: {
    defaultAmount: 25,
    note: "Recurring donors get live receipts, crate manifests, and private livestream alerts.",
    steps: [
      { amount: 8, label: "Meals & meds", description: "Covers 30 bowls of high-calorie feed and antibiotics each month." },
      { amount: 25, label: "Flight share", description: "Sponsors one-third of a DEFRA crate and export paperwork for a dog." },
      { amount: 50, label: "Rescue corridor", description: "Keeps the night ambulance on call for emergency pickups." },
      { amount: 100, label: "Full transport", description: "Funds a complete sanctuary-to-Heathrow journey including escort costs." },
    ],
  },
  impact24h: {
    headline: "Impact in the last 24 hours",
    totalRaised: 2470,
    currency: "£",
    supporters: 186,
    flightsBooked: 3,
  },
  reels: [
    {
      id: "tulay-morning",
      title: "Sunrise rounds with Tülay",
      description: "Medication checks, bone broth prep, and kennel updates streamed direct from the farm.",
      media: { poster: "/images/story-mila.avif", video: "/videos/story-mila.mp4", alt: "Tülay caring for rescue dogs" },
    },
    {
      id: "flight-escort",
      title: "Escort briefing before Heathrow",
      description: "Volunteers rehearse crate loading and DEFRA paperwork before heading to the airport.",
      media: { poster: "/images/story-duman.avif", video: "/videos/story-duman.mp4", alt: "Volunteers preparing travel crates" },
    },
    {
      id: "adopter-update",
      title: "First sofa night in London",
      description: "Nova’s adopters share the first cuddle at home and vet follow-up receipts.",
      media: { poster: "/images/step-impact.avif", video: "/videos/step-impact.mp4", alt: "Adopter sharing update" },
    },
  ],
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
    secondaryLabel: "Join the Facebook group",
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
      {
        id: "community-proof",
        title: "Live ledgers inside Facebook group",
        detail: "Pinned transparency posts include monthly XLS exports, livestream archive, and escort rosters.",
        proof: "See the Transparency guide in the Facebook group (Modules 01–03).",
      },
    ],
    metrics: [
      { id: "meals", label: "Meals delivered", value: "2,184 / month", caption: "GPS-logged routes across Fethiye, Dalyan, Izmir." },
      { id: "flights", label: "Flights escorted", value: "312", caption: "Volunteer-led journeys organised via community hub." },
      { id: "donors", label: "Recurring donors", value: "18,247", caption: "Stripe + PayPal autopay supporters under quarterly review." },
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
      { label: "TR Ops", value: "Calis Mah. 112. Sokak No:4, Fethiye / Muğla" },
      { label: "Facebook", value: "Rescue Updates Group", href: CTA_COMMUNITY },
    ],
    proofDocument: {
      label: "Download due diligence pack",
      href: CTA_REPORT,
      description: "Registration certificates, safeguarding policy, transport insurance, and FY23 audit letter.",
    },
  },
  footer: {
    registration: "Charity Commission for England & Wales No. 1204821",
    address: "18 Market Walk, Islington, London N1 7SR • Ops hub: Calis Mah. 112. Sokak No:4, Fethiye / Muğla",
    email: "support@angelshaven.org",
    phone: "+44 20 7946 0958",
    hours: "Phone lines: Mon–Sat 08:00–20:00 GMT",
    socials: [
      { label: "Facebook Group", href: CTA_COMMUNITY },
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
