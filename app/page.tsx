'use client';

import { useEffect, useRef, useState } from "react";
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

type HeroContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  summary: string;
  ctaLabel: string;
  donateHref: string;
  donateAmounts: number[];
  stats: StatMetric;
  social: { label: string; href: string }[];
  media: MediaAsset;
  liveCounter: {
    label: string;
    initial: number;
    minIncrement: number;
    maxIncrement: number;
    intervalMs: number;
    suffix?: string;
  };
  socialProof: { id: string; metric: string; caption: string }[];
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

type FAQItem = {
  question: string;
  answer: string;
};

export type LandingContent = {
  hero: HeroContent;
  usp: string[];
  steps: StepItem[];
  stories: StoryItem[];
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
};

const CTA_PRIMARY = "https://www.paypal.com/donate";
const CTA_REPORT = "https://example.com/angels-haven-transparency.pdf";
const CTA_COMMUNITY = "https://www.facebook.com";

const RAIL_SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "how", label: "Flow" },
  { id: "stories", label: "Stories" },
  { id: "impact", label: "Impact" },
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
      });
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      lenis.on("scroll", handleScrollUpdate);
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
    };

    startLenis();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
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

function MagneticButton({ href, children, className, onHover }: { href: string; children: React.ReactNode; className?: string; onHover?: () => void }) {
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
          <a href="#faq" className="transition hover:text-white">
            FAQ
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
  const shouldPlay = active && !prefersReducedMotion && Boolean(media.video);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image src={media.poster} alt={media.alt} fill priority className={`object-cover transition-opacity duration-700 ${shouldPlay ? "opacity-0" : "opacity-100"}`} />
      {shouldPlay && media.video && (
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster={media.poster}>
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
                href={hero.donateHref}
                onHover={() => trackEvent("cta_click_primary", { surface: "hero-hover" })}
              >
                {hero.ctaLabel}
              </MagneticButton>
              <button
                type="button"
                className="cta-muted text-xs uppercase tracking-[0.3em] text-white/70"
                onClick={() => {
                  trackEvent("cta_click_primary", { surface: "hero-secondary" });
                  window.open(CTA_REPORT, "_blank");
                }}
              >
                Monthly report
              </button>
            </div>
            <DonationAmounts amounts={hero.donateAmounts} href={hero.donateHref} />
            <LiveDonationPulse config={hero.liveCounter} prefersReducedMotion={prefersReducedMotion} />
            <HeroSocialProof items={hero.socialProof} />
          </div>
        </div>
        <motion.aside
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
          className="glass-card flex h-fit flex-col gap-5 rounded-[2.4rem] border border-white/15 bg-white/8 p-6 text-white/80"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">{hero.stats.label}</p>
            <p className="mt-2 text-4xl font-semibold text-white">
              <AnimatedCounter value={hero.stats.value} suffix={hero.stats.suffix} />
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            {hero.social.map((item) => (
              <a key={item.label} href={item.href} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-white/35 hover:text-white" aria-label={item.label}>
                <SocialIcon label={item.label} />
              </a>
            ))}
          </div>
        </motion.aside>
      </div>
      <ScrollPrompt />
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

function DonationAmounts({ amounts, href }: { amounts: number[]; href: string }) {
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

function HeroSocialProof({ items }: { items: HeroContent["socialProof"] }) {
  if (!items.length) return null;
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="glass-card flex flex-col gap-1 rounded-[1.6rem] border border-white/12 bg-white/6 px-4 py-3 text-white/80">
          <span className="text-lg font-semibold text-white">{item.metric}</span>
          <span className="text-xs uppercase tracking-[0.28em] text-white/55">{item.caption}</span>
        </div>
      ))}
    </div>
  );
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

function SocialIcon({ label }: { label: string }) {
  const icon = label.toLowerCase();
  switch (icon) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
          <path d="M21.6 7.6c-.2-1.2-.9-1.9-2-2C17.6 5.3 12 5.3 12 5.3s-5.6 0-7.6.3c-1.1.1-1.8.8-2 2C2.1 9.6 2 12 2 12s.1 2.4.4 4.4c.2 1.2.9 1.9 2 2 2 .3 7.6.3 7.6.3s5.6 0 7.6-.3c1.1-.1 1.8-.8 2-2 .3-2 .4-4.4.4-4.4s-.1-2.4-.4-4.4ZM10.1 15.2v-6l5.2 3-5.2 3Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
          <rect x="4" y="9" width="3.5" height="11" rx="0.4" />
          <circle cx="5.8" cy="5.5" r="2" />
          <path d="M12 10.2c0-1 .8-1.8 1.8-1.8h.5c2 0 3.7 1.6 3.7 3.6V20H14v-6.8c0-.4-.3-.7-.7-.7-.4 0-.7.3-.7.7V20H12v-9.8Z" />
        </svg>
      );
    default:
      return <span className="font-semibold text-[0.65rem] uppercase">{label.slice(0, 2)}</span>;
  }
}

function ExitIntentModal({
  open,
  onClose,
  donateHref,
  prefersReducedMotion,
}: {
  open: boolean;
  onClose: () => void;
  donateHref: string;
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
            <h3 className="heading-md mt-4 text-white">Before you go, £1 today fills a bowl tonight.</h3>
            <p className="mt-3 text-sm text-white/70">
              We’re only a few meals away from hitting this week’s target. One more tap keeps the rescue crews rolling.
            </p>
            <div className="mt-6 flex gap-3">
              <MagneticButton
                href={donateHref}
                onHover={() => trackEvent("cta_click_primary", { surface: "exit-intent" })}
              >
                £1 Feeds a Dog Today
              </MagneticButton>
              <button
                type="button"
                className="cta-muted text-xs uppercase tracking-[0.3em] text-white/70"
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
      <Bento content={content} />
      <FAQSection content={content} />
      <FinalCTA content={content} />
      <StickyDonateDock label="£1 Feeds a Dog Today" href={content.hero.donateHref} />
      <ExitIntentModal
        open={exitIntentVisible}
        onClose={closeExitModal}
        donateHref={content.hero.donateHref}
        prefersReducedMotion={prefersReducedMotion}
      />
    </main>
  );
}

const EN_CONTENT: LandingContent = {
  hero: {
    eyebrow: "Angels Haven • UK ↔ TR",
    headline: "£1 = One Meal. Change a Life Today.",
    subheadline: "Micro-donations move food, emergency care, and flights for rescues between Turkey and the UK.",
    summary: "Transparent monthly impact • 1-click secure checkout",
    ctaLabel: "£1 Feeds a Dog Today",
    donateHref: CTA_PRIMARY,
    donateAmounts: [1, 8, 25, 55],
    stats: {
      label: "Meals this month",
      value: 4186,
      suffix: "",
    },
    social: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "YouTube", href: "https://youtube.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
    ],
    media: {
      poster: "/images/hero-poster.avif",
      video: "/videos/hero-loop.mp4",
      alt: "Rescued dogs gathering around a volunteer from above",
    },
    liveCounter: {
      label: "Live donors this week",
      initial: 1286,
      minIncrement: 3,
      maxIncrement: 8,
      intervalMs: 6500,
      suffix: "people",
    },
    socialProof: [
      { id: "today", metric: "142", caption: "Donated today" },
      { id: "moment", metric: "Every 5 min", caption: "A meal is funded" },
      { id: "rating", metric: "4.9★", caption: "Community rating" },
    ],
  },
  usp: [
    "£1 = One Meal",
    "Monthly Transparency",
    "1-Click Secure Checkout",
    "UK ↔ TR Operations",
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
};

export default function Home() {
  return <Landing content={EN_CONTENT} />;
}
