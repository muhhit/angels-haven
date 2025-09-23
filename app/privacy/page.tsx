import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Angels Haven",
  description: "Understand how Angels Haven for Paws collects, stores, and protects your personal data.",
};

const SECTIONS = [
  {
    title: "1. Who we are",
    body: "Angels Haven for Paws is a registered charity in England & Wales (#1204821) with a governance base in London and field teams across Muğla, Izmir, and Antalya.",
  },
  {
    title: "2. Data we collect",
    body: "We collect contact details, donation history, Gift Aid declarations, volunteer applications, and analytics events (anonymised). Payment data is processed by Stripe and PayPal—we never store full card numbers.",
  },
  {
    title: "3. Why we use your data",
    body: "To process donations, deliver receipts, provide transparency updates, comply with HMRC and Charity Commission rules, coordinate volunteering, and evaluate programme performance.",
  },
  {
    title: "4. Legal bases",
    body: "We rely on legitimate interest (transparency updates), consent (marketing emails, WhatsApp alerts), and legal obligation (HMRC, safeguarding). You can withdraw consent at any time.",
  },
  {
    title: "5. Retention",
    body: "Donation records are stored for 7 years to satisfy UK charity law. Volunteer and safeguarding logs are retained for 5 years after last activity. Analytics information is aggregated within 26 months.",
  },
  {
    title: "6. Your rights",
    body: "Request access, correction, deletion, or portability of your data by emailing privacy@angelshaven.org. We respond within 14 days.",
  },
  {
    title: "7. International transfers",
    body: "Operational tooling is hosted in the UK or EU; where data moves outside, we use UK Standard Contractual Clauses and encrypted storage.",
  },
  {
    title: "8. Cookies & analytics",
    body: "We use privacy-friendly analytics (plausible.io) and Microsoft Clarity session replay. Opt-out options appear in the consent banner.",
  },
  {
    title: "9. Contact",
    body: "Email privacy@angelshaven.org or write to 18 Market Walk, Islington, London N1 7SR. Complaints can be raised with the ICO (ico.org.uk).",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0f1412] pb-24 text-white">
      <section className="section-shell space-y-8 pt-36">
        <div className="max-w-3xl space-y-5">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/60">Privacy
          </span>
          <h1 className="display-hero">Your data stays protected while we feed and rescue dogs.</h1>
          <p className="text-base text-white/70">We operate to UK GDPR standards, limit access to team members on duty, and encrypt every system that touches donor or volunteer data.</p>
        </div>
        <div className="space-y-6">
          {SECTIONS.map((section) => (
            <article key={section.title} className="rounded-3xl border border-white/12 bg-white/[0.08] p-6">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="mt-2 text-sm text-white/70">{section.body}</p>
            </article>
          ))}
        </div>
        <div className="rounded-[3rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur">
          <p className="text-sm text-white/70">For detailed transparency including audits and safeguarding logs, visit the <Link href="/transparency" className="underline">transparency hub</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
