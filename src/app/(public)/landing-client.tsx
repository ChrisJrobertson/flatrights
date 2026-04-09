'use client';

import { useState } from 'react';
import {
  CheckCircle,
  FileText,
  Clock,
  AlertTriangle,
  Building2,
  PoundSterling,
  Users,
  ExternalLink,
  Shield,
  Landmark,
  BadgeCheck,
  ClipboardCheck,
  Route,
  KeyRound,
  Quote,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { cn } from '@/lib/utils';
import { CHECK_CTA_LABEL } from '@/lib/landing-copy';

// ============================================================================
// HERO — abstract visual (no image asset)
// ============================================================================
function HeroVisual() {
  return (
    <div
      className="relative mx-auto flex aspect-[4/3] max-w-md items-center justify-center lg:max-w-none"
      aria-hidden
    >
      <div className="absolute inset-6 rounded-3xl bg-gradient-to-br from-teal-100/90 via-white to-teal-50 shadow-[0_24px_60px_-24px_rgba(15,118,110,0.35)] ring-1 ring-teal-200/60" />
      <div className="relative flex w-[72%] flex-col gap-2">
        {[0.85, 1, 0.7, 0.95].map((w, i) => (
          <div
            key={i}
            className="mx-auto h-9 rounded-lg bg-teal-700/90 shadow-sm"
            style={{ width: `${w * 100}%` }}
          />
        ))}
        <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-teal-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
          <Shield className="h-8 w-8 shrink-0 text-teal-700" />
          <div className="text-left text-sm leading-snug text-slate-700">
            <span className="block font-semibold text-slate-900">Statutory-ready</span>
            <span className="text-stone-600">Notices, deadlines, documents</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================
function HeroSection() {
  const trustItems = [
    { icon: Landmark, label: 'Companies House registered' },
    { icon: BadgeCheck, label: 'ICO registered' },
    { icon: CheckCircle, label: 'Money-back if ineligible' },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-teal-50 py-16 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
              Your leasehold rights, done right.
            </h1>

            <p className="text-lg leading-relaxed text-stone-700 sm:text-xl">
              Valid notices, tracked deadlines, and documents aligned with the statutes—guided
              step-by-step so you are not guessing when it matters.
            </p>

            <div className="mt-8 rounded-2xl border border-teal-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-5">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-teal-800 lg:text-left">
                Why leaseholders trust us
              </p>
              <ul className="flex flex-wrap justify-center gap-3 lg:justify-start">
                {trustItems.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex min-w-[min(100%,220px)] flex-1 basis-[200px] items-center gap-2.5 rounded-xl bg-teal-50/80 px-3 py-2.5 text-left text-sm font-medium text-slate-800 ring-1 ring-teal-100 sm:basis-[calc(33.333%-0.5rem)] sm:min-w-0 lg:flex-none lg:basis-auto"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-teal-700" aria-hidden />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="/check"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-teal-700 px-8 py-6 text-base text-white hover:bg-teal-800'
                )}
              >
                {CHECK_CTA_LABEL}
              </a>
              <a
                href="/pricing"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-teal-700 px-8 py-6 text-base text-teal-700 hover:bg-teal-50'
                )}
              >
                See pricing
              </a>
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FEAR SECTION
// ============================================================================
function FearSection() {
  const fears = [
    {
      title: 'What if I serve the wrong notice?',
      description:
        'The statutory format is prescribed exactly. We generate notices to match s.42 LRHDA 1993, s.8 CLRA 2002, or s.26 HA 1985 line by line.',
      icon: FileText,
    },
    {
      title: 'What if I miss a deadline?',
      description:
        "We track every statutory deadline and send you 14, 7 and 1 day warnings. You'll never miss a critical deadline again.",
      icon: Clock,
    },
    {
      title: 'What if my claim is defective?',
      description:
        'We refuse to proceed if the claim is defective. Rather lose the sale than lose your case. Your rights come first.',
      icon: AlertTriangle,
    },
  ];

  return (
    <section className="bg-stone-50 py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
          The thing that keeps you up at night
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {fears.map((fear) => {
            const Icon = fear.icon;
            return (
              <div key={fear.title} className="bg-white rounded-lg border border-stone-200 p-8">
                <Icon className="w-8 h-8 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{fear.title}</h3>
                <p className="text-stone-600 leading-relaxed">{fear.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PRODUCTS GRID
// ============================================================================
function ProductsGrid() {
  const products = [
    {
      icon: Building2,
      title: 'Right to Manage',
      subtitle: 'Take control of your building',
      benefit: 'Run the building with other leaseholders instead of the landlord.',
      statute: 's.71 CLRA 2002',
      basePrice: '£299',
      withSolicitor: '£398',
    },
    {
      icon: PoundSterling,
      title: 'Service Charge',
      subtitle: 'Challenge unfair charges',
      benefit: 'Dispute unreasonable costs with tribunal-ready evidence and steps.',
      statute: 's.27A LTA 1985',
      basePrice: '£99',
      withSolicitor: '£198',
    },
    {
      icon: FileText,
      title: 'Lease Extension',
      subtitle: 'Extend your lease term',
      benefit: 'Add years to your lease and protect your property value.',
      statute: 's.42 LRHDA 1993',
      basePrice: '£199',
      withSolicitor: '£298',
    },
    {
      icon: Users,
      title: 'Freehold',
      subtitle: 'Buy your freehold outright',
      benefit: 'Collectively purchase the freehold so you own the land too.',
      statute: 's.2 LRA 2002',
      basePrice: '£499',
      withSolicitor: '£598',
    },
  ];

  return (
    <section id="products" className="scroll-mt-24 bg-white py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-4xl font-bold text-slate-900">
          Four products, one platform
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.title}
                className="rounded-lg border border-stone-200 bg-white p-8"
              >
                <Icon className="mb-4 h-10 w-10 text-teal-700" />
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{product.title}</h3>
                <p className="mb-3 text-sm text-stone-600">{product.subtitle}</p>
                <p className="mb-6 text-sm leading-relaxed text-slate-800">{product.benefit}</p>

                <div className="mb-4">
                  <div className="mb-1 text-3xl font-bold text-slate-900">{product.basePrice}</div>
                  <div className="mb-4 text-sm text-teal-700">/building</div>
                  <div className="text-sm text-teal-700">
                    or {product.withSolicitor} with solicitor review
                  </div>
                </div>

                <p
                  className="mb-6 text-xs text-stone-500"
                  title={`Legal reference: ${product.statute}`}
                >
                  Legal basis: <span className="font-mono">{product.statute}</span>
                </p>

                <a
                  href="/check"
                  className={cn(
                    buttonVariants(),
                    'w-full bg-teal-700 text-white hover:bg-teal-800'
                  )}
                >
                  {CHECK_CTA_LABEL}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PAIN POINTS SECTION
// ============================================================================
function PainPointsSection() {
  const stats = [
    {
      stat: '11%',
      label: 'service charge rise',
      source: 'per annum (MHCLG, 2022)',
    },
    {
      stat: '£2,300',
      label: 'average service charges',
      source: '2023 (ARMA Report)',
    },
    {
      stat: '⅔',
      label: 'tribunal success rate',
      source: 'for service charge challenges (FCA)',
    },
  ];

  return (
    <section className="bg-stone-50 py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-4xl font-bold text-slate-900">Sound familiar?</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((item) => (
            <div key={item.stat} className="bg-white rounded-lg border border-stone-200 p-8 text-center">
              <div className="text-5xl font-bold text-teal-700 mb-3">{item.stat}</div>
              <p className="text-lg text-slate-900 font-semibold mb-2">{item.label}</p>
              <p className="text-sm text-stone-600">{item.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// HOW IT WORKS SECTION
// ============================================================================
function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      title: 'Check if you qualify',
      description: 'Answer 5 questions in 60 seconds. Free.',
      statute: 's.72 CLRA 2002',
      icon: ClipboardCheck,
    },
    {
      step: 2,
      title: 'Get your neighbours on board',
      description: 'We guide you through gathering leaseholder support.',
      statute: 's.71(2) CLRA 2002',
      icon: Users,
    },
    {
      step: 3,
      title: 'Follow the guided process',
      description: 'Every statutory step, every deadline, every document.',
      statute: 's.73–79 CLRA 2002',
      icon: Route,
    },
    {
      step: 4,
      title: 'Take control',
      description: 'Manage your building, reduce costs, or extend your lease.',
      statute: 's.80 CLRA 2002',
      icon: KeyRound,
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-4xl font-bold text-slate-900">How it works</h2>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((item) => {
              const StepIcon = item.icon;
              return (
                <div key={item.step} className="flex gap-6">
                  <div className="relative flex shrink-0 flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-md ring-4 ring-teal-100">
                      <StepIcon className="h-7 w-7" aria-hidden />
                    </div>
                    <span className="mt-2 text-xs font-bold tabular-nums text-teal-800">
                      Step {item.step}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mb-3 text-stone-600">{item.description}</p>
                    <p className="text-sm italic text-stone-600">{item.statute}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COST COMPARISON (CLIENT COMPONENT)
// ============================================================================
function CostComparison() {
  const [flatCount, setFlatCount] = useState(20);

  const products = [
    { name: 'Right to Manage', flatRights: 299, solicitor: 1200 },
    { name: 'Service Charge Challenge', flatRights: 99, solicitor: 500 },
    { name: 'Lease Extension', flatRights: 199, solicitor: 1500 },
    { name: 'Freehold Purchase', flatRights: 499, solicitor: 3000 },
  ];

  const calculateCost = (basePrice: number) => {
    return basePrice * flatCount;
  };

  return (
    <section className="bg-stone-50 py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-4">
          See the savings
        </h2>
        <p className="text-center text-stone-600 mb-12">
          Adjust the number of flats in your building below.
        </p>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-lg border border-stone-200 p-8">
            <label className="block text-sm font-semibold text-slate-900 mb-4">
              Number of flats
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={flatCount}
              onChange={(e) => setFlatCount(parseInt(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-4">
              <span className="text-sm text-stone-600">5</span>
              <span className="text-2xl font-bold text-teal-700">{flatCount}</span>
              <span className="text-sm text-stone-600">100</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-stone-200">
                <th className="text-left py-4 px-4 font-semibold text-slate-900">Product</th>
                <th className="text-right py-4 px-4 font-semibold text-teal-700">FlatRights</th>
                <th className="text-right py-4 px-4 font-semibold text-stone-600">Solicitor</th>
                <th className="text-right py-4 px-4 font-semibold text-teal-700">You save</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const flatRightsCost = calculateCost(product.flatRights);
                const solicitorCost = calculateCost(product.solicitor);
                const savings = solicitorCost - flatRightsCost;
                return (
                  <tr key={product.name} className="border-b border-stone-200 hover:bg-white">
                    <td className="py-4 px-4 text-slate-900 font-medium">{product.name}</td>
                    <td className="py-4 px-4 text-right text-teal-700 font-semibold">
                      £{flatRightsCost.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right text-stone-600">
                      £{solicitorCost.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right text-teal-700 font-bold">
                      £{savings.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// LEGISLATION SECTION
// ============================================================================
function LegislationSection() {
  const laws = [
    {
      title: 'Extended RTM window',
      description:
        'LAFRA 2024 extended the Right to Manage window for buildings over 7 storeys. More buildings now qualify.',
    },
    {
      title: 'Stronger service charge protection',
      description:
        'New requirements for landlord transparency. Challenge unfair charges with firmer legal ground.',
    },
    {
      title: 'Leasehold reform acceleration',
      description: 'Lease extension terms improved. Freehold enfranchisement now more accessible.',
    },
    {
      title: 'Tenant protections strengthened',
      description:
        'Landlords must now act in good faith. Defences to service charge claims have weakened.',
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-4">
          The legislation is on your side
        </h2>
        <p className="text-center text-stone-600 mb-16">
          LAFRA 2024 brought sweeping reforms. We keep up; you stay ahead.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {laws.map((law) => (
            <div key={law.title} className="bg-teal-50 rounded-lg border border-teal-200 p-8">
              <h3 className="text-lg font-semibold text-teal-900 mb-3">{law.title}</h3>
              <p className="text-stone-700">{law.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// TESTIMONIALS (anonymised — illustrative, not guarantees)
// ============================================================================
function TestimonialsSection() {
  const quotes = [
    {
      text: 'We finally had a clear RTM timeline instead of notices and PDFs scattered across email threads.',
      attribution: 'Leaseholder, South East',
    },
    {
      text: 'The deadline reminders stopped us missing a statutory response window—we would have slipped up without them.',
      attribution: 'RTM company director, London',
    },
    {
      text: 'It is plain English. I could see which statutory step we were on before we paid for solicitor time.',
      attribution: 'Flat owner, Manchester',
    },
  ];

  return (
    <section className="border-y border-stone-200 bg-gradient-to-b from-white to-stone-50 py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-4xl font-bold text-slate-900">
          What leaseholders say
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-stone-600">
          Typical feedback from early users. Outcomes depend on your building and case—always consider
          professional advice for your situation.
        </p>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {quotes.map((q) => (
            <blockquote
              key={q.attribution}
              className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-8 shadow-sm"
            >
              <Quote className="mb-4 h-9 w-9 text-teal-700/90" aria-hidden />
              <p className="mb-6 flex-1 text-base leading-relaxed text-slate-800">&ldquo;{q.text}&rdquo;</p>
              <footer className="text-sm font-medium text-stone-500">{q.attribution}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FOUNDER SECTION
// ============================================================================
function FounderSection() {
  return (
    <section className="bg-stone-50 py-24">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-teal-700 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">CR</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Built by a leaseholder, for leaseholders
        </h2>

        <p className="text-lg text-stone-600 mb-8 leading-relaxed">
          I've been through a service charge tribunal, faced three missed statutory deadlines, and
          seen neighbours lose their RTM claim on a technicality. FlatRights exists because no
          leaseholder should face the courts unprepared. Every feature is built from hard-won
          experience.
        </p>

        <a
          href="https://linkedin.com/in/chrisrobertson"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-semibold"
        >
          <ExternalLink className="w-5 h-5" />
          Connect on LinkedIn
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

// ============================================================================
// FAQ SECTION (CLIENT COMPONENT)
// ============================================================================
function FAQSection() {
  const faqs = [
    {
      question: 'Are you a law firm? Can you give legal advice?',
      answer:
        'No. FlatRights is a platform that guides you through the statutory process. We are not a law firm and do not provide legal advice. For specific legal concerns, we recommend consulting a solicitor. Our money-back guarantee covers ineligibility, not legal disputes.',
    },
    {
      question: 'How do I know if my building qualifies?',
      answer:
        "The eligibility check is free and takes 60 seconds. We check the number of flats, building age, and ownership structure against the statutory criteria in s.72 CLRA 2002 (or relevant statute). If you don't qualify, we refund your fee in full.",
    },
    {
      question: 'Will your documents hold up in court?',
      answer:
        'Our documents are generated to match the exact statutory format required by s.42 LRHDA 1993, s.8 CLRA 2002, s.26 HA 1985, and other relevant statutes. They are designed to withstand scrutiny. However, we always recommend having a solicitor review before serving.',
    },
    {
      question: "What if the landlord doesn't respond?",
      answer:
        'Non-response has legal consequences. We guide you through escalation under the relevant statute. Depending on the claim type, you can apply to court or the tribunal for a deemed-consent order.',
    },
    {
      question: 'What if the landlord objects?',
      answer:
        "We help you prepare a response to the landlord's objection. If disputes arise, the claim goes to tribunal or court. We provide the documents; you may need a solicitor for representation.",
    },
    {
      question: 'Do I need a solicitor?',
      answer:
        'Not always. Many leaseholders successfully navigate the process independently. However, solicitor review is strongly recommended before serving notices or responding to objections. We offer a solicitor review option at checkout.',
    },
    {
      question: 'How long does RTM take?',
      answer:
        'RTM claims typically take 4–6 months from service to completion, assuming the landlord does not dispute. The statutory process is set out in s.73–79 CLRA 2002. We track deadlines for you.',
    },
    {
      question: 'What if my lease is very short?',
      answer:
        'Lease extension rules are stricter for leases under 80 years. You may still be eligible under s.42 LRHDA 1993, but we will flag issues during eligibility screening. Some buildings cannot be extended; we will tell you upfront.',
    },
    {
      question: "What's your refund policy?",
      answer:
        "If we determine your building is ineligible after the eligibility check, we refund the fee in full. If you've paid for a full product (RTM, service charge, etc.) and become ineligible, we also refund in full, minus any costs incurred.",
    },
    {
      question: 'Who are you? Can I trust you?',
      answer:
        'FlatRights is a UK-registered company and, where applicable, registered with the ICO for data protection. Exact company and ICO numbers are published in our Terms of Service and Privacy Policy. We operate transparent pricing; our founder has first-hand experience with leasehold disputes. Verify any company on the official Companies House register.',
    },
  ];

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="mb-16 text-center text-4xl font-bold text-slate-900">
          Frequently asked questions
        </h2>

        <Accordion className="w-full" defaultValue={['item-0']}>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-stone-200">
              <AccordionTrigger className="py-4 hover:no-underline hover:text-teal-700">
                <span className="text-left font-semibold text-slate-900">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================
function FinalCTASection() {
  return (
    <section className="bg-gradient-to-r from-teal-700 to-teal-800 py-24">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <h2 className="mb-4 text-4xl font-bold text-white">Free eligibility check</h2>
        <p className="mb-8 text-lg text-teal-50">About 60 seconds, no account required.</p>
        <a
          href="/check"
          className={cn(
            buttonVariants({ size: 'lg' }),
            'bg-white px-8 py-6 text-base font-semibold text-teal-700 hover:bg-stone-100'
          )}
        >
          {CHECK_CTA_LABEL}
        </a>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export function LandingPageClient() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <HeroSection />
        <PainPointsSection />
        <FearSection />
        <ProductsGrid />
        <HowItWorksSection />
        <CostComparison />
        <LegislationSection />
        <FounderSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
