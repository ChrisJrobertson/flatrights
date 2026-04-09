import { PricingPageClient } from './pricing-client'

export const metadata = {
  title: 'Pricing — FlatRights',
  description: 'Simple, transparent pricing for leasehold rights. One-off payments from £99. No subscriptions, no hidden fees.',
}

export default function PricingPage() {
  return <PricingPageClient />
}
