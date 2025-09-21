import Image from "next/image";

const CTA_PRIMARY = "https://www.paypal.com/donate";
const CTA_REPORT = "https://example.com/angels-haven-transparency.pdf";
const CTA_WHATSAPP = "https://wa.me/905555555555";
const CTA_ADOPTION = "https://example.com/adoption";

const stats = [
  { label: "Dogs moved to UK homes", value: "187" },
  { label: "Dogs safe at the farm", value: "83" },
  { label: "Emergency cases right now", value: "26" },
  { label: "Monthly care per dog", value: "£45" },
];

const painPoints = [
  {
    title: "Countdown after the new euthanasia law",
    description:
      "Türkiye’s 2024 stray law gives municipalities power to remove dogs from the streets. Without rapid rescue, they disappear.",
  },
  {
    title: "Medical triage before adoption can begin",
    description:
      "70% arrive injured or malnourished. Intensive vet work – surgeries, vaccines, passports – must be funded upfront.",
  },
  {
    title: "Flights are the bottleneck",
    description:
      "Transport crates, DEFRA paperwork, and escorts make every seat costly. When funding lags, dogs wait in limbo.",
  },
];

const uspPillars = [
  {
    title: "Safe Haven Farm in Fethiye",
    detail:
      "Daily rescue rounds, onsite quarantine suites, and trusted vets mean dogs stabilise within hours – not weeks.",
    metric: "19 dedicated caregivers",
  },
  {
    title: "UK & EU Adoption Pipeline",
    detail:
      "Volunteers in Manchester, London and Berlin match families, prep home checks, and escort flights every month.",
    metric: "10+ flights arranged 2024",
  },
  {
    title: "Radical Transparency",
    detail:
      "Every sponsor sees ledgers, vet invoices, and live farm cams. Monthly Angels Briefings keep donors in the loop.",
    metric: "100% ledger access",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Signal & Safe",
    copy:
      "Community alerts or municipal rounds notify us. Within 60 minutes, team members collect and transport to the farm.",
  },
  {
    step: "02",
    title: "Stabilise & Rebuild",
    copy:
      "Veterinary triage, nutrition, trauma rehab, and socialisation. Donors receive photo proof of progress every Friday.",
  },
  {
    step: "03",
    title: "Prepare for Departure",
    copy:
      "Vaccines, passports, DEFRA paperwork, crate training, and foster simulation. Angel Club funds travel crates and escorts.",
  },
  {
    step: "04",
    title: "Match & Settle",
    copy:
      "UK/EU adopters complete checks, then we escort flights and offer 30-day aftercare. Sponsors receive settling updates.",
  },
];

const impactStories = [
  {
    name: "Milo",
    before: {
      image: "/images/story-before.png",
      alt: "Injured street dog before rescue",
    },
    after: {
      image: "/images/story-after.png",
      alt: "Healthy dog after adoption",
    },
    summary:
      "Found with a fractured jaw days before the cull order. Angel sponsors covered surgery + transport; now settled in Surrey.",
  },
];

const clubTiers = [
  {
    name: "Guardian Angel",
    price: "£30/mo",
    focus: "Food + vet fund for one dog",
    perks: [
      "Weekly photo + health digest",
      "Access to Angels Briefing livestream",
      "Name engraved on the farm gratitude wall",
    ],
  },
  {
    name: "Flight Partner",
    price: "£65/mo",
    focus: "Crates + escorts for flights",
    perks: [
      "Guardian benefits",
      "Private WhatsApp updates from escort team",
      "Priority invite to UK arrival meet-ups",
    ],
    highlight: true,
  },
  {
    name: "Legacy Circle",
    price: "£120/mo",
    focus: "Sponsor a full rescue journey",
    perks: [
      "Flight Partner benefits",
      "Quarterly impact strategy roundtable",
      "Personal video call with Tülay & medical lead",
    ],
  },
];

const trustSignals = [
  "Monthly ledger & vet receipts",
  "EU transport partners pre-approved",
  "PayPal & Stripe secure checkout",
  "Onsite visit invitations",
];

const faqs = [
  {
    question: "Is Angels Haven a registered non-profit?",
    answer:
      "Angels Haven operates as a Turkish rescue collective with UK fiscal sponsorship. Donations flow via a vetted UK PayPal steward and are logged in GBP."
  },
  {
    question: "Can I claim Gift Aid?",
    answer:
      "Not yet. We are working with UK counsel to finalise charity status. Until then, donations are not Gift Aid eligible."
  },
  {
    question: "How quickly will I receive updates?",
    answer:
      "Within 72 hours of sponsoring you receive your dog’s dossier and a link to the live Angels Briefing workspace. Weekly photo/video drops follow."
  },
  {
    question: "May I visit the farm?",
    answer:
      "Absolutely. Sponsors can schedule guided visits in Fethiye. We also host monthly virtual tours for international supporters."
  },
];

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
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      {eyebrow && (
        <span className="badge-muted inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em]">
          {eyebrow}
        </span>
      )}
      <h2 className="heading-font text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-lg text-foreground/80">{subtitle}</p>
      )}
    </div>
  );
}

function PrimaryButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";
  if (variant === "solid") {
    return (
      <a
        href={href}
        className={`${base} bg-secondary text-ink shadow-sm hover:bg-secondary/90`}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      className={`${base} border border-white/70 text-white hover:bg-white/10`}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-b from-background/90 to-background/30 backdrop-blur">
        <div className="section-shell flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <div className="gradient-ring flex h-11 w-11 items-center justify-center rounded-full">
              <span className="text-lg font-bold text-white">AH</span>
            </div>
            <span className="heading-font text-lg text-ink">
              Angels Haven for Paws
            </span>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={CTA_REPORT}
              className="text-sm font-semibold text-ink underline-offset-4 transition hover:text-primary hover:underline"
            >
              View transparency report
            </a>
            <PrimaryButton href={CTA_PRIMARY}>Become an Angel Sponsor</PrimaryButton>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-rescue.png"
            alt="Tülay comforting a rescued dog"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/75 to-ink/10" />
        </div>
        <div className="section-shell relative flex min-h-[75vh] flex-col gap-10 py-24 text-white sm:py-32">
          <div className="max-w-3xl">
            <span className="badge-muted bg-white/15 text-white">
              Rescue · Rehab · UK Adoption
            </span>
            <h1 className="heading-font mt-6 text-4xl leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
              Sponsor a Turkish Street Dog into a Safe UK Home in 60 Days
            </h1>
            <p className="mt-6 text-lg text-white/85 sm:text-xl">
              Following Türkiye’s stray euthanasia law, every day matters. Your monthly sponsorship rescues vulnerable dogs, heals them at our Fethiye farm, and flies them to vetted adopters across the UK and EU.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryButton href={CTA_PRIMARY}>Become an Angel Sponsor</PrimaryButton>
              <PrimaryButton href={CTA_WHATSAPP} variant="ghost">
                Talk to our team now
              </PrimaryButton>
            </div>
          </div>
          <div className="grid max-w-3xl grid-cols-1 gap-4 text-sm font-medium text-white/80 sm:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur"
              >
                <p className="text-2xl font-semibold text-white">{item.value}</p>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Why urgency?"
          title="The problem we are solving right now"
          subtitle="Street dogs now face culling if unclaimed. Angel Sponsors interrupt that pipeline and fund a safe exit plan."
          align="left"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {painPoints.map((item) => (
            <div
              key={item.title}
              className="glow-card rounded-3xl bg-white p-8 text-left"
            >
              <h3 className="heading-font text-xl text-ink">{item.title}</h3>
              <p className="mt-4 text-base text-foreground/80">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Why Angels Haven?"
            title="Rescue farm, adoption network, and radical transparency"
            subtitle="We focus on the full journey: stabilise in Türkiye, match in the UK/EU, and keep supporters updated with receipts and live briefings."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {uspPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-3xl border border-white/60 bg-white/70 p-8 backdrop-blur"
              >
                <h3 className="heading-font text-xl text-ink">{pillar.title}</h3>
                <p className="mt-4 text-foreground/80">{pillar.detail}</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-primary">
                  {pillar.metric}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="How it works"
          title="From the street to the sofa in four accountable steps"
          subtitle="Sponsors see each milestone inside Angels Briefing workspace."
          align="left"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.step} className="rounded-3xl border border-ink/10 bg-white p-8">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                {step.step}
              </span>
              <h3 className="heading-font mt-4 text-xl text-ink">{step.title}</h3>
              <p className="mt-4 text-sm text-foreground/75">{step.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-ink via-ink to-primary py-20 text-white">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Impact stories"
            title="Proof your sponsorship flips a survival story"
            subtitle="Every dog receives a before/after dossier, vet receipts, and arrival updates."
          />
          <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            {impactStories.map((story) => (
              <div key={story.name} className="flex flex-col gap-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative h-64 overflow-hidden rounded-3xl border border-white/20">
                    <Image
                      src={story.before.image}
                      alt={story.before.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
                      Before
                    </div>
                  </div>
                  <div className="relative h-64 overflow-hidden rounded-3xl border border-white/20">
                    <Image
                      src={story.after.image}
                      alt={story.after.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-ink">
                      After
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
                  <h3 className="heading-font text-2xl text-white">
                    {story.name}
                  </h3>
                  <p className="mt-4 text-white/80">{story.summary}</p>
                </div>
              </div>
            ))}
            <div className="flex flex-col justify-between rounded-3xl bg-white/10 p-10 backdrop-blur">
              <h3 className="heading-font text-2xl text-white">
                Angel Club guarantees the happy ending
              </h3>
              <p className="mt-6 text-white/80">
                Sponsors receive live updates, 4K arrival footage, and can join escorted handovers at Heathrow or Manchester. Your monthly support keeps this pipeline open despite new euthanasia laws.
              </p>
              <PrimaryButton href={CTA_PRIMARY}>Join Angel Club</PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Membership"
          title="Pick your Angel Club contribution"
          subtitle="One CTA, three tiers. Every tier unlocks the same mission: no dog left for the cull."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {clubTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl border bg-white p-8 ${
                tier.highlight
                  ? "border-secondary shadow-[0_30px_60px_rgba(31,59,49,0.18)]"
                  : "border-ink/10 shadow-sm"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="heading-font text-2xl text-ink">{tier.name}</h3>
                <span className="text-lg font-semibold text-primary">{tier.price}</span>
              </div>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                {tier.focus}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-foreground/80">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
                    {perk}
                  </li>
                ))}
              </ul>
              <PrimaryButton href={CTA_PRIMARY}>
                Sponsor at this level
              </PrimaryButton>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="section-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Meet Tülay"
              title="The woman leading rescues after midnight"
              subtitle="Tülay founded Angels Haven when municipal trucks started rounding dogs for disposal. She has pulled 400+ dogs off the streets with a small team and a global network of supporters."
              align="left"
            />
            <ul className="mt-8 space-y-4 text-sm text-foreground/80">
              <li>
                • 15 years rescuing and rehoming dogs between Türkiye & the UK
              </li>
              <li>• Partnerships with DEFRA-compliant transporters</li>
              <li>• Former veterinary nurse; fluent in TR & EN for adopter liaison</li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-4 text-sm font-semibold text-primary">
              {trustSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full bg-white px-4 py-2 shadow-sm"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>
          <div className="relative h-[26rem] overflow-hidden rounded-3xl">
            <Image
              src="/images/founder-tulay.png"
              alt="Founder Tülay hugging a rescued dog"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Answers"
          title="Frequently asked questions"
          subtitle="Still unsure? Message us on WhatsApp or join the next Angels Briefing to meet adopters and see the farm live."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-ink/10 bg-white p-8">
              <h3 className="heading-font text-xl text-ink">{faq.question}</h3>
              <p className="mt-4 text-sm text-foreground/80">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-ink to-ink" />
        <div className="section-shell relative flex flex-col items-center gap-6 text-center text-white">
          <h2 className="heading-font text-3xl sm:text-4xl">
            Ready to rescue the next dog before the 30-day deadline?
          </h2>
          <p className="max-w-2xl text-lg text-white/85">
            Become part of Angel Club and fund one full rescue journey. Your impact is logged, filmed, and celebrated with the community.
          </p>
          <PrimaryButton href={CTA_PRIMARY}>Become an Angel Sponsor</PrimaryButton>
          <a
            href={CTA_ADOPTION}
            className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
          >
            Prefer to adopt? Explore current dogs awaiting UK homes
          </a>
        </div>
      </section>

      <footer className="bg-ink py-10 text-white/70">
        <div className="section-shell flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Angels Haven for Paws. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a href={CTA_REPORT} className="hover:text-white">
              Transparency report
            </a>
            <a href={CTA_WHATSAPP} className="hover:text-white">
              WhatsApp rescue hotline
            </a>
            <a href="mailto:hello@angelshavenforpaws.org" className="hover:text-white">
              hello@angelshavenforpaws.org
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
