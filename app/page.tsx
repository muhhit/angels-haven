import Link from "next/link";

type Stat = {
  label: string;
  value: string;
};

type Package = {
  title: string;
  price: string;
  description: string;
  bullets: string[];
  highlighted?: boolean;
};

type TimelineStep = {
  step: string;
  title: string;
  description: string;
};

type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

type FAQ = {
  question: string;
  answer: string;
};

const stats: Stat[] = [
  { label: "Dogs Rescued", value: "180" },
  { label: "Foster Nights Funded", value: "210" },
  { label: "Raised This Month", value: "£12,450" },
  { label: "Adoption Success", value: "94%" },
];

const donationPackages: Package[] = [
  {
    title: "Emergency Vet Care",
    price: "£35",
    description: "Give urgent treatment the moment a dog is rescued.",
    bullets: ["Pain relief & IV meds", "After-hours vet call", "Follow-up checks"],
  },
  {
    title: "Safe Travel Crate",
    price: "£55",
    description: "Equip a survivor for the journey to the UK.",
    bullets: ["IATA approved crate", "Comfort bedding", "Export paperwork"],
    highlighted: true,
  },
  {
    title: "Monthly Angel",
    price: "£25/mo",
    description: "Provide food, shelter and rehab every single month.",
    bullets: ["Premium food supply", "Shelter upkeep", "Behaviour therapy"],
  },
];

const sponsorPlans: Package[] = [
  {
    title: "Paw Pal",
    price: "£10/mo",
    description: "Cover food and preventative care for one dog.",
    bullets: ["Weekly photo update", "Quarterly health report", "Sponsor badge"],
  },
  {
    title: "Haven Hero",
    price: "£25/mo",
    description: "Upgrade care with vet exams and rehabilitation.",
    bullets: ["All Paw Pal perks", "Vet & therapy fund", "Private livestreams"],
    highlighted: true,
  },
  {
    title: "Flight Champion",
    price: "£60/mo",
    description: "Save for travel prep & UK adoption logistics.",
    bullets: ["Transport savings pot", "Meet & greet call", "Priority adoption alerts"],
  },
];

const timeline: TimelineStep[] = [
  {
    step: "01",
    title: "Rescue & Stabilise in Fethiye",
    description:
      "Street dogs are brought to safety, treated for injuries, vaccinated and nourished at our foster farm.",
  },
  {
    step: "02",
    title: "Rehab & Prepare for Travel",
    description:
      "Behaviour work, socialisation and paperwork ensure each dog is ready for a calm flight to the UK.",
  },
  {
    step: "03",
    title: "Adopt & Follow Up Abroad",
    description:
      "We partner with UK adopters, provide settling support and share monthly updates from their new homes.",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "Supporting Angels Haven gives me peace of mind. Every rescue update proves my donation is changing a life.",
    name: "Susan",
    detail: "London · Age 56",
  },
  {
    quote:
      "We’ve seen shy survivors transform into confident family dogs. Sponsoring monthly keeps that magic happening.",
    name: "Martin & Jude",
    detail: "Manchester · Age 61 & 59",
  },
  {
    quote:
      "After visiting the farm in Türkiye, I know this mission is urgent. Giving monthly is the least I can do.",
    name: "Patricia",
    detail: "Bristol · Age 51",
  },
];

const faqs: FAQ[] = [
  {
    question: "Is Angels Haven a registered charity?",
    answer:
      "We operate as a Turkish sole proprietorship partnered with a UK PayPal steward. Every pound is logged, receipted and publicly reported.",
  },
  {
    question: "Where does my donation go?",
    answer:
      "90% funds direct care — vet bills, food, rehab and transport. The remainder covers community outreach and compliance.",
  },
  {
    question: "Can I claim Gift Aid?",
    answer:
      "At this time Gift Aid isn’t possible because funds are processed via our UK PayPal steward on behalf of the Turkish rescue.",
  },
  {
    question: "How can I see the finances?",
    answer:
      "We publish monthly ledgers, vet invoices and annual summaries. Download the transparency report or join our Angels Live call.",
  },
];

function HeartPawIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 12.5c5.2-6.6 15.5-6.8 21-.3 6.1 6 6 16-.2 22.2l-17.7 17c-.7.7-1.6 1-2.5 1s-1.8-.3-2.5-1l-17.7-17C6.1 28.2 6 18.2 12.2 12.2c5.5-5.4 15.8-5.3 20.8.3z"
        fill="#1b5b45"
      />
      <path
        d="M32.1 41.5c4.1 0 7.5-3.6 7.5-8s-3.4-8-7.5-8-7.5 3.6-7.5 8 3.4 8 7.5 8z"
        fill="#f5b700"
      />
      <path
        d="M21.4 23.8c2.1 0 3.8-2.2 3.8-4.8s-1.7-4.7-3.8-4.7-3.8 2.1-3.8 4.7 1.7 4.8 3.8 4.8zm21.2 0c2.1 0 3.8-2.2 3.8-4.8s-1.7-4.7-3.8-4.7-3.8 2.1-3.8 4.7 1.7 4.8 3.8 4.8zm-25.1 9.4c1.8 0 3.3-1.9 3.3-4.2 0-2.3-1.5-4.2-3.3-4.2-1.8 0-3.3 1.9-3.3 4.2 0 2.3 1.5 4.2 3.3 4.2zm29 0c1.8 0 3.3-1.9 3.3-4.2 0-2.3-1.5-4.2-3.3-4.2-1.8 0-3.3 1.9-3.3 4.2 0 2.3 1.5 4.2 3.3 4.2z"
        fill="#1b5b45"
      />
    </svg>
  );
}

function SectionTitle({
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
        <span className="uppercase tracking-[0.3em] text-xs text-primary/70">
          {eyebrow}
        </span>
      )}
      <h2 className="heading-font text-3xl sm:text-4xl text-primary text-shadow-soft">
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
  newTab,
}: {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
}) {
  const common =
    "inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-base font-semibold text-primary transition hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";
  if (href.startsWith("#")) {
    return (
      <a href={href} className={common}>
        {children}
      </a>
    );
  }
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        className={common}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={common}>
      {children}
    </Link>
  );
}

function OutlineButton({
  href,
  children,
  newTab,
}: {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
}) {
  const common =
    "inline-flex items-center justify-center rounded-full border border-secondary px-6 py-3 text-base font-semibold text-secondary transition hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";
  if (href.startsWith("#")) {
    return (
      <a href={href} className={common}>
        {children}
      </a>
    );
  }
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        className={common}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={common}>
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="w-full border-b border-border/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <HeartPawIcon className="h-9 w-9" />
            <span className="heading-font text-xl text-primary">
              Angels Haven for Paws
            </span>
          </div>
          <nav className="hidden gap-6 text-sm font-semibold text-foreground/80 md:flex">
            <Link href="#impact" className="hover:text-primary">
              Impact
            </Link>
            <Link href="#donate" className="hover:text-primary">
              Donate
            </Link>
            <Link href="#angels-club" className="hover:text-primary">
              Angels Club
            </Link>
            <Link href="#stories" className="hover:text-primary">
              Stories
            </Link>
            <Link href="#faq" className="hover:text-primary">
              FAQ
            </Link>
          </nav>
          <PrimaryButton href="#donate">Donate Now</PrimaryButton>
        </div>
      </header>

      <section className="relative overflow-hidden bg-primary text-secondary">
        <div className="absolute -top-40 right-[-10%] h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="flex flex-col gap-6 text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium uppercase tracking-[0.3em]">
              Rescue · Rehab · Rehome
            </span>
            <h1 className="heading-font text-4xl leading-tight text-secondary sm:text-5xl md:text-6xl">
              Give a Street Dog a Safe Tomorrow
            </h1>
            <p className="text-lg text-white/90">
              While Türkiye debates the culling of stray dogs, Tülay is out at
              dawn rescuing those in danger. Your support funds medical care,
              sanctuary time and a seat on the flight to a loving UK home.
            </p>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton href="#donate">Donate via PayPal</PrimaryButton>
              <OutlineButton href="#angels-club">
                Join the Angels Club
              </OutlineButton>
            </div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/70">
              Trusted by UK adopters & Facebook community of 12k supporters
            </p>
          </div>
          <div className="flex flex-col gap-6 rounded-3xl bg-white/10 p-8 backdrop-blur">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/15 p-4 text-center text-white"
                >
                  <span className="heading-font text-3xl font-semibold text-secondary">
                    {stat.value}
                  </span>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-secondary/20 p-5 text-sm text-white/90">
              <p className="font-semibold text-secondary">
                Every rescue is logged and receipted.
              </p>
              <p>
                See vet invoices, foster bills and adoption handovers in our
                transparency report.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionTitle
          eyebrow="Impact"
          title="Hope measured in paw prints"
          subtitle="Every number is a survivor – and a promise that no dog will be left behind while the streets are emptied."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={`impact-${stat.label}`}
              className="rounded-3xl bg-white p-6 text-center card-shadow"
            >
              <p className="heading-font text-4xl text-primary">
                {stat.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-foreground/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="donate"
        className="bg-white/80 py-20 shadow-inner shadow-foreground/5"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
          <SectionTitle
            eyebrow="Donate"
            title="Pick your impact"
            subtitle="From emergency hospital care to a seat on the plane, every contribution rescues a dog from the streets before it’s too late."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {donationPackages.map((pkg) => (
              <div
                key={pkg.title}
                className={`flex flex-col gap-5 rounded-3xl border border-border/60 p-8 transition hover:-translate-y-2 hover:shadow-xl ${
                  pkg.highlighted
                    ? "bg-accent/45 border-secondary"
                    : "bg-white"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <span className="heading-font text-2xl text-primary">
                    {pkg.title}
                  </span>
                  <span className="text-lg font-semibold text-secondary">
                    {pkg.price}
                  </span>
                  <p className="text-sm text-foreground/70">{pkg.description}</p>
                </div>
                <ul className="flex flex-col gap-3 text-sm text-foreground/80">
                  {pkg.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <PrimaryButton href="https://www.paypal.com/">Donate</PrimaryButton>
                <p className="text-xs text-foreground/60">
                  Processed securely via PayPal UK steward account. Receipts sent
                  instantly.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20" id="stories">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="flex flex-col gap-6">
            <SectionTitle
              align="left"
              eyebrow="Rescue Story"
              title="Bella’s journey from abandoned to adored"
              subtitle="Found trembling beside a busy highway, Bella was destined for the cull list. Your donations funded surgery, foster rehab and her flight to Manchester, where she now wakes up to cuddles and countryside walks."
            />
            <div className="space-y-4 rounded-3xl bg-white p-6 card-shadow">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                BEFORE → AFTER
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex h-36 flex-col justify-between rounded-2xl bg-muted/50 p-4 text-sm text-foreground/70">
                  <span className="font-semibold text-foreground">Rescue Day</span>
                  <p>Severe mange, open wounds, 5kgs underweight. Terrified of touch.</p>
                </div>
                <div className="flex h-36 flex-col justify-between rounded-2xl bg-secondary/20 p-4 text-sm text-foreground/70">
                  <span className="font-semibold text-foreground">Today</span>
                  <p>Healthy coat, confident at home, loves school runs with her new family.</p>
                </div>
              </div>
              <OutlineButton href="https://facebook.com">See more stories</OutlineButton>
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 card-shadow">
            <SectionTitle
              eyebrow="Urgent Context"
              title="The cull law is real"
              subtitle="Türkiye’s proposed law would remove thousands of dogs from the streets. We’re racing to rescue the vulnerable before they disappear."
              align="left"
            />
            <ul className="flex flex-col gap-4 text-sm text-foreground/80">
              <li>
                • Mobile rescue team on call 24/7 responding to citizen alerts.
              </li>
              <li>• Foster farm housing 90 dogs with medical isolation bays.</li>
              <li>
                • UK & EU adoption partners ready to welcome rehabilitated dogs.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-primary/5 py-20" id="how-it-works">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
          <SectionTitle
            eyebrow="How it works"
            title="From the streets of Fethiye to a sofa in the UK"
            subtitle="We stay with every dog from the moment we scoop them up to the day they settle with their forever family abroad."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {timeline.map((item) => (
              <div
                key={item.step}
                className="flex flex-col gap-4 rounded-3xl bg-white p-8 card-shadow"
              >
                <span className="heading-font text-4xl text-secondary">
                  {item.step}
                </span>
                <h3 className="heading-font text-2xl text-primary">{item.title}</h3>
                <p className="text-sm text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="angels-club"
        className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20"
      >
        <SectionTitle
          eyebrow="Angels Club"
          title="Become a monthly guardian"
          subtitle="Members receive behind-the-scenes videos from the farm, live rescue briefings and first access to adoption news. Most importantly, you fund long-term security for every survivor."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {sponsorPlans.map((plan) => (
            <div
              key={plan.title}
              className={`flex flex-col gap-5 rounded-3xl border border-border/60 p-8 ${
                plan.highlighted
                  ? "bg-primary text-white card-shadow"
                  : "bg-white"
              }`}
            >
              <div className="flex flex-col gap-2">
                <span className="heading-font text-2xl">
                  {plan.title}
                </span>
                <span className="text-lg font-semibold">
                  {plan.price}
                </span>
                <p className={`${plan.highlighted ? "text-white/80" : "text-foreground/70"}`}>
                  {plan.description}
                </p>
              </div>
              <ul
                className={`flex flex-col gap-3 text-sm ${
                  plan.highlighted ? "text-white/85" : "text-foreground/80"
                }`}
              >
                {plan.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className={`mt-1 h-2 w-2 rounded-full ${
                        plan.highlighted ? "bg-secondary" : "bg-primary"
                      }`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <PrimaryButton href="https://www.paypal.com/">
                Join the club
              </PrimaryButton>
              <p className={`text-xs ${plan.highlighted ? "text-white/70" : "text-foreground/60"}`}>
                Prefer Turkish bank transfer? Purchase our digital support
                products and we’ll allocate your gift to this plan.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
          <SectionTitle
            eyebrow="Testimonials"
            title="Why UK supporters give"
            subtitle="12k+ donors follow our updates on Facebook. These are the voices that keep more tails wagging."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="flex h-full flex-col gap-4 rounded-3xl bg-primary/5 p-6"
              >
                <p className="text-base text-foreground/80">“{item.quote}”</p>
                <div className="mt-auto">
                  <p className="font-semibold text-primary">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-primary/5 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-6">
            <SectionTitle
              align="left"
              eyebrow="Transparency"
              title="Open books, open hearts"
              subtitle="Download our latest report, read the FAQ or schedule a video call with the team if you need more detail."
            />
            <div className="rounded-3xl bg-white p-6 card-shadow">
              <p className="text-sm font-semibold text-primary">
                Monthly Transparency Report
              </p>
              <p className="mt-2 text-sm text-foreground/70">
                Itemised vet bills, foster payroll, travel invoices and adoption
                donations. Updated on the first Monday of each month.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <PrimaryButton href="https://example.com/report.pdf">
                  Download PDF
                </PrimaryButton>
                <OutlineButton href="https://example.com/archive">
                  View archive
                </OutlineButton>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-border/60 bg-white p-5"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-primary">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-foreground/75">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <HeartPawIcon className="h-8 w-8" />
              <span className="heading-font text-xl">Angels Haven for Paws</span>
            </div>
            <p className="text-sm text-white/80">
              Registered as a Turkish sole proprietorship. UK PayPal steward:
              Tracey Coulson. Donations transfer weekly to fund Tülay’s rescue
              mission in Fethiye.
            </p>
            <p className="text-xs text-white/70">
              WhatsApp: +90 555 123 45 67 · Email: hello@angelshavenforpaws.org
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-3 text-sm text-white/80">
              <span className="font-semibold text-white">Quick Links</span>
              <Link href="#donate" className="hover:text-secondary">
                Donate
              </Link>
              <Link href="#angels-club" className="hover:text-secondary">
                Angels Club
              </Link>
              <Link href="#stories" className="hover:text-secondary">
                Rescue Stories
              </Link>
              <Link href="#faq" className="hover:text-secondary">
                Transparency
              </Link>
            </div>
            <div className="flex flex-col gap-3 text-sm text-white/80">
              <span className="font-semibold text-white">Stay in the loop</span>
              <p>
                Join 12k supporters receiving monthly rescue footage and urgent
                alerts straight from the farm.
              </p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-full border border-white/40 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:border-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-base font-semibold text-primary transition hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 py-6 text-center text-xs text-white/70">
          © {new Date().getFullYear()} Angels Haven for Paws. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
