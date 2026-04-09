'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  PoundSterling,
  FileText,
  Users,
  CheckCircle,
  Eye,
  Clock,
  Scale,
  Shield,
  Minus,
  Plus,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Nav } from '@/components/shared/nav'
import { Footer } from '@/components/shared/footer'
import { cn } from '@/lib/utils'

// Per-flat calculator component
function PricingCalculator() {
  const [flatCount, setFlatCount] = useState(12)

  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-xl border border-stone-200 bg-white px-8 py-6">
      <div className="flex flex-wrap items-center justify-center gap-5">
        <span className="text-[15px] font-semibold text-slate-800">
          Flats in your building:
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFlatCount(Math.max(2, flatCount - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-300 bg-white transition-colors hover:bg-stone-50"
            aria-label="Decrease flat count"
          >
            <Minus className="h-4 w-4 text-stone-600" />
          </button>
          <span className="min-w-[44px] text-center text-2xl font-bold text-teal-700">
            {flatCount}
          </span>
          <button
            onClick={() => setFlatCount(flatCount + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-300 bg-white transition-colors hover:bg-stone-50"
            aria-label="Increase flat count"
          >
            <Plus className="h-4 w-4 text-stone-600" />
          </button>
        </div>
        <span className="text-sm font-semibold text-teal-700">
          = £{Math.ceil(299 / flatCount)}/flat for RTM
        </span>
      </div>
    </div>
  )
}

// Product card component
interface ProductCardProps {
  icon: React.ReactNode
  title: string
  price: number
  unit: string
  features: string[]
  statute: string
  mostPopular?: boolean
}

function ProductCard({
  icon,
  title,
  price,
  unit,
  features,
  statute,
  mostPopular = false,
}: ProductCardProps) {
  const [hasReview, setHasReview] = useState(false)
  const totalPrice = price + (hasReview ? 99 : 0)

  return (
    <div
      className={`relative flex flex-col rounded-2xl border transition-all ${
        mostPopular
          ? 'border-teal-500 shadow-lg shadow-teal-500/10'
          : 'border-stone-200'
      } bg-white`}
    >
      {mostPopular && (
        <div className="bg-teal-700 py-2 text-center text-[13px] font-semibold tracking-wide text-white rounded-t-2xl">
          Most popular
        </div>
      )}

      <div className="flex flex-1 flex-col p-7">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
          {icon}
        </div>

        <h3 className="mb-2 text-[21px] font-bold text-slate-900">{title}</h3>

        <div className="mb-1.5">
          <span className="text-[40px] font-bold leading-none tracking-tight text-slate-900">
            £{totalPrice}
          </span>
          <span className="ml-1.5 text-[15px] text-stone-500">{unit}</span>
        </div>

        <p className="mb-5 text-sm font-medium text-teal-700">
          or £{price + 99} with solicitor review
        </p>

        {/* Review toggle */}
        <label
          className={`mb-6 flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
            hasReview
              ? 'border-teal-200 bg-teal-50'
              : 'border-stone-200 bg-stone-50'
          }`}
        >
          <Checkbox
            checked={hasReview}
            onCheckedChange={(checked) => setHasReview(checked as boolean)}
            className="h-[18px] w-[18px]"
          />
          <div>
            <span className="block text-sm font-semibold text-slate-800">
              Add solicitor review (+£99)
            </span>
            <span className="text-xs text-stone-500">
              ALEP-registered specialist reviews your documents
            </span>
          </div>
        </label>

        {/* Features */}
        <ul className="mb-6 flex flex-1 flex-col gap-2.5">
          {features.filter(Boolean).map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[14px] leading-snug text-stone-700">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <p className="mb-5 text-xs italic text-teal-600">{statute}</p>

        <Link href="/check" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
          Get started <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  )
}

export function PricingPageClient() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <Nav activePath="pricing" />

      <main className="flex-1">
        {/* Hero */}
        <section className="px-6 pb-6 pt-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mb-3 text-lg text-stone-600">
              One-off payments. No subscriptions. No hidden fees.
              Every product includes a money-back guarantee if your building is ineligible.
            </p>
            <p className="text-sm text-stone-500 italic">
              All prices include VAT where applicable.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="px-6 pb-12 pt-4 lg:px-8">
          <div className="mx-auto max-w-xl">
            <PricingCalculator />
          </div>
        </section>

        {/* Product cards */}
        <section className="px-6 pb-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <ProductCard
                icon={<Building2 className="h-6 w-6 text-teal-700" />}
                title="Right to Manage"
                price={299}
                unit="/building"
                mostPopular
                statute="Based on CLRA 2002 ss.71–113, as amended by LAFRA 2024"
                features={[
                  'Free eligibility check before you pay',
                  'Guided 14-step RTM process',
                  'Consent collection with real-time tracking',
                  'Statutory claim notice generation (s.79)',
                  'Participation notices (s.78)',
                  'Counter-notice response templates',
                  'Deadline tracking with email reminders',
                  'Multi-user building collaboration',
                  'Document compliance checklists',
                  'Money-back guarantee if ineligible',
                ]}
              />
              <ProductCard
                icon={<PoundSterling className="h-6 w-6 text-teal-700" />}
                title="Service Charge Challenge"
                price={99}
                unit="/challenge"
                statute="Under LTA 1985 ss.18–30 and s.27A"
                features={[
                  'Free reasonableness checker before you pay',
                  'Guided challenge wizard',
                  'Formal challenge letter (s.19 LTA 1985)',
                  'FTT application preparation (s.27A)',
                  'Section 20 response templates',
                  'Evidence upload and organisation',
                  'Landlord response tracking',
                  'Deadline reminders',
                  'Money-back guarantee if ineligible',
                ]}
              />
              <ProductCard
                icon={<FileText className="h-6 w-6 text-teal-700" />}
                title="Lease Extension"
                price={199}
                unit="/flat"
                statute="Under LRHUDA 1993 ss.39–62, as amended by LAFRA 2024"
                features={[
                  'Free premium calculator before you pay',
                  'Guided extension wizard',
                  's.42 initial notice generation',
                  'Counter-notice response templates (s.45)',
                  '990-year extension at peppercorn rent',
                  'Premium estimate with Sportelli rate',
                  'Counter-notice deadline tracking',
                  'FTT application deadline tracking',
                  'Money-back guarantee if ineligible',
                ]}
              />
              <ProductCard
                icon={<Users className="h-6 w-6 text-teal-700" />}
                title="Freehold Purchase"
                price={499}
                unit="/building"
                statute="Under LRHUDA 1993 ss.1–38, as amended by LAFRA 2024"
                features={[
                  'Free qualification checker before you pay',
                  'Guided enfranchisement process',
                  'Participant collection and management',
                  'Cost-share calculator (equal or proportional)',
                  's.13 initial notice generation',
                  'Counter-notice response templates (s.21)',
                  'Nominee purchaser guidance',
                  'Deadline tracking with reminders',
                  'Multi-user collaboration',
                  'Money-back guarantee if ineligible',
                ]}
              />
            </div>
          </div>
        </section>

        {/* Solicitor review explainer */}
        <section className="bg-white px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold text-slate-900">
                About the solicitor review option
              </h2>
              <p className="mx-auto max-w-xl text-base text-stone-600">
                Add £99 to any product and an ALEP-registered specialist leasehold
                solicitor will review your statutory documents before you serve them.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: <Eye className="h-5 w-5" />,
                  title: 'Expert review',
                  text: 'A specialist leasehold solicitor checks every detail of your statutory notice against the prescribed requirements',
                },
                {
                  icon: <Clock className="h-5 w-5" />,
                  title: '2 business days',
                  text: "You'll receive feedback within 2 business days. Your document is ready to serve immediately — the review is protection, not a gate",
                },
                {
                  icon: <Scale className="h-5 w-5" />,
                  title: 'ALEP registered',
                  text: 'Our partner solicitor is registered with the Association of Leasehold Enfranchisement Practitioners — the specialist body for leasehold law',
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl bg-teal-50 p-6">
                  <div className="mb-3 text-teal-700">{item.icon}</div>
                  <h4 className="mb-2 text-base font-bold text-slate-900">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-stone-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-3xl font-bold text-slate-900">
                How this compares to a solicitor
              </h2>
              <p className="text-base text-stone-600">
                Same statutory process. A fraction of the cost.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="py-4 pl-5 pr-3 text-sm font-semibold text-slate-700">Product</th>
                    <th className="px-3 py-4 text-right text-sm font-bold text-teal-700">FlatRights</th>
                    <th className="px-3 py-4 text-right text-sm font-semibold text-stone-500">Typical solicitor</th>
                    <th className="py-4 pl-3 pr-5 text-right text-sm font-bold text-teal-700">You save</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Right to Manage', fr: '£299', sol: '£1,500–£3,000', save: '£1,200+' },
                    { name: 'Service Charge Challenge', fr: '£99', sol: '£500–£2,000', save: '£400+' },
                    { name: 'Lease Extension', fr: '£199', sol: '£1,500–£5,000', save: '£1,300+' },
                    { name: 'Freehold Purchase', fr: '£499', sol: '£3,000–£10,000', save: '£2,500+' },
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-stone-100">
                      <td className="py-4 pl-5 pr-3 text-sm font-medium text-slate-800">{row.name}</td>
                      <td className="px-3 py-4 text-right text-sm font-bold text-teal-700">{row.fr}</td>
                      <td className="px-3 py-4 text-right text-sm text-stone-400 line-through">{row.sol}</td>
                      <td className="py-4 pl-3 pr-5 text-right text-sm font-bold text-teal-700">{row.save}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-center text-xs italic text-stone-500">
              Solicitor costs based on publicly available fee guides from UK leasehold
              specialists (2024–2025). Does not include premium costs for lease extensions
              or enfranchisement, which are paid to the landlord separately.
            </p>
          </div>
        </section>

        {/* Trust badges */}
        <section className="bg-white px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex flex-wrap justify-center gap-8">
              {[
                { icon: <Shield className="h-[18px] w-[18px]" />, text: 'Information tool, not legal advice' },
                { icon: <CheckCircle className="h-[18px] w-[18px]" />, text: 'Money-back guarantee if ineligible' },
                { icon: <Scale className="h-[18px] w-[18px]" />, text: 'Companies House registered' },
                { icon: <Building2 className="h-[18px] w-[18px]" />, text: 'ICO registered' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-stone-600">
                  <span className="text-teal-600">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone-500">
              FlatRights is an information tool that helps leaseholders exercise their
              statutory rights. It is not a legal service and does not provide legal advice.
              Documents are structured to follow the prescribed statutory format and cite
              the specific section of law they are based on. For complex situations, we
              recommend adding the solicitor review option.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-b from-teal-700 to-teal-800 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-3 text-3xl font-bold text-white">
              Not sure where to start?
            </h2>
            <p className="mb-8 text-lg text-teal-200">
              Our free eligibility checker tells you what you qualify for in 60 seconds.
            </p>
            <Link href="/check" className={cn(buttonVariants({ size: "lg" }), "bg-white text-teal-700 hover:bg-white/90 font-bold text-base px-8")}>
              Check if your building qualifies <span className="ml-1">→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
