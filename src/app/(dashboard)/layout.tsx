import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { SignOutButton } from './sign-out-button'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <>
      <nav className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/buildings" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700">
              <Shield className="h-[18px] w-[18px] text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900">FlatRights</span>
          </Link>

          <div className="flex items-center gap-4">
            {user.email && <span className="text-sm text-gray-600">{user.email}</span>}
            <SignOutButton />
          </div>
        </div>
      </nav>
      <div className="flex-1 bg-stone-50">
        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">{children}</div>
      </div>
    </>
  )
}
