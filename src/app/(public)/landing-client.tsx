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
  ChevronDown,
  ExternalLink,
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


// ============================================================================
// HERO SECTION
// ============================================================================
function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-teal-50 py-24">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          Your leasehold rights, done right.
        </h1>

        <p className="text-xl text-stone-700 mb-4">
          Guided step-by-step through every statutory requirement. No guesswork. No missed deadlines.
        </p>

        <p className="text-lg text-stone-600 mb-12 leading-relaxed">
          Reduce the risk of defective notices, missed statutory deadlines, or claims that don't hold
          up in court. Take control with confidence, knowing every step is legally sound.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="/check" className={cn(buttonVariants({ size: "lg" }), "bg-teal-700 hover:bg-teal-800 text-white px-8 py-6 text-base")}>
            Check if your building qualifies
          </a>
          <a href="/pricing" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-teal-700 text-teal-700 hover:bg-teal-50 px-8 py-6 text-base")}>
            See pricing
          </a>
        </div>

        {/* Trust Row */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8 border-t border-stone-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-teal-700" />
            <span className="text-stone-700">Companies House registered</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-teal-700" />
            <span className="text-stone-700">ICO registered</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-teal-700" />
            <span className="text-stone-700">Money-back guarantee if ineligible</span>
          </div>
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
      basePrice: '£299',
      withSolicitor: '£398',
      statute: 's.71 CLRA 2002',
    },
    {
      icon: PoundSterling,
      title: 'Service Charge',
      subtitle: 'Challenge unfair charges',
      basePrice: '£99',
      withSolicitor: '£198',
      statute: 's.27A LTA 1985',
    },
    {
      icon: FileText,
      title: 'Lease Extension',
      subtitle: 'Extend your lease term',
      basePrice: '£199',
      withSolicitor: '£298',
      statute: 's.42 LRHDA 1993',
    },
    {
      icon: Users,
      title: 'Freehold',
      subtitle: 'Buy your freehold outright',
      basePrice: '£499',
      withSolicitor: '£598',
      statute: 's.2 LRA 2002',
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
          Four products, one platform
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div key={product.title} className="bg-white rounded-lg border border-stone-200 p-8">
                <Icon className="w-10 h-10 text-teal-700 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{product.title}</h3>
                <p className="text-sm text-stone-600 mb-6">{product.subtitle}</p>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-slate-900 mb-1">{product.basePrice}</div>
                  <div className="text-sm text-teal-700 mb-4">/building</div>
                  <div className="text-sm text-teal-700">or {product.withSolicitor} with solicitor review</div>
                </div>

                <p className="text-sm italic text-stone-600 mb-6">{product.statute}</p>

                <a href="/check" className={cn(buttonVariants(), "w-full bg-teal-700 hover:bg-teal-800 text-white")}>
                  Get started
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
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">Sound familiar?</h2>

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
    },
    {
      step: 2,
      title: 'Get your neighbours on board',
      description: 'We guide you through gathering leaseholder support.',
      statute: 's.71(2) CLRA 2002',
    },
    {
      step: 3,
      title: 'Follow the guided process',
      description: 'Every statutory step, every deadline, every document.',
      statute: 's.73–79 CLRA 2002',
    },
    {
      step: 4,
      title: 'Take control',
      description: 'Manage your building, reduce costs, or extend your lease.',
      statute: 's.80 CLRA 2002',
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">How it works</h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-700 text-white font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-stone-600 mb-3">{item.description}</p>
                  <p className="text-sm italic text-stone-600">{item.statute}</p>
                </div>
              </div>
            ))}
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
        "FlatRights is registered with Companies House (12345678) and the Information Commissioner's Office (ZA123456). We hold professional indemnity insurance and operate under transparent pricing. Our founder has first-hand experience with leasehold disputes. Check Companies House for our registration.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
          Frequently asked questions
        </h2>

        <Accordion className="w-full">
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
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Check if your building qualifies
        </h2>
        <p className="text-lg text-teal-50 mb-8">
          60 seconds, no account, free.
        </p>
        <a href="/check" className={cn(buttonVariants({ size: "lg" }), "bg-white hover:bg-stone-100 text-teal-700 px-8 py-6 text-base font-semibold")}>
          Get started
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
        <FearSection />
        <ProductsGrid />
        <PainPointsSection />
        <HowItWorksSection />
        <CostComparison />
        <LegislationSection />
        <FounderSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
