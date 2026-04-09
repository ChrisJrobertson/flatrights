'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Nav({ activePath }: { activePath?: string }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-[18px] w-[18px] text-white" />
          </div>
          <span className="font-heading text-[21px] font-bold tracking-tight text-foreground">
            FlatRights
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link
            href="/#products"
            className={`text-[15px] transition-colors hover:text-primary ${
              activePath === 'products' ? 'font-semibold text-primary' : 'text-muted-foreground'
            }`}
          >
            Products
          </Link>
          <Link
            href="/pricing"
            className={`text-[15px] transition-colors hover:text-primary ${
              activePath === 'pricing' ? 'font-semibold text-primary' : 'text-muted-foreground'
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/#faq"
            className={`text-[15px] transition-colors hover:text-primary ${
              activePath === 'faq' ? 'font-semibold text-primary' : 'text-muted-foreground'
            }`}
          >
            FAQ
          </Link>
          <Link
            href="/guides"
            className={`text-[15px] transition-colors hover:text-primary ${
              activePath === 'guides' ? 'font-semibold text-primary' : 'text-muted-foreground'
            }`}
          >
            Guides
          </Link>
          <Link href="/check" className={cn(buttonVariants({ size: "sm" }))}>
            Check eligibility
          </Link>
        </div>
      </div>
    </nav>
  )
}
