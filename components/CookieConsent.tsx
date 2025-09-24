'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ah-cookie-consent';

function getLocalStorageConsent(): string | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
  } catch (error) {
    console.error('Cookie consent read blocked', error);
    return null;
  }
}

function setLocalStorageConsent(value: string) {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
  } catch (error) {
    console.error('Cookie consent write blocked', error);
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getLocalStorageConsent()) setVisible(true);
  }, []);

  const accept = () => {
    setLocalStorageConsent('accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[120] w-full max-w-[700px] -translate-x-1/2 rounded-[1.8rem] border border-white/15 bg-[rgba(10,16,13,0.92)] px-6 py-5 text-white/80 shadow-[0_24px_60px_rgba(6,10,9,0.55)] backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 text-sm">
          <span className="text-xs uppercase tracking-[0.32em] text-white/55">Cookies & analytics</span>
          <p>
            We use essential cookies to keep donations secure and optional analytics (with consent) to understand campaign performance.
            Review the <a href="/privacy" className="underline">privacy policy</a> and <a href="/terms" className="underline">terms</a> for details.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/70 transition hover:border-white/35 hover:text-white"
            onClick={() => setVisible(false)}
          >
            Maybe later
          </button>
          <button
            type="button"
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#0b1411] transition hover:opacity-90"
            onClick={accept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
