// @ts-nocheck
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function BuildingLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Verify user is a member of this building
  const { data: member } = await supabase
    .from('building_members')
    .select('id')
    .eq('building_id', id)
    .eq('user_id', user.id)
    .single()

  if (!member) {
    redirect('/buildings')
  }

  // Fetch building name
  const { data: buildingData } = await supabase
    .from('buildings')
    .select('id, name')
    .eq('id', id)
    .single()

  if (!buildingData) {
    redirect('/buildings')
  }

  const building = buildingData as { id: string; name: string }

  const tabs = [
    { label: 'Overview', href: `/building/${id}` },
    { label: 'RTM Claim', href: `/building/${id}/claim` },
    { label: 'Consents', href: `/building/${id}/consents` },
    { label: 'Documents', href: `/building/${id}/documents` },
    { label: 'Members', href: `/building/${id}/members` },
    { label: 'Challenges', href: `/building/${id}/challenges` },
    { label: 'Extensions', href: `/building/${id}/extensions` },
    { label: 'Freehold', href: `/building/${id}/freehold` },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{building.name}</h1>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-b border-stone-200">
        {tabs.map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className="whitespace-nowrap border-b-2 border-transparent px-4 py-3 text-sm font-medium text-stone-600 transition-colors hover:border-stone-300 hover:text-slate-900"
          >
            {tab.label}
          </a>
        ))}
      </nav>

      {children}
    </div>
  )
}
