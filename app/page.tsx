'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    lottie?: {
      loadAnimation: (config: {
        container: HTMLElement;
        renderer: "svg" | "canvas" | "html";
        loop: boolean;
        autoplay: boolean;
        path: string;
        name?: string;
      }) => { destroy: () => void };
    };
  }
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type MediaAsset = {
  poster: string;
  video?: string;
  alt: string;
};

type DonationTickerEntry = {
  id: string;
  donor: string;
  amount: number;
  city: string;
  minutesAgo: number;
  method: string;
};

type HeroContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  media: MediaAsset;
  stat: { label: string; value: number; suffix?: string };
  progress: { label: string; caption: string; percent: number };
  donationOptions: { amount: number; label: string }[];
  ticker: { headline: string; entries: DonationTickerEntry[] };
};

type JourneyScene = {
  id: string;
  badge: string;
  title: string;
  copy: string;
  media: MediaAsset;
};

type JourneyContent = {
  intro: { eyebrow: string; title: string; copy: string };
  scenes: JourneyScene[];
};

type PetCard = {
  id: string;
  name: string;
  age: string;
  personality: string;
  shortStory: string;
  image: string;
  badge: string;
  sponsor: { monthly: number; oneOff: number; impact: string };
};

type FacesContent = {
  eyebrow: string;
  title: string;
  copy: string;
  cards: PetCard[];
};

type DonationOption = {
  amount: number;
  label: string;
  impact: string;
};

type ImpactMicrocopy = {
  id: string;
  label: string;
};

type DonationFlowContent = {
  eyebrow: string;
  title: string;
  copy: string;
  highlight: string;
  options: DonationOption[];
  microcopy: ImpactMicrocopy[];
  feesLabel: string;
  payments: string[];
  secureBadges: string[];
  media: MediaAsset;
};

type StoryItem = {
  id: string;
  title: string;
  copy: string;
  stat: string;
  media: { before: MediaAsset; after: MediaAsset; clip?: MediaAsset };
};

type StoriesContent = {
  eyebrow: string;
  title: string;
  copy: string;
  stories: StoryItem[];
};

type CommunityPost = {
  id: string;
  author: string;
  location: string;
  quote: string;
  image: string;
};

type PartnerLogo = {
  id: string;
  label: string;
};

type CommunityContent = {
  eyebrow: string;
  title: string;
  copy: string;
  media: MediaAsset;
  posts: CommunityPost[];
  partners: PartnerLogo[];
  transparency: { id: string; label: string; value: string }[];
  metrics: { id: string; label: string; value: string; caption: string }[];
};

type ShareLink = {
  id: string;
  label: string;
  href: string;
  description: string;
};

type FinalContent = {
  eyebrow: string;
  title: string;
  copy: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  shares: ShareLink[];
};

type FooterContent = {
  registration: string;
  address: string;
  email: string;
  phone: string;
  socials: { label: string; href: string }[];
};

type LandingContent = {
  hero: HeroContent;
  journey: JourneyContent;
  faces: FacesContent;
  donation: DonationFlowContent;
  stories: StoriesContent;
  community: CommunityContent;
  final: FinalContent;
  footer: FooterContent;
};

const CTA_DONATE = "https://www.paypal.com/donate";

function trackEvent(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(layer)) {
    layer.push({ event, ...payload });
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

    const handleScrollUpdate = () => ScrollTrigger.update();
    const handleResize = () => ScrollTrigger.refresh();

    const startLenis = () => {
      if (lenis) return;
      lenis = new Lenis({ duration: 1.05, lerp: 0.08, smoothWheel: true });
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      lenis.on("scroll", handleScrollUpdate);
      window.addEventListener("resize", handleResize, { passive: true });
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
      window.removeEventListener("resize", handleResize);
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
  useEffect(() => {
    if (!ref.current) return;
    const obj = { current: 0 };
    const tween = gsap.to(obj, {
      current: value,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(obj.current).toLocaleString()}${suffix ?? ""}`;
        }
      },
    });
    return () => {
      tween.kill();
    };
  }, [value, suffix]);
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
      className={`cta-primary inline-flex items-center gap-3 px-8 py-3 text-base font-semibold transition ${className ?? ""}`}
      onMouseEnter={onHover}
    >
      {children}
    </a>
  );
}

function LottieBadge({ path, loop = true, className }: { path: string; loop?: boolean; className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animation: { destroy: () => void } | null = null;
    let interval: number | undefined;

    const init = () => {
      if (!containerRef.current || !window.lottie || animation) return;
      animation = window.lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop,
        autoplay: true,
        path,
        name: `lottie-${path}`,
      });
    };

    if (typeof window !== "undefined") {
      if (window.lottie) {
        init();
      } else {
        interval = window.setInterval(() => {
          if (window.lottie) {
            init();
            if (interval) {
              window.clearInterval(interval);
              interval = undefined;
            }
          }
        }, 160);
      }
    }

    return () => {
      if (interval) window.clearInterval(interval);
      animation?.destroy();
    };
  }, [loop, path]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}

function SmartVideo({ media, prefersReducedMotion, className, overlay = true }: { media: MediaAsset; prefersReducedMotion: boolean; className?: string; overlay?: boolean }) {
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
    if (typeof playPromise?.catch === "function") {
      playPromise.catch(() => undefined);
    }
  }, [shouldPlay, prefersReducedMotion, media.video]);

  const containerClass = className
    ? `${className} relative overflow-hidden`
    : "relative overflow-hidden rounded-[1.8rem] border border-[rgba(208,178,148,0.35)] bg-white/85";

  return (
    <div ref={containerRef} className={containerClass}>
      <Image src={media.poster} alt={media.alt} width={960} height={540} className={`h-full w-full object-cover transition-opacity duration-500 ${shouldPlay && !prefersReducedMotion && media.video ? 'opacity-0' : 'opacity-100'}`} />
      {!prefersReducedMotion && media.video && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${shouldPlay ? 'opacity-100' : 'opacity-0'}`}
          muted
          loop
          playsInline
          poster={media.poster}
        >
          <source src={media.video} type="video/mp4" />
        </video>
      )}
      {overlay && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#ffe7d0]/75 via-transparent to-transparent" />}
    </div>
  );
}

function EndowedProgress({ variant = "warm" }: { variant?: "warm" | "glow" }) {
  const isGlow = variant === "glow";
  const containerClass = isGlow
    ? "relative inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#fdeede] shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-md"
    : "relative inline-flex items-center gap-3 rounded-full border border-[rgba(208,178,148,0.5)] bg-[rgba(255,244,231,0.9)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#7d5a42]";

  const animationClass = isGlow ? "h-8 w-8 drop-shadow-[0_0_18px_rgba(255,153,71,0.55)]" : "h-8 w-8";
  return (
    <div className={containerClass}>
      <LottieBadge path="/lottie/heart-pulse.json" className={animationClass} />
      Bahşedilmiş ilerleme aktif
    </div>
  );
}

function LiveDonationTicker({ ticker, prefersReducedMotion, tone = "warm" }: { ticker: HeroContent["ticker"]; prefersReducedMotion: boolean; tone?: "warm" | "glow" }) {
  const [entries, setEntries] = useState(() => ticker.entries.slice(0, 6));

  useEffect(() => {
    setEntries(ticker.entries.slice(0, 6));
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
    }, 5200);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, entries.length]);

  const isGlow = tone === "glow";
  const containerClass = isGlow
    ? "flex flex-col gap-3 rounded-[2rem] border border-white/18 bg-white/12 px-5 py-4 text-[#fdf3e5] shadow-[0_28px_68px_rgba(0,0,0,0.32)] backdrop-blur-lg"
    : "glass-card flex flex-col gap-3 rounded-[2rem] border border-[rgba(208,178,148,0.4)] bg-white/85 px-5 py-4 text-[#2f2118]";

  const chipClass = isGlow
    ? "flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-3 py-2 text-[#fef3e4]"
    : "flex items-center justify-between gap-3 rounded-2xl bg-[rgba(255,250,245,0.82)] px-3 py-2";

  const subTextClass = isGlow ? "text-xs uppercase tracking-[0.24em] text-[#fde0c2]" : "text-xs uppercase tracking-[0.24em] text-[#7d5a42]";
  const amountTextClass = isGlow ? "text-base font-semibold text-white" : "text-base font-semibold text-[#2f2118]";
  const timeTextClass = isGlow ? "text-xs text-[#fde0c2]" : "text-xs text-[#7d5a42]";
  const headlineTextClass = isGlow ? "text-xs uppercase tracking-[0.28em] text-[#fde0c2]/90" : "text-xs uppercase tracking-[0.28em] text-[#7d5a42]";

  return (
    <div className={containerClass} aria-live="polite">
      <div className={`flex items-center justify-between ${headlineTextClass}`}>
        <span>{ticker.headline}</span>
        <span className="inline-flex items-center gap-1 text-[0.65rem] text-inherit">
          <span className={`inline-flex h-2 w-2 animate-pulse rounded-full ${isGlow ? 'bg-[#ffb15d]' : 'bg-[#ff7a00]'}`} aria-hidden="true" />
          Live
        </span>
      </div>
      <ul className={`flex flex-col gap-3 text-sm ${isGlow ? 'text-[#fbe5cd]' : 'text-[#4a372a]'}`}>
        {entries.slice(0, 4).map((entry) => (
          <li key={entry.id} className={chipClass}>
            <div className="flex flex-col leading-tight">
              <span className={`font-semibold ${isGlow ? 'text-white' : 'text-[#2f2118]'}`}>{entry.donor}</span>
              <span className={subTextClass}>{entry.city} • {entry.method}</span>
            </div>
            <div className="flex flex-col items-end leading-tight">
              <span className={amountTextClass}>€{entry.amount}</span>
              <span className={timeTextClass}>{entry.minutesAgo} dk önce</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Hero({ content, prefersReducedMotion }: { content: LandingContent["hero"]; prefersReducedMotion: boolean }) {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(
          "#hero-eyebrow",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 }
        )
        .fromTo(
          "#hero-headline",
          { y: 46, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          "<0.1"
        )
        .fromTo(
          "#hero-subheadline",
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "<0.1"
        )
        .fromTo(
          "#hero-description",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "<0.05"
        )
        .fromTo(
          ".hero-cta",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          "<0.05"
        )
        .fromTo(
          ".hero-stat",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          "<0.1"
        );
    }, heroRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] snap-start overflow-hidden text-white"
    >
      <div className="absolute inset-0">
        {!prefersReducedMotion && content.media.video ? (
          <video
            key={content.media.video}
            className="absolute inset-0 h-full w-full object-cover brightness-[0.92]"
            autoPlay
            muted
            loop
            playsInline
            poster={content.media.poster}
          >
            <source src={content.media.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={content.media.poster}
            alt={content.media.alt}
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(255,196,151,0.68),transparent_58%)]" aria-hidden />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,10,6,0.72)_0%,rgba(22,12,8,0.66)_42%,rgba(29,18,12,0.74)_100%)]" aria-hidden />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <header className="section-shell flex flex-col gap-10 pt-24 md:pt-28">
          <div id="hero-eyebrow" className="flex flex-wrap items-center gap-4 text-[0.68rem] uppercase tracking-[0.32em] text-[#fdeede]/90">
            <EndowedProgress variant="glow" />
            <span className="hidden h-[1px] w-12 bg-[#fdeede]/40 sm:inline-flex" aria-hidden />
            <span>{content.eyebrow}</span>
          </div>

          <div className="max-w-[620px] space-y-5">
            <h1
              id="hero-headline"
              className="display-hero drop-shadow-[0_42px_110px_rgba(0,0,0,0.45)]"
            >
              {content.headline}
            </h1>
            <p id="hero-subheadline" className="text-lg font-medium text-[#fceedd]">
              {content.subheadline}
            </p>
            <p id="hero-description" className="max-w-[520px] text-sm text-[#f8dbc0]">
              {content.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton
              href={content.primaryCta.href}
              className="hero-cta"
              onHover={() => trackEvent("cta_click_primary", { surface: "hero-primary" })}
            >
              {content.primaryCta.label}
            </MagneticButton>
            <a
              href={content.secondaryCta.href}
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-white/28 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.32em] text-[#fdeede] shadow-[0_22px_60px_rgba(0,0,0,0.32)] backdrop-blur-lg transition hover:border-white/45 hover:bg-white/16"
              onClick={() => trackEvent("cta_click_secondary", { surface: "hero-secondary" })}
            >
              {content.secondaryCta.label}
            </a>
          </div>
        </header>

        <div className="section-shell flex flex-col gap-6 pb-16 sm:pb-20 md:flex-row md:items-end md:justify-between">
          <div className="hero-stat max-w-xl rounded-[2.6rem] border border-white/20 bg-white/12 p-6 shadow-[0_32px_120px_rgba(0,0,0,0.4)] backdrop-blur-lg">
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-[0.32em] text-[#fdeede]/80">
                  {content.stat.label}
                </span>
                <p className="mt-2 text-4xl font-semibold text-white">
                  <AnimatedCounter value={content.stat.value} suffix={content.stat.suffix} />
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {content.donationOptions.map((option) => (
                  <button
                    key={option.amount}
                    type="button"
                    className="rounded-full border border-white/25 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#fdeede] transition hover:border-white/45 hover:bg-white/12"
                    onClick={() => {
                      trackEvent("donation_amount_select", { amount: option.amount, currency: "EUR" });
                      window.open(content.primaryCta.href, "_blank");
                    }}
                  >
                    €{option.amount}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#fdeede]/75">
                  <span>{content.progress.label}</span>
                  <span>{content.progress.percent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-[#ff9b38]"
                    style={{ width: `${Math.min(100, content.progress.percent)}%` }}
                  />
                </div>
                <p className="text-xs text-[#fde7d5]">{content.progress.caption}</p>
              </div>
            </div>
          </div>

          <div className="hero-stat max-w-sm">
            <LiveDonationTicker
              ticker={content.ticker}
              prefersReducedMotion={prefersReducedMotion}
              tone="glow"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.32em] text-[#fdeede]/75 lg:flex">
        <span>Kaydır</span>
        <span className="h-20 w-[1px] bg-[linear-gradient(180deg,rgba(253,238,222,0)_0%,rgba(253,238,222,0.7)_45%,rgba(253,238,222,0)_100%)]" aria-hidden />
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30">↓</span>
      </div>
    </section>
  );
}

function RescueJourney({ content, prefersReducedMotion }: { content: LandingContent["journey"]; prefersReducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>(".journey-scene");
      scenes.forEach((scene, index) => {
        const media = scene.querySelector<HTMLElement>(".journey-media");
        const halo = scene.querySelector<HTMLElement>(".journey-halo");

        gsap.fromTo(
          scene,
          { opacity: 0.35, y: index === 0 ? 0 : 90 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: scene,
              start: "top 75%",
              end: "bottom 45%",
              scrub: true,
            },
          }
        );

        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.08, filter: "brightness(0.82) saturate(0.82)" },
            {
              scale: 1,
              filter: "brightness(1) saturate(1)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: scene,
                start: "top 80%",
                end: "center 55%",
                scrub: true,
              },
            }
          );
        }

        if (halo) {
          gsap.fromTo(
            halo,
            { opacity: 0, scale: 0.6 },
            {
              opacity: 0.8,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: scene,
                start: "top 85%",
                end: "center 45%",
                scrub: true,
              },
            }
          );
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="journey"
      className="snap-start relative overflow-hidden bg-[linear-gradient(180deg,#fef0df_0%,#f7e4d4_52%,#f0d7c4_100%)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,196,151,0.35),transparent_62%)]" aria-hidden />
      <div className="section-shell relative z-10 grid gap-16 py-32 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <div className="sticky top-28 flex flex-col gap-6 text-[#2f2118]">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#7d5a42]">
            {content.intro.eyebrow}
          </span>
          <h2 className="heading-xl text-[#2f2118]">{content.intro.title}</h2>
          <p className="text-sm text-[#5a3f2d]">{content.intro.copy}</p>
          <div className="mt-6 flex flex-col gap-3 text-xs uppercase tracking-[0.28em] text-[#b07b56]">
            {content.scenes.map((scene, index) => (
              <div key={scene.id} className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(208,178,148,0.4)] bg-white/70 font-semibold text-[#7d5a42]">
                  {index + 1}
                </span>
                <span>{scene.badge}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={containerRef} className="flex flex-col gap-16">
          {content.scenes.map((scene, index) => (
            <article
              key={scene.id}
              className="journey-scene relative overflow-hidden rounded-[2.8rem] border border-[rgba(208,178,148,0.35)] bg-[#20140d]/65 text-white shadow-[0_36px_110px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            >
              <SmartVideo
                media={scene.media}
                prefersReducedMotion={prefersReducedMotion}
                className="journey-media h-[420px] w-full"
                overlay={false}
              />
              <div className="journey-halo pointer-events-none absolute -inset-10 rounded-[4rem] bg-[radial-gradient(circle_at_center,rgba(255,168,104,0.45),rgba(255,168,104,0))] opacity-0" aria-hidden />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(21,13,9,0.1)_0%,rgba(21,13,9,0.72)_68%,rgba(21,13,9,0.88)_100%)]" aria-hidden />
              <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-[#f8dbc0]/85">
                  <span>{scene.badge}</span>
                  <span>
                    {index + 1}/{content.scenes.length}
                  </span>
                </div>
                <div className="max-w-[420px] space-y-3">
                  <h3 className="heading-md text-white">{scene.title}</h3>
                  <p className="text-sm text-[#f8dbc0]">{scene.copy}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HopefulFaces({ content }: { content: LandingContent["faces"] }) {
  const [activePet, setActivePet] = useState<PetCard | null>(null);
  return (
    <section id="faces" className="snap-start relative overflow-hidden bg-[linear-gradient(180deg,#fff4e8_0%,#f7ebdf_55%,#f1e0d2_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffe3c5_0%,transparent_60%)] opacity-70" aria-hidden />
      <div className="section-shell relative z-10 flex flex-col gap-14 py-28 text-[#2f2118]">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex w-fit items-center rounded-full border border-[rgba(208,178,148,0.45)] bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#7d5a42]">
            {content.eyebrow}
          </span>
          <h2 className="heading-xl">{content.title}</h2>
          <p className="text-base text-[#5a3f2d]">{content.copy}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((pet, index) => (
            <button
              key={pet.id}
              type="button"
              className={`group relative overflow-hidden rounded-[2rem] border border-[rgba(208,178,148,0.4)] bg-[rgba(255,248,241,0.92)] text-left transition hover:border-[#ff7a00]/70 ${index % 5 === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}`}
              onClick={() => setActivePet(pet)}
            >
              <span className="absolute right-4 top-4 rounded-full border border-[rgba(255,170,120,0.6)] bg-white px-3 py-1 text-[0.65rem] uppercase tracking-[0.32em] text-[#ff7a00]">
                {pet.badge}
              </span>
              <Image src={pet.image} alt={pet.name} width={520} height={520} className="h-64 w-full object-cover opacity-95 transition duration-500 group-hover:scale-105" />
              <div className="space-y-2 px-5 pb-6 pt-5">
                <h3 className="text-lg font-semibold text-[#2f2118]">{pet.name}</h3>
                <p className="text-xs uppercase tracking-[0.32em] text-[#7d5a42]">{pet.age} • {pet.personality}</p>
                <p className="text-sm text-[#5a3f2d]">{pet.shortStory}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#ff7a00]">
                  Yolculuğunu Gör →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <SponsorshipModal pet={activePet} onClose={() => setActivePet(null)} />
    </section>
  );
}

function SponsorshipModal({ pet, onClose }: { pet: PetCard | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {pet && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(255,237,220,0.78)] backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            className="glass-card relative max-w-lg rounded-[2.6rem] border border-[rgba(208,178,148,0.45)] bg-white px-8 py-9 text-[#2f2118]"
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-6 top-6 text-[#7d5a42] transition hover:text-[#2f2118]"
              onClick={onClose}
              aria-label="Kapat"
            >
              ×
            </button>
            <h3 className="heading-md text-[#2f2118]">{pet.name} için destek olun</h3>
            <p className="mt-3 text-sm text-[#5a3f2d]">{pet.shortStory}</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-[rgba(208,178,148,0.4)] bg-[#fff6ec] px-5 py-3">
                <p className="text-sm font-semibold text-[#2f2118]">Aylık €{pet.sponsor.monthly}</p>
                <p className="text-xs text-[#7d5a42]">{pet.sponsor.impact}</p>
              </div>
              <div className="rounded-2xl border border-[rgba(208,178,148,0.35)] bg-[#fff1e2] px-5 py-3">
                <p className="text-sm font-semibold text-[#2f2118]">Tek seferlik €{pet.sponsor.oneOff}</p>
                <p className="text-xs text-[#7d5a42]">Uçuş fonuna katkı • Fatura e-posta ile gönderilir</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton href={CTA_DONATE} onHover={() => trackEvent("cta_click_primary", { surface: "sponsor-modal", pet: pet.id })}>
                Sponsor Ol
              </MagneticButton>
              <a
                href="mailto:adoptions@angelshaven.org"
                className="cta-muted inline-flex items-center gap-2 rounded-full border border-[rgba(208,178,148,0.45)] bg-white/80 px-6 py-3 text-xs uppercase tracking-[0.32em] text-[#5a3f2d] transition hover:border-[#ff7a00] hover:text-[#2f2118]"
                onClick={() => trackEvent("cta_click_secondary", { surface: "sponsor-modal", pet: pet.id })}
              >
                Ailesi Ol
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ImpactVisual({ media, microcopy }: { media: MediaAsset; microcopy: ImpactMicrocopy[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="impact-visual relative flex flex-col gap-6 rounded-[2.8rem] border border-white/20 bg-white/12 p-6 text-white shadow-[0_32px_120px_rgba(0,0,0,0.32)] backdrop-blur-xl">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-[#fdeede]/85">
        <span>Etki Simülatörü</span>
        <span className="inline-flex items-center gap-2 text-[0.7rem]">
          <span className="inline-flex h-2 w-2 animate-ping rounded-full bg-[#ffb15d]" aria-hidden />
          Canlı
        </span>
      </div>
      <SmartVideo
        media={media}
        prefersReducedMotion={prefersReducedMotion}
        className="relative h-[320px] w-full overflow-hidden rounded-[2.4rem] border border-white/20"
        overlay={false}
      />
      <div className="grid gap-3">
        {microcopy.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-2xl border border-white/18 bg-white/12 px-4 py-3 text-sm text-[#fdeede]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-base font-semibold text-white">
              {item.id}
            </span>
            <p className="text-sm text-[#fdeede]">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[0.7rem] uppercase tracking-[0.32em] text-[#fdeede]">
        <LottieBadge path="/lottie/heart-pulse.json" className="h-8 w-8 drop-shadow-[0_0_18px_rgba(255,153,71,0.55)]" />
        Bağışın anında izlenir
      </div>
    </div>
  );
}

function DonationFlow({ content }: { content: LandingContent["donation"] }) {
  type Step = 1 | 2 | 3 | 4;
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState<number>(content.options[1]?.amount ?? 29);
  const [coverFee, setCoverFee] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const total = useMemo(() => (coverFee ? Math.round(amount * 1.029 + 0.3) : amount), [amount, coverFee]);

  return (
    <section
      id="donation"
      className="snap-start relative overflow-hidden bg-[linear-gradient(180deg,#2b1b13_0%,#3c2318_46%,#2a1a12_100%)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,170,110,0.28),transparent_62%)]" aria-hidden />
      <div className="section-shell relative z-10 grid gap-12 py-32 text-white lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[#fdeede]">
            {content.eyebrow}
          </span>
          <h2 className="heading-xl max-w-md text-white">{content.title}</h2>
          <p className="max-w-md text-sm text-[#f8dbc0]">{content.copy}</p>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#ffb15d]">{content.highlight}</p>
          <ImpactVisual media={content.media} microcopy={content.microcopy} />
        </div>
        <div className="glass-card relative flex flex-col gap-5 rounded-[2.6rem] border border-white/18 bg-white/92 p-6 text-[#2f2118] shadow-[0_28px_110px_rgba(0,0,0,0.25)]">
          <div className="absolute -top-10 right-8 hidden h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/90 text-[#ff7a00] shadow-[0_24px_60px_rgba(0,0,0,0.2)] lg:flex">
            €{amount}
          </div>
          <div className="relative h-1.5 w-full rounded-full bg-[rgba(255,170,110,0.25)]">
            <div className="h-full rounded-full bg-[#ff7a00]" style={{ width: `${(step / 4) * 100}%` }} />
            <span className="absolute right-0 top-3 text-xs text-[#7d5a42]">Adım {step}/4</span>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2f2118]">Miktarını seç</h3>
              <div className="grid gap-2 sm:grid-cols-3">
                {content.options.map((option) => {
                  const isActive = option.amount === amount;
                  return (
                    <button
                      key={option.amount}
                      type="button"
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        isActive
                          ? "border-[#ff7a00] bg-[#ff7a00]/12 text-[#2f2118] shadow-[0_12px_30px_rgba(255,122,0,0.22)]"
                          : "border-[rgba(208,178,148,0.45)] bg-white/70 text-[#5a3f2d] hover:border-[#ff7a00] hover:text-[#2f2118]"
                      }`}
                      onClick={() => {
                        setAmount(option.amount);
                        trackEvent("donation_amount_select", { amount: option.amount, surface: "wizard" });
                      }}
                    >
                      <span className="text-lg font-semibold text-[#2f2118]">€{option.amount}</span>
                      <p className="text-xs text-[#7d5a42]">{option.label}</p>
                    </button>
                  );
                })}
              </div>
              <label className="flex items-center gap-2 text-xs text-[#6b4e3c]">
                <input type="checkbox" checked={coverFee} onChange={() => setCoverFee((prev) => !prev)} className="h-4 w-4 rounded border-white/30 bg-transparent" />
                {content.feesLabel}
              </label>
              <button
                type="button"
                className="cta-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
                onClick={() => setStep(2)}
              >
                Devam et →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2f2118]">Seni nasıl hitap edelim?</h3>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-xs uppercase tracking-[0.28em] text-[#7d5a42]">Adınız</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  className="rounded-2xl border border-[rgba(208,178,148,0.45)] bg-[#fff6ed] px-4 py-3 text-sm text-[#2f2118] outline-none focus:border-[#ff7a00]"
                  placeholder="Adınızı yazın"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-xs uppercase tracking-[0.28em] text-[#7d5a42]">E-posta</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  className="rounded-2xl border border-[rgba(208,178,148,0.45)] bg-[#fff6ed] px-4 py-3 text-sm text-[#2f2118] outline-none focus:border-[#ff7a00]"
                  placeholder="turuncu@angelshaven.org"
                />
              </label>
              <div className="flex flex-wrap gap-3 pt-2">
                <button type="button" className="cta-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold" onClick={() => setStep(3)}>
                  Ödeme adımına geç
                </button>
                <button type="button" className="cta-muted inline-flex items-center justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#5a3f2d]" onClick={() => setStep(1)}>
                  Geri dön
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2f2118]">Ödeme yöntemini seç</h3>
              <p className="text-sm text-[#7d5a42]">Toplam tutar: <span className="font-semibold text-[#2f2118]">€{total}</span></p>
              <div className="grid gap-2">
                {content.payments.map((payment) => (
                  <button
                    key={payment}
                    type="button"
                    className="flex items-center justify-between rounded-2xl border border-[rgba(208,178,148,0.45)] bg-[#fff6ed] px-5 py-3 text-sm text-[#5a3f2d] transition hover:border-[#ff7a00] hover:text-[#2f2118]"
                    onClick={() => {
                      trackEvent("donation_payment_select", { method: payment });
                      setStep(4);
                    }}
                  >
                    <span>{payment}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-[#7d5a42]">Tek tık</span>
                  </button>
                ))}
              </div>
              <button type="button" className="cta-muted inline-flex items-center justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#5a3f2d]" onClick={() => setStep(2)}>
                Geri dön
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#ff7a00]/20 text-2xl">♥</div>
              <h3 className="text-xl font-semibold text-[#2f2118]">Teşekkürler!</h3>
              <p className="text-sm text-[#5a3f2d]">Bu akşam {amount === 29 ? "bir" : "birkaç"} pati daha tok uyuyacak. Paylaşıp etkini ikiye katlamak ister misin?</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://api.whatsapp.com/send?text=Angel%20Haven%27da%20bir%20hikayeyi%20de%C4%9Fi%C5%9Ftirdim.%20Sen%20de%20destek%20ol%3A%20https%3A%2F%2Fangelshaven.org" className="cta-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold" target="_blank">
                  WhatsApp&apos;ta paylaş
                </a>
                <button type="button" className="cta-muted inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#5a3f2d]" onClick={() => setStep(1)}>
                  Yeni bağış başlat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({ media }: { media: StoryItem["media"] }) {
  const [position, setPosition] = useState(52);
  return (
    <div className="relative overflow-hidden rounded-[1.9rem] border border-[rgba(208,178,148,0.35)] bg-white/90">
      <Image src={media.after.poster} alt={media.after.alt} width={720} height={520} className="h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image src={media.before.poster} alt={media.before.alt} width={720} height={520} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#ffe9d0]/65 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#5a3f2d]">
        Önce
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onInput={(event) => setPosition(Number((event.target as HTMLInputElement).value))}
          className="h-[2px] w-[60%] appearance-none rounded-full bg-white/30"
        />
        Sonra
      </div>
    </div>
  );
}

function RescueStories({ content, prefersReducedMotion }: { content: LandingContent["stories"]; prefersReducedMotion: boolean }) {
  return (
    <section id="stories" className="snap-start bg-[linear-gradient(180deg,#fff1e2_0%,#f7e7d9_55%,#f1dbcc_100%)]">
      <div className="section-shell grid gap-12 py-28">
        <div className="max-w-3xl space-y-4 text-[#2f2118]">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#7d5a42]">{content.eyebrow}</span>
          <h2 className="heading-xl text-[#2f2118]">{content.title}</h2>
          <p className="text-base text-[#5a3f2d]">{content.copy}</p>
        </div>
        <div className="grid gap-7 md:grid-cols-2">
          {content.stories.map((story, index) => (
            <motion.article
              key={story.id}
              className="glass-card flex h-full flex-col justify-between gap-6 rounded-[2.2rem] border border-[rgba(208,178,148,0.4)] bg-white/88 p-6 text-[#2f2118]"
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
            >
              <BeforeAfter media={story.media} />
              <div className="space-y-4">
                <div>
                  <h3 className="heading-sm text-[#2f2118]">{story.title}</h3>
                  <p className="mt-2 text-sm text-[#5a3f2d]">{story.copy}</p>
                </div>
                {story.media.clip && (
                  <SmartVideo media={story.media.clip} prefersReducedMotion={prefersReducedMotion} />
                )}
                <p className="text-xs uppercase tracking-[0.32em] text-[#7d5a42]">{story.stat}</p>
              </div>
              <a
                href={CTA_DONATE}
                className="cta-muted inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#5a3f2d]"
                onClick={() => trackEvent("cta_click_primary", { surface: "stories", id: story.id })}
              >
                Daha fazla hikâye fonla
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunitySpotlight({ content }: { content: LandingContent["community"] }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="community"
      className="snap-start relative overflow-hidden bg-[linear-gradient(180deg,#23140d_0%,#2d1b12_48%,#1c120c_100%)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,180,120,0.28),transparent_62%)]" aria-hidden />
      <div className="section-shell relative z-10 grid gap-12 py-32 text-white xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[#fdeede]">
            <LottieBadge path="/lottie/heart-pulse.json" className="h-8 w-8 drop-shadow-[0_0_18px_rgba(255,153,71,0.55)]" />
            {content.eyebrow}
          </span>
          <h2 className="heading-xl max-w-sm text-white">{content.title}</h2>
          <p className="max-w-sm text-sm text-[#f8dbc0]">{content.copy}</p>
          <SmartVideo
            media={content.media}
            prefersReducedMotion={prefersReducedMotion}
            className="relative h-[260px] w-full overflow-hidden rounded-[2.4rem] border border-white/18"
            overlay={false}
          />
          <div className="space-y-3">
            {content.metrics.map((metric) => (
              <div key={metric.id} className="flex items-center justify-between rounded-2xl border border-white/18 bg-white/12 px-5 py-3 text-sm text-[#fdeede]">
                <div>
                  <p className="text-base font-semibold text-white">{metric.value}</p>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#fdeede]/80">{metric.label}</span>
                </div>
                <span className="text-xs text-[#f8dbc0]">{metric.caption}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {content.posts.map((post, index) => (
            <motion.article
              key={post.id}
              className="relative flex flex-col gap-4 rounded-[2rem] border border-white/18 bg-white/10 p-5 text-left text-[#fceedd] shadow-[0_32px_110px_rgba(0,0,0,0.28)] backdrop-blur-xl"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
              whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.01 }}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#fdeede]/80">
                <span>{post.author}</span>
                <span>{post.location}</span>
              </div>
              <Image src={post.image} alt={post.author} width={560} height={360} className="h-40 w-full rounded-[1.6rem] object-cover" />
              <p className="text-sm leading-relaxed text-[#f8dbc0]">“{post.quote}”</p>
            </motion.article>
          ))}

          <div className="rounded-[2rem] border border-white/18 bg-white/10 p-6 text-[#fdeede] shadow-[0_32px_110px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:col-span-2">
            <h3 className="text-lg font-semibold text-white">Partner Klinikler & Sponsorlar</h3>
            <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.28em] text-[#fdeede]/80">
              {content.partners.map((partner) => (
                <span key={partner.id} className="rounded-full border border-white/18 bg-white/10 px-4 py-2">
                  {partner.label}
                </span>
              ))}
            </div>
            <div className="mt-6 grid gap-2 text-sm text-[#f8dbc0] md:grid-cols-3">
              {content.transparency.map((item) => (
                <div key={item.id} className="flex flex-col gap-1 rounded-2xl border border-white/12 bg-white/8 px-4 py-3">
                  <span className="text-xs uppercase tracking-[0.28em] text-[#fdeede]/70">{item.label}</span>
                  <span className="text-base font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
            <a
              href="/transparency"
              className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[#ffb15d]"
              onClick={() => trackEvent("cta_click_secondary", { surface: "transparency" })}
            >
              Tüm raporları incele →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ content }: { content: LandingContent["final"] }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(content.primaryCta.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="share" className="snap-start relative flex min-h-[100dvh] items-center overflow-hidden bg-[linear-gradient(180deg,#fff2e3_0%,#f8e8da_60%,#f1dccd_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffe0c2_0%,transparent_62%)] opacity-55" aria-hidden />
      <div className="section-shell relative z-10 grid gap-10 py-28 text-[#2f2118] lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[#5a3f2d]">
            {content.eyebrow}
          </span>
          <h2 className="heading-xl">{content.title}</h2>
          <p className="max-w-xl text-sm text-[#5a3f2d]">{content.copy}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <MagneticButton href={content.primaryCta.href} onHover={() => trackEvent("cta_click_primary", { surface: "final" })}>
              {content.primaryCta.label}
            </MagneticButton>
            <a href={content.secondaryCta.href} className="cta-muted inline-flex items-center justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#5a3f2d]">
              {content.secondaryCta.label}
            </a>
          </div>
        </div>
        <div className="glass-card flex flex-col gap-4 rounded-[2.4rem] border border-[rgba(208,178,148,0.4)] bg-white/90 p-6">
          <h3 className="text-lg font-semibold text-[#2f2118]">Paylaş, hayat kurtar</h3>
          <ul className="space-y-3 text-sm text-[#5a3f2d]">
            {content.shares.map((share) => (
              <li key={share.id}>
                <a
                  href={share.href}
                  target={share.id === 'copy' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/15 bg-[#fff6ed] px-5 py-3 text-[#5a3f2d] transition hover:border-white/40 hover:text-white"
                  onClick={(event) => {
                    if (share.id === 'copy') {
                      event.preventDefault();
                      onCopy();
                    } else {
                      trackEvent("cta_click_secondary", { surface: "share", id: share.id });
                    }
                  }}
                >
                  <span>{share.label}</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#7d5a42]">{share.description}</span>
                </a>
              </li>
            ))}
          </ul>
          {copied && <p className="text-xs text-[#ff9b38]">Bağlantı panoya kopyalandı!</p>}
        </div>
      </div>
    </section>
  );
}

function Footer({ content }: { content: LandingContent["footer"] }) {
  return (
    <footer className="border-t border-white/10 bg-[#070c10] py-12 text-[#6b4e3c]">
      <div className="section-shell grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,280px)]">
        <div className="space-y-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sm font-semibold text-[#2f2118]">AH</span>
          <p className="text-sm">{content.registration}</p>
          <p className="text-sm">{content.address}</p>
          <p className="text-sm">{content.email}</p>
          <p className="text-sm">{content.phone}</p>
        </div>
        <div className="space-y-2 text-xs uppercase tracking-[0.32em] text-[#b38e74]">
          <span>Topluluk</span>
          <div className="flex flex-wrap gap-3">
            {content.socials.map((social) => (
              <a key={social.label} href={social.href} className="rounded-full border border-white/20 px-3 py-1 text-[#5a3f2d] transition hover:border-white/40 hover:text-white">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function Landing({ content }: { content: LandingContent }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  usePointerShift(prefersReducedMotion);
  useSmoothScroll(prefersReducedMotion);

  return (
    <main className="relative flex min-h-screen snap-y snap-mandatory flex-col text-white">
      <Hero content={content.hero} prefersReducedMotion={prefersReducedMotion} />
      <RescueJourney content={content.journey} prefersReducedMotion={prefersReducedMotion} />
      <HopefulFaces content={content.faces} />
      <DonationFlow content={content.donation} />
      <RescueStories content={content.stories} prefersReducedMotion={prefersReducedMotion} />
      <CommunitySpotlight content={content.community} />
      <FinalCTA content={content.final} />
      <Footer content={content.footer} />
    </main>
  );
}

const landingContent: LandingContent = {
  hero: {
    eyebrow: "Sahne 0 • Empati",
    headline: "Angels Haven Dijital Sığınağı",
    subheadline: "Bir bakışta merhamet, bir sonraki nefeste umut.",
    description: "Fethiye'nin rüzgârından Avrupa'daki kanepelere uzanan kurtarma yolculuğu parmaklarının ucunda. Her kaydırma yeni bir hikâyeyi hayata döndürür.",
    primaryCta: { label: "Bir Hikayeyi Değiştir", href: CTA_DONATE },
    secondaryCta: { label: "Bir Kase Mama Gönder", href: CTA_DONATE },
    media: {
      poster: "/images/hero-poster.avif",
      video: "/videos/hero-shelter.mp4",
      alt: "Kurtarılmış köpekler koşarken",
    },
    stat: {
      label: "Son 30 günde kurtarılan can",
      value: 64,
      suffix: "+",
    },
    progress: {
      label: "Acil mama fonu",
      caption: "€9.600 hedefinin %72'si tamamlandı. Son 3 kasa uçuş için destek bekliyor.",
      percent: 72,
    },
    donationOptions: [
      { amount: 5, label: "Bir günlük mama" },
      { amount: 29, label: "Bir haftalık bakım" },
      { amount: 45, label: "Uçuş sandığı" },
    ],
    ticker: {
      headline: "Topluluk Etkin",
      entries: [
        { id: "t1", donor: "Selin", amount: 29, city: "Berlin", minutesAgo: 3, method: "Apple Pay" },
        { id: "t2", donor: "Max", amount: 45, city: "Amsterdam", minutesAgo: 7, method: "iDEAL" },
        { id: "t3", donor: "Emma", amount: 12, city: "London", minutesAgo: 9, method: "PayPal" },
        { id: "t4", donor: "Lukas", amount: 5, city: "Munich", minutesAgo: 11, method: "SEPA" },
        { id: "t5", donor: "Chloé", amount: 29, city: "Paris", minutesAgo: 16, method: "Apple Pay" },
        { id: "t6", donor: "Ekin", amount: 75, city: "Istanbul", minutesAgo: 20, method: "Kart" },
      ],
    },
  },
  journey: {
    intro: {
      eyebrow: "Sahne 1 • Umut",
      title: "Kurtarma döngüsü dört duygusal vuruştan oluşur",
      copy: "Kaydırdıkça ihbar anından sıcak yuvaya uzanan duygusal yay sana rehberlik eder.",
    },
    scenes: [
      {
        id: "scene-arrival",
        badge: "1. Varış",
        title: "Fethiye'de bir çağrı",
        copy: "Yerel gönüllülerimiz gece yarısı yaralı bir köpek ihbarı aldığında zaman durur. İlk adım: göz teması kurup güven vermek.",
        media: { poster: "/images/hero-rescue.png", video: "/videos/hero-pack.mp4", alt: "Gönüllüler yaralı köpeği kucaklıyor" },
      },
      {
        id: "scene-care",
        badge: "2. Müdahale",
        title: "Sahada ilk yardım",
        copy: "Altı saat içinde veteriner destek ekibi ulaşıyor. Mama, serum, pansuman… Tümü bağışçılarımız sayesinde hazır.",
        media: { poster: "/images/step-impact.avif", video: "/videos/step-impact.mp4", alt: "Veteriner müdahalesi" },
      },
      {
        id: "scene-rehab",
        badge: "3. İyileşme",
        title: "Rehabilitasyon ve sosyalizasyon",
        copy: "Tedavi sonrası oyun seansları ve güven yeniden inşası. Empatiyi umutla bağlayan kritik aşama.",
        media: { poster: "/images/step-choose.avif", video: "/videos/step-choose.mp4", alt: "Sahada oyun zamanı" },
      },
      {
        id: "scene-home",
        badge: "4. Yeni başlangıç",
        title: "Havalimanından yeni ailesine",
        copy: "Uçuş kasasına giren her pati, topluluğumuzun başarısıdır. Uçuş takibi, adaptasyon ve takip ekibimizle devam eder.",
        media: { poster: "/images/step-pay.avif", video: "/videos/step-pay.mp4", alt: "Yeni ailesine kavuşan köpek" },
      },
    ],
  },
  faces: {
    eyebrow: "Sahne 2 • Bağlantı",
    title: "Umut Dolu Yüzler: Sponsor ol, ailesi ol",
    copy: "Her kart, güneş ışığına dönen bir bakış. Haftalık bento ızgarasında sıcak portreler, sarıldıkları battaniyeler ve bekledikleri kanepelerle buluş.",
    cards: [
      {
        id: "luna",
        name: "Luna",
        age: "2 yaş",
        personality: "Nazik ruh",
        shortStory: "Kaş sahilinde bulundu. Sessiz öğleden sonraları sever, çocuklarla uyumlu.",
        image: "/images/story-mila.avif",
        badge: "Hazır • 4 Ekim",
        sponsor: { monthly: 29, oneOff: 110, impact: "Aylık mama + vitamin + kum" },
      },
      {
        id: "atlas",
        name: "Atlas",
        age: "18 ay",
        personality: "Enerjik",
        shortStory: "İzmir sanayi bölgesinden kurtarıldı. Agility parkurlarına bayılıyor.",
        image: "/images/story-duman.avif",
        badge: "Escort arıyor",
        sponsor: { monthly: 35, oneOff: 150, impact: "Uçuş sandığı ve check-in ücretleri" },
      },
      {
        id: "maya",
        name: "Maya",
        age: "3 yaş",
        personality: "Sarılgan",
        shortStory: "Pazar yerinde terk edildi. İlk kez sıcak bir yatakta uyuyor.",
        image: "/images/story-after.png",
        badge: "Foster İstanbul",
        sponsor: { monthly: 25, oneOff: 90, impact: "Reçeteli mama + kontroller" },
      },
      {
        id: "sarp",
        name: "Sarp",
        age: "4 yaş",
        personality: "Koruyucu",
        shortStory: "Çiftlikte zincirli bulundu. Güven kazanmak için zamana ihtiyacı var.",
        image: "/images/story-before.png",
        badge: "Davranış programı",
        sponsor: { monthly: 32, oneOff: 120, impact: "Davranış terapisi" },
      },
      {
        id: "peri",
        name: "Peri",
        age: "7 ay",
        personality: "Oyuncu",
        shortStory: "Yavruları ile birlikte kurtarıldı. Avrupa'da aile arıyor.",
        image: "/images/story-mila.avif",
        badge: "Yavru programı",
        sponsor: { monthly: 19, oneOff: 70, impact: "Aşı + kısırlaştırma" },
      },
      {
        id: "poyraz",
        name: "Poyraz",
        age: "5 yaş",
        personality: "Sadık",
        shortStory: "Bir restoranın arka bahçesinde yıllarca yaşadı. Şimdi yumuşak yataklardan ayrılmak istemiyor.",
        image: "/images/story-duman.avif",
        badge: "Yeni pasaport",
        sponsor: { monthly: 28, oneOff: 130, impact: "Pasaport + mikroçip" },
      },
      {
        id: "iris",
        name: "İris",
        age: "1,5 yaş",
        personality: "Meraklı",
        shortStory: "Fethiye çöplüğünden kurtarıldı. Tasmaya alışma sürecinde.",
        image: "/images/story-after.png",
        badge: "Rehber aile",
        sponsor: { monthly: 24, oneOff: 95, impact: "Tasma eğitimi + mama" },
      },
      {
        id: "milo",
        name: "Milo",
        age: "11 ay",
        personality: "Sıcakkanlı",
        shortStory: "Göcek'te tek başına dolaşıyordu. Çocuklarla harika anlaşıyor.",
        image: "/images/story-mila.avif",
        badge: "Foster Londra",
        sponsor: { monthly: 27, oneOff: 105, impact: "Uçuş bileti katkısı" },
      },
      {
        id: "asya",
        name: "Asya",
        age: "3 yaş",
        personality: "Zeki",
        shortStory: "Eğitim çiftliğinden transfer edildi. Komutları hızla öğreniyor.",
        image: "/images/story-before.png",
        badge: "Eğitim kampı",
        sponsor: { monthly: 31, oneOff: 140, impact: "Clicker eğitimi" },
      },
      {
        id: "yamo",
        name: "Yamo",
        age: "9 ay",
        personality: "Neşeli",
        shortStory: "Dalyan sazlığında bulundu. Suya atlamayı seviyor.",
        image: "/images/story-duman.avif",
        badge: "Yurt dışı hazır",
        sponsor: { monthly: 30, oneOff: 125, impact: "Veteriner kontrolleri" },
      },
    ],
  },
  donation: {
    eyebrow: "Sahne 3 • Güçlenme",
    title: "Sizin desteğiniz, onların hikayesi",
    copy: "Apple Pay veya Google Pay ile 30 saniyeden kısa sürede tamamlanan, etkiyi aynı anda gösteren bağış akışı.",
    highlight: "€29 = bir haftalık mama + sıcak yatak",
    options: [
      { amount: 5, label: "Bir kâse mama", impact: "Bir günlük besleyici öğün" },
      { amount: 29, label: "Bir haftalık bakım", impact: "Mama + vitamin + pansuman" },
      { amount: 45, label: "Uçuş sandığı", impact: "DEFRA onaylı uçuş kasası" },
    ],
    microcopy: [
      { id: "01", label: "Apple Pay ile ortalama 12 saniyede tamamlanır." },
      { id: "02", label: "Stripe Radar + SSL 256-bit ile güvence altındadır." },
      { id: "03", label: "İşlem ücretini üstlenen bağışçılar geliri %14 artırıyor." },
    ],
    feesLabel: "İşlem ücretini üstlen (%2.9 + €0.30)",
    payments: ["Apple Pay", "Google Pay", "Stripe Kart", "PayPal", "SEPA / iDEAL"],
    secureBadges: ["SSL 256-bit", "GDPR", "PCI-DSS"],
    media: {
      poster: "/images/step-impact.avif",
      video: "/videos/step-impact.mp4",
      alt: "Mama kabı bağışla doluyor",
    },
  },
  stories: {
    eyebrow: "Sahne 4 • Aidiyet",
    title: "Dayanıklılık hikâyeleri: Önce & Sonra",
    copy: "Önce-sessiz ürkek bakışlar, sonra güneşle ısınan yüzler. Tanıklık videoları ve yumuşak geçişler, bağışını bir topluluk ritüeline dönüştürüyor.",
    stories: [
      {
        id: "mila",
        title: "Mila • Fethiye kumsalından Londra koltuğuna",
        copy: "24 saat içinde ameliyat, 21 gün rehabilitasyon. Destekçilerimiz sayesinde artık sıcak bir evde.",
        stat: "Gün 21 • Uçuş ayarlandı",
        media: {
          before: { poster: "/images/story-before.png", alt: "Mila kurtarma öncesi" },
          after: { poster: "/images/story-mila.avif", alt: "Mila yeni yuvasında" },
          clip: { poster: "/images/story-mila.avif", video: "/videos/story-mila.mp4", alt: "Mila videosu" },
        },
      },
      {
        id: "duman",
        title: "Duman • Antalya otoyolundan Brighton parkına",
        copy: "Topluluk fonu acil ameliyatı karşıladı. Şimdi her sabah koşu partneri.",
        stat: "Gün 28 • Kalıcı aile onaylandı",
        media: {
          before: { poster: "/images/story-before.png", alt: "Duman kurtarma öncesi" },
          after: { poster: "/images/story-duman.avif", alt: "Duman koşarken" },
          clip: { poster: "/images/story-duman.avif", video: "/videos/story-duman.mp4", alt: "Duman videosu" },
        },
      },
    ],
  },
  community: {
    eyebrow: "Sahne 5 • Topluluk",
    title: "Mutlu Patiler duvarı",
    copy: "Facebook grubumuz ve #AngelsHavenAilesi etiketi; kahve kokulu mutfaklarda çekilen videoları, ilk park koşularını, teşekkür notlarını hayata döküyor.",
    media: {
      poster: "/images/story-mila.avif",
      video: "/videos/community-loop.mp4",
      alt: "Mutlu Patiler topluluğu",
    },
    posts: [
      {
        id: "post-1",
        author: "@londonfosters",
        location: "London, UK",
        quote: "Nova ilk kez şehrin parkını keşfetti. Destekleriniz olmasa mümkün olmazdı!",
        image: "/images/story-after.png",
      },
      {
        id: "post-2",
        author: "Selin & Atlas",
        location: "Berlin, DE",
        quote: "Atlas artık evimizin en hızlı koşucusu. Uçuş fonuna katkı veren herkese minnettarız.",
        image: "/images/story-duman.avif",
      },
      {
        id: "post-3",
        author: "Peri'nin Ailesi",
        location: "Amsterdam, NL",
        quote: "Peri'nin ilk mama kabı bağışlarınızla doldu. Şimdi sıra yeni oyuncaklarında!",
        image: "/images/story-mila.avif",
      },
      {
        id: "post-4",
        author: "Mutlu Patiler Grubu",
        location: "İzmir, TR",
        quote: "Bu hafta 3 yeni gönüllü katıldı. Hep birlikte daha güçlüyüz.",
        image: "/images/story-before.png",
      },
    ],
    partners: [
      { id: "vetlink", label: "VetLink" },
      { id: "nutri-paw", label: "NutriPaw" },
      { id: "istanbulvet", label: "Istanbul Vet" },
      { id: "petcargo", label: "PetCargo" },
      { id: "empatia", label: "Empatia Clinic" },
    ],
    transparency: [
      { id: "reg", label: "Dernek No", value: "34-204- AH" },
      { id: "audit", label: "Son denetim", value: "Ağustos 2025" },
      { id: "report", label: "Güncel rapor", value: "PDF" },
    ],
    metrics: [
      { id: "meals", label: "Mama porsiyonu", value: "1.842", caption: "Son 30 günde dağıtıldı." },
      { id: "adoptions", label: "Ev bulan can", value: "37", caption: "Bu çeyrekte aileye kavuştu." },
      { id: "volunteers", label: "Aktif gönüllü", value: "112", caption: "Haftalık rapor veren gönüllü sayısı." },
    ],
  },
  final: {
    eyebrow: "Sahne 6 • Paylaş",
    title: "Paylaş, hayat kurtar",
    copy: "Teşekkür mesajı, şefkat zincirinin başlangıcı. Tek dokunuşla WhatsApp'a, Instagram hikâyesine ya da e-postana taşı; yeni kahramanlar katılsın.",
    primaryCta: { label: "E-posta listesine katıl", href: "https://angelshaven.org/newsletter" },
    secondaryCta: { label: "Topluluk rehberini indir", href: "https://angelshaven.org/guide.pdf" },
    shares: [
      {
        id: "whatsapp",
        label: "WhatsApp mesajı",
        href: "https://api.whatsapp.com/send?text=Az%20%C3%B6nce%20Angels%20Haven'da%20bir%20hikayeyi%20de%C4%9Fi%C5%9Ftirdim.%20Sen%20de%20destek%20ol%3A%20https%3A%2F%2Fangelshaven.org",
        description: "Tek tık",
      },
      {
        id: "instagram",
        label: "Instagram hikâye paketi",
        href: "https://angelshaven.org/assets/instagram-pack.zip",
        description: "İndir",
      },
      {
        id: "copy",
        label: "Bağlantıyı kopyala",
        href: "https://angelshaven.org",
        description: "Clipboard",
      },
    ],
  },
  footer: {
    registration: "Angels Haven • Kayıtlı Yardım Kuruluşu • Vergi No: AH-934-2025",
    address: "Karagözler Mah. No:12, Fethiye / Muğla",
    email: "hello@angelshaven.org",
    phone: "+90 533 000 00 00",
    socials: [
      { label: "Instagram", href: "https://instagram.com/angelshaven" },
      { label: "Facebook Grubu", href: "https://www.facebook.com/groups/480707493946285" },
      { label: "TikTok", href: "https://tiktok.com/@angelshaven" },
      { label: "YouTube", href: "https://youtube.com/@angelshaven" },
    ],
  },
};

export default function Home() {
  return <Landing content={landingContent} />;
}
