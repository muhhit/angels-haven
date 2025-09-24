'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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

type DonationFlowContent = {
  eyebrow: string;
  title: string;
  copy: string;
  options: DonationOption[];
  feesLabel: string;
  payments: string[];
  secureBadges: string[];
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

function SmartVideo({ media, prefersReducedMotion }: { media: MediaAsset; prefersReducedMotion: boolean }) {
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

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-[1.8rem] border border-white/15 bg-[rgba(13,20,24,0.85)]">
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06090b] via-transparent to-transparent" />
    </div>
  );
}

function EndowedProgress() {
  return (
    <div className="relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-[rgba(10,18,26,0.75)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
      <span className="relative inline-flex h-3 w-3 items-center justify-center">
        <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#ff7a00]/60" aria-hidden="true" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-[#ff9b38]" />
      </span>
      Bahşedilmiş ilerleme aktif
    </div>
  );
}

function LiveDonationTicker({ ticker, prefersReducedMotion }: { ticker: HeroContent["ticker"]; prefersReducedMotion: boolean }) {
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

  return (
    <div className="glass-card flex flex-col gap-3 rounded-[2rem] border border-white/12 bg-white/8 px-5 py-4 text-white/85" aria-live="polite">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/55">
        <span>{ticker.headline}</span>
        <span className="inline-flex items-center gap-1 text-[0.65rem]">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[#ff7a00]" aria-hidden="true" />
          Live
        </span>
      </div>
      <ul className="flex flex-col gap-3 text-sm text-white/80">
        {entries.slice(0, 4).map((entry) => (
          <li key={entry.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white/6 px-3 py-2">
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-white">{entry.donor}</span>
              <span className="text-xs uppercase tracking-[0.24em] text-white/55">{entry.city} • {entry.method}</span>
            </div>
            <div className="flex flex-col items-end leading-tight">
              <span className="text-base font-semibold text-white">€{entry.amount}</span>
              <span className="text-xs text-white/55">{entry.minutesAgo} dk önce</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Hero({ content, prefersReducedMotion }: { content: LandingContent["hero"]; prefersReducedMotion: boolean }) {
  return (
    <section id="hero" className="relative flex min-h-[100dvh] flex-col justify-end bg-[#070c10]">
      <div className="absolute inset-0 overflow-hidden">
        <SmartVideo media={content.media} prefersReducedMotion={prefersReducedMotion} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgba(46,139,192,0.35),transparent_58%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,13,0.05)_0%,rgba(7,10,13,0.85)_62%,#070b0f_100%)]" />
      </div>
      <div className="section-shell relative z-10 flex flex-col gap-10 pb-24 pt-32 text-white">
        <div className="max-w-4xl space-y-5">
          <EndowedProgress />
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/65">
            {content.eyebrow}
          </span>
          <h1 className="display-hero text-white">{content.headline}</h1>
          <p className="text-base text-white/75">{content.subheadline}</p>
          <p className="max-w-2xl text-sm text-white/65">{content.description}</p>
          <div className="flex flex-wrap gap-3 pt-3">
            <MagneticButton
              href={content.primaryCta.href}
              onHover={() => trackEvent("cta_click_primary", { surface: "hero-primary" })}
            >
              {content.primaryCta.label}
            </MagneticButton>
            <a
              href={content.secondaryCta.href}
              className="cta-muted inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.32em] text-white/75 transition hover:border-white/45 hover:text-white"
              onClick={() => trackEvent("cta_click_secondary", { surface: "hero-secondary" })}
            >
              {content.secondaryCta.label}
            </a>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="glass-card flex flex-col gap-4 rounded-[2.4rem] border border-white/15 bg-[rgba(13,20,24,0.8)] p-6 text-white">
            <div>
              <span className="text-xs uppercase tracking-[0.32em] text-white/55">{content.stat.label}</span>
              <p className="mt-2 text-4xl font-semibold text-white">
                <AnimatedCounter value={content.stat.value} suffix={content.stat.suffix} />
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.donationOptions.map((option) => (
                <button
                  key={option.amount}
                  type="button"
                  className="inline-flex min-w-[88px] items-center justify-center rounded-full border border-white/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/75 transition hover:border-white/45 hover:text-white"
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
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/55">
                <span>{content.progress.label}</span>
                <span>{content.progress.percent}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/15">
                <div className="h-full rounded-full bg-[#ff7a00]" style={{ width: `${Math.min(100, content.progress.percent)}%` }} />
              </div>
              <p className="text-xs text-white/60">{content.progress.caption}</p>
            </div>
          </div>
          <LiveDonationTicker ticker={content.ticker} prefersReducedMotion={prefersReducedMotion} />
        </div>
      </div>
    </section>
  );
}

function RescueJourney({ content, prefersReducedMotion }: { content: LandingContent["journey"]; prefersReducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom+=40% center",
        pin: true,
        pinSpacing: true,
        scrub: 0.4,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="journey" className="snap-start bg-[#0c1319]">
      <div className="section-shell grid gap-12 py-28 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <div className="sticky top-24 space-y-5 text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">{content.intro.eyebrow}</span>
          <h2 className="heading-xl text-white">{content.intro.title}</h2>
          <p className="text-sm text-white/70">{content.intro.copy}</p>
        </div>
        <div ref={containerRef} className="flex flex-col gap-10">
          {content.scenes.map((scene, index) => (
            <motion.article
              key={scene.id}
              className="glass-card flex flex-col gap-5 rounded-[2.2rem] border border-white/12 bg-[rgba(13,20,24,0.85)] p-6 text-white"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/55">
                <span>{scene.badge}</span>
                <span>{index + 1}/4</span>
              </div>
              <SmartVideo media={scene.media} prefersReducedMotion={prefersReducedMotion} />
              <div className="space-y-3">
                <h3 className="heading-sm text-white">{scene.title}</h3>
                <p className="text-sm text-white/70">{scene.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HopefulFaces({ content }: { content: LandingContent["faces"] }) {
  const [activePet, setActivePet] = useState<PetCard | null>(null);
  return (
    <section id="faces" className="snap-start relative overflow-hidden bg-[#0b1117]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2e8bc0_0%,transparent_58%)] opacity-30" aria-hidden />
      <div className="section-shell relative z-10 flex flex-col gap-14 py-28 text-white">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            {content.eyebrow}
          </span>
          <h2 className="heading-xl">{content.title}</h2>
          <p className="text-base text-white/75">{content.copy}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((pet, index) => (
            <button
              key={pet.id}
              type="button"
              className={`group relative overflow-hidden rounded-[2rem] border border-white/15 bg-[rgba(12,18,24,0.7)] text-left transition hover:border-white/35 ${index % 5 === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}`}
              onClick={() => setActivePet(pet)}
            >
              <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.32em] text-white/70">
                {pet.badge}
              </span>
              <Image src={pet.image} alt={pet.name} width={520} height={520} className="h-64 w-full object-cover opacity-95 transition duration-500 group-hover:scale-105" />
              <div className="space-y-2 px-5 pb-6 pt-5">
                <h3 className="text-lg font-semibold text-white">{pet.name}</h3>
                <p className="text-xs uppercase tracking-[0.32em] text-white/55">{pet.age} • {pet.personality}</p>
                <p className="text-sm text-white/70">{pet.shortStory}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#ff9b38]">
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
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(6,10,12,0.78)] backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            className="glass-card relative max-w-lg rounded-[2.6rem] border border-white/15 bg-[rgba(13,20,24,0.92)] px-8 py-9 text-white"
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-6 top-6 text-white/60 transition hover:text-white"
              onClick={onClose}
              aria-label="Kapat"
            >
              ×
            </button>
            <h3 className="heading-md text-white">{pet.name} için destek olun</h3>
            <p className="mt-3 text-sm text-white/70">{pet.shortStory}</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/8 px-5 py-3">
                <p className="text-sm font-semibold text-white">Aylık €{pet.sponsor.monthly}</p>
                <p className="text-xs text-white/60">{pet.sponsor.impact}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 px-5 py-3">
                <p className="text-sm font-semibold text-white">Tek seferlik €{pet.sponsor.oneOff}</p>
                <p className="text-xs text-white/60">Uçuş fonuna katkı • Fatura e-posta ile gönderilir</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton href={CTA_DONATE} onHover={() => trackEvent("cta_click_primary", { surface: "sponsor-modal", pet: pet.id })}>
                Sponsor Ol
              </MagneticButton>
              <a
                href="mailto:adoptions@angelshaven.org"
                className="cta-muted inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.32em] text-white/75 transition hover:border-white/40 hover:text-white"
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

function DonationFlow({ content }: { content: LandingContent["donation"] }) {
  type Step = 1 | 2 | 3 | 4;
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState<number>(content.options[1]?.amount ?? 29);
  const [coverFee, setCoverFee] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const total = useMemo(() => (coverFee ? Math.round(amount * 1.029 + 0.3) : amount), [amount, coverFee]);

  return (
    <section id="donation" className="snap-start bg-[#0a1418]">
      <div className="section-shell grid gap-12 py-28 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="space-y-5 text-white">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            {content.eyebrow}
          </span>
          <h2 className="heading-xl text-white">{content.title}</h2>
          <p className="text-base text-white/75">{content.copy}</p>
          <ul className="space-y-2 text-sm text-white/60">
            {content.options.map((option) => (
              <li key={option.amount}>✓ {option.label} · {option.impact}</li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3 pt-4 text-xs uppercase tracking-[0.28em] text-white/55">
            {content.secureBadges.map((badge) => (
              <span key={badge} className="rounded-full border border-white/15 bg-white/10 px-3 py-1">{badge}</span>
            ))}
          </div>
        </div>
        <div className="glass-card flex flex-col gap-5 rounded-[2.6rem] border border-white/12 bg-[rgba(12,20,24,0.9)] p-6 text-white">
          <div className="relative h-1.5 w-full rounded-full bg-white/12">
            <div className="h-full rounded-full bg-[#ff7a00]" style={{ width: `${(step / 4) * 100}%` }} />
            <span className="absolute right-0 top-3 text-xs text-white/55">Adım {step}/4</span>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Miktarını seç</h3>
              <div className="grid gap-2 sm:grid-cols-3">
                {content.options.map((option) => {
                  const isActive = option.amount === amount;
                  return (
                    <button
                      key={option.amount}
                      type="button"
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${isActive ? 'border-[#ff7a00] bg-[#ff7a00]/15 text-white' : 'border-white/20 bg-white/5 text-white/75 hover:border-white/45 hover:text-white'}`}
                      onClick={() => {
                        setAmount(option.amount);
                        trackEvent("donation_amount_select", { amount: option.amount, surface: "wizard" });
                      }}
                    >
                      <span className="text-lg font-semibold text-white">€{option.amount}</span>
                      <p className="text-xs text-white/60">{option.label}</p>
                    </button>
                  );
                })}
              </div>
              <label className="flex items-center gap-2 text-xs text-white/65">
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
              <h3 className="text-lg font-semibold text-white">Seni nasıl hitap edelim?</h3>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-xs uppercase tracking-[0.28em] text-white/55">Adınız</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  className="rounded-2xl border border-white/18 bg-white/6 px-4 py-3 text-sm text-white outline-none focus:border-[#ff7a00]"
                  placeholder="Adınızı yazın"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-xs uppercase tracking-[0.28em] text-white/55">E-posta</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  className="rounded-2xl border border-white/18 bg-white/6 px-4 py-3 text-sm text-white outline-none focus:border-[#ff7a00]"
                  placeholder="turuncu@angelshaven.org"
                />
              </label>
              <div className="flex flex-wrap gap-3 pt-2">
                <button type="button" className="cta-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold" onClick={() => setStep(3)}>
                  Ödeme adımına geç
                </button>
                <button type="button" className="cta-muted inline-flex items-center justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] text-white/70" onClick={() => setStep(1)}>
                  Geri dön
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Ödeme yöntemini seç</h3>
              <p className="text-sm text-white/60">Toplam tutar: <span className="font-semibold text-white">€{total}</span></p>
              <div className="grid gap-2">
                {content.payments.map((payment) => (
                  <button
                    key={payment}
                    type="button"
                    className="flex items-center justify-between rounded-2xl border border-white/18 bg-white/6 px-5 py-3 text-sm text-white/75 transition hover:border-white/45 hover:text-white"
                    onClick={() => {
                      trackEvent("donation_payment_select", { method: payment });
                      setStep(4);
                    }}
                  >
                    <span>{payment}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-white/55">Tek tık</span>
                  </button>
                ))}
              </div>
              <button type="button" className="cta-muted inline-flex items-center justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] text-white/70" onClick={() => setStep(2)}>
                Geri dön
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#ff7a00]/20 text-2xl">♥</div>
              <h3 className="text-xl font-semibold text-white">Teşekkürler!</h3>
              <p className="text-sm text-white/70">Bu akşam {amount === 29 ? "bir" : "birkaç"} pati daha tok uyuyacak. Paylaşıp etkini ikiye katlamak ister misin?</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://api.whatsapp.com/send?text=Angel%20Haven%27da%20bir%20hikayeyi%20de%C4%9Fi%C5%9Ftirdim.%20Sen%20de%20destek%20ol%3A%20https%3A%2F%2Fangelshaven.org" className="cta-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold" target="_blank">
                  WhatsApp&apos;ta paylaş
                </a>
                <button type="button" className="cta-muted inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] text-white/70" onClick={() => setStep(1)}>
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
    <div className="relative overflow-hidden rounded-[1.9rem] border border-white/12 bg-[rgba(12,18,24,0.85)]">
      <Image src={media.after.poster} alt={media.after.alt} width={720} height={520} className="h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image src={media.before.poster} alt={media.before.alt} width={720} height={520} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-black/0" />
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
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
    <section id="stories" className="snap-start bg-[#0d1519]">
      <div className="section-shell grid gap-12 py-28">
        <div className="max-w-3xl space-y-4 text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">{content.eyebrow}</span>
          <h2 className="heading-xl text-white">{content.title}</h2>
          <p className="text-base text-white/75">{content.copy}</p>
        </div>
        <div className="grid gap-7 md:grid-cols-2">
          {content.stories.map((story, index) => (
            <motion.article
              key={story.id}
              className="glass-card flex h-full flex-col justify-between gap-6 rounded-[2.2rem] border border-white/12 bg-[rgba(13,20,24,0.85)] p-6 text-white"
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
            >
              <BeforeAfter media={story.media} />
              <div className="space-y-4">
                <div>
                  <h3 className="heading-sm">{story.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{story.copy}</p>
                </div>
                {story.media.clip && (
                  <SmartVideo media={story.media.clip} prefersReducedMotion={prefersReducedMotion} />
                )}
                <p className="text-xs uppercase tracking-[0.32em] text-white/55">{story.stat}</p>
              </div>
              <a
                href={CTA_DONATE}
                className="cta-muted inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/75"
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
  return (
    <section id="community" className="snap-start bg-[#0a1116]">
      <div className="section-shell flex flex-col gap-12 py-28 text-white">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            {content.eyebrow}
          </span>
          <h2 className="heading-xl">{content.title}</h2>
          <p className="text-base text-white/75">{content.copy}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
          <div className="grid gap-4 md:grid-cols-2">
            {content.posts.map((post) => (
              <article key={post.id} className="glass-card flex flex-col gap-4 rounded-[2rem] border border-white/12 bg-[rgba(13,20,24,0.85)] p-5">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/55">
                  <span>{post.author}</span>
                  <span>{post.location}</span>
                </div>
                <Image src={post.image} alt={post.author} width={560} height={360} className="h-40 w-full rounded-[1.6rem] object-cover" />
                <p className="text-sm text-white/70">“{post.quote}”</p>
              </article>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            <div className="glass-card space-y-4 rounded-[2rem] border border-white/12 bg-[rgba(13,20,24,0.85)] p-5">
              <h3 className="text-lg font-semibold text-white">Anlık Etki Sayaçları</h3>
              <ul className="space-y-3 text-sm text-white/65">
                {content.metrics.map((metric) => (
                  <li key={metric.id}>
                    <span className="text-base font-semibold text-white">{metric.value}</span>
                    <span className="block text-xs uppercase tracking-[0.3em] text-white/55">{metric.label}</span>
                    <p className="text-xs text-white/55">{metric.caption}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card space-y-4 rounded-[2rem] border border-white/12 bg-[rgba(13,20,24,0.85)] p-5">
              <h3 className="text-lg font-semibold text-white">Partner Klinikler & Sponsorlar</h3>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.28em] text-white/60">
                {content.partners.map((partner) => (
                  <span key={partner.id} className="rounded-full border border-white/15 bg-white/10 px-4 py-2">{partner.label}</span>
                ))}
              </div>
            </div>
            <div className="glass-card space-y-3 rounded-[2rem] border border-white/12 bg-[rgba(13,20,24,0.85)] p-5 text-sm text-white/70">
              <h3 className="text-lg font-semibold text-white">Şeffaflık Kayıtları</h3>
              <ul className="space-y-2">
                {content.transparency.map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-white/55">{item.value}</span>
                  </li>
                ))}
              </ul>
              <a href="/transparency" className="text-xs uppercase tracking-[0.3em] text-[#ff9b38]" onClick={() => trackEvent("cta_click_secondary", { surface: "transparency" })}>
                Tüm raporları incele →
              </a>
            </div>
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
    <section id="share" className="snap-start relative flex min-h-[100dvh] items-center overflow-hidden bg-[#081015]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2e8bc0_0%,transparent_62%)] opacity-25" aria-hidden />
      <div className="section-shell relative z-10 grid gap-10 py-28 text-white lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
            {content.eyebrow}
          </span>
          <h2 className="heading-xl">{content.title}</h2>
          <p className="max-w-xl text-sm text-white/75">{content.copy}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <MagneticButton href={content.primaryCta.href} onHover={() => trackEvent("cta_click_primary", { surface: "final" })}>
              {content.primaryCta.label}
            </MagneticButton>
            <a href={content.secondaryCta.href} className="cta-muted inline-flex items-center justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] text-white/75">
              {content.secondaryCta.label}
            </a>
          </div>
        </div>
        <div className="glass-card flex flex-col gap-4 rounded-[2.4rem] border border-white/15 bg-[rgba(13,20,24,0.85)] p-6">
          <h3 className="text-lg font-semibold text-white">Paylaş, hayat kurtar</h3>
          <ul className="space-y-3 text-sm text-white/70">
            {content.shares.map((share) => (
              <li key={share.id}>
                <a
                  href={share.href}
                  target={share.id === 'copy' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/6 px-5 py-3 text-white/75 transition hover:border-white/40 hover:text-white"
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
                  <span className="text-xs uppercase tracking-[0.3em] text-white/55">{share.description}</span>
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
    <footer className="border-t border-white/10 bg-[#070c10] py-12 text-white/65">
      <div className="section-shell grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,280px)]">
        <div className="space-y-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sm font-semibold text-white">AH</span>
          <p className="text-sm">{content.registration}</p>
          <p className="text-sm">{content.address}</p>
          <p className="text-sm">{content.email}</p>
          <p className="text-sm">{content.phone}</p>
        </div>
        <div className="space-y-2 text-xs uppercase tracking-[0.32em] text-white/45">
          <span>Topluluk</span>
          <div className="flex flex-wrap gap-3">
            {content.socials.map((social) => (
              <a key={social.label} href={social.href} className="rounded-full border border-white/20 px-3 py-1 text-white/70 transition hover:border-white/40 hover:text-white">
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
    subheadline: "Kurtarma hikâyesine adım attığınız an, endişe yerini umuda bırakır.",
    description: "Türkiye'nin güney sahillerinden Avrupa'daki evlerine uzanan yolculukları canlı canlı izleyin. Her kaydırma, her dokunuş, bir canın hikâyesine güç olur.",
    primaryCta: { label: "Bir Hikayeyi Değiştir", href: CTA_DONATE },
    secondaryCta: { label: "Bir Kase Mama Gönder", href: CTA_DONATE },
    media: {
      poster: "/images/hero-poster.avif",
      video: "/videos/hero-ambient.mp4",
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
      title: "Kurtarma Döngüsü dört duygusal vuruştan oluşur",
      copy: "GSAP destekli kaydırmalı hikâye, ziyaretçiyi sorundan çözüme taşıyarak empatiyi harekete dönüştürür.",
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
    copy: "10 köpeklik bento ızgarası her hafta yenilenir. Kartlara dokunun, yolculuklarını keşfedin, sponsor olun veya aile olun.",
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
    title: "Etki simülatörü ile saniyeler içinde bağış",
    copy: "Çok adımlı bağış formu, Apple/Google Pay ilk sırada ve şeffaf ücret mesajları ile dönüşümü artırır.",
    options: [
      { amount: 5, label: "Bir kâse mama", impact: "Bir günlük besleyici öğün" },
      { amount: 29, label: "Bir haftalık bakım", impact: "Mama + vitamin + pansuman" },
      { amount: 45, label: "Uçuş sandığı", impact: "DEFRA onaylı uçuş kasası" },
    ],
    feesLabel: "İşlem ücretini üstlen (%2.9 + €0.30)",
    payments: ["Apple Pay", "Google Pay", "Stripe Kart", "PayPal", "SEPA / iDEAL"],
    secureBadges: ["SSL 256-bit", "GDPR", "PCI-DSS"],
  },
  stories: {
    eyebrow: "Sahne 4 • Aidiyet",
    title: "Dayanıklılık hikâyeleri: Önce & Sonra",
    copy: "Etik hikâye anlatımı ve kısa tanıklık videoları, bağışı topluluk aidiyetine dönüştürür.",
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
    copy: "Facebook topluluğumuz ve Instagram hashtag'i #AngelsHavenAilesi'nden canlı seçkiler.",
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
    copy: "Bağış sonrası teşekkür, viral döngü ve otomasyon daveti. Hikâyemizi tek dokunuşla yay.",
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
