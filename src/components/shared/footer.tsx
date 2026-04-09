import Link from 'next/link'
import { Shield } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 px-6 py-12 text-[13px] text-slate-400 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-12">
        {/* Brand + disclaimer */}
        <div className="max-w-xs">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Shield className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-base font-bold text-white">FlatRights</span>
          </div>
          <p className="mb-3 leading-relaxed">
            FlatRights is an information tool that helps leaseholders exercise
            their statutory rights. It is not a legal service and does not
            provide legal advice.
          </p>
          <p className="leading-relaxed">
            Companies House: [number]
            <br />
            ICO Registration: [number]
          </p>
        </div>

        {/* Products */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Products</h4>
          <div className="flex flex-col gap-2">
            <Link href="/pricing" className="hover:text-white transition-colors">Right to Manage</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Service Charge Challenge</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Lease Extension</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Freehold Purchase</Link>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Resources</h4>
          <div className="flex flex-col gap-2">
            <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
            <Link href="/check" className="hover:text-white transition-colors">Eligibility Checker</Link>
            <Link href="/tools" className="hover:text-white transition-colors">Lease Calculator</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Legal</h4>
          <div className="flex flex-col gap-2">
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/refunds" className="hover:text-white transition-colors">Refund Policy</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} FlatRights Ltd. All rights reserved.
        Registered in England and Wales.
      </div>
    </footer>
  )
}
