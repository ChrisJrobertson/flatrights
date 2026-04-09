// @ts-nocheck
import { redirect } from 'next/navigation'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import type { BuildingRole } from '@/types/database'

function getRoleBadge(role: BuildingRole) {
  const roleMap: Record<BuildingRole, { label: string; className: string }> = {
    organiser: { label: 'Organiser', className: 'bg-teal-100 text-teal-800' },
    member: { label: 'Member', className: 'bg-blue-100 text-blue-800' },
    viewer: { label: 'Viewer', className: 'bg-stone-100 text-stone-800' },
  }

  const config = roleMap[role]
  return <Badge className={config.className}>{config.label}</Badge>
}

function formatDate(dateString: string | null | undefined) {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function getConsentBadge(consentGiven: boolean | null) {
  if (consentGiven === null || consentGiven === undefined) {
    return <Badge variant="outline" className="bg-stone-50">Pending</Badge>
  }
  if (consentGiven) {
    return <Badge className="bg-green-100 text-green-800">Consent given</Badge>
  }
  return <Badge className="bg-red-100 text-red-800">Declined</Badge>
}

export default async function MembersPage({
  params,
}: {
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

  // Fetch all members for this building with their profile data
  const { data: membersRaw } = await supabase
    .from('building_members')
    .select('id, user_id, flat_number, role, joined_at, consent_given, invited_email')
    .eq('building_id', id)
    .order('flat_number', { ascending: true })

  type MemberRow = {
    id: string
    user_id: string
    flat_number: string | null
    role: string
    joined_at: string | null
    consent_given: boolean | null
    invited_email: string | null
  }

  const members = (membersRaw || []) as MemberRow[]

  // Fetch profile names for members with user_ids
  const userIds = members.map((m) => m.user_id).filter(Boolean)
  let profileMap = new Map<string, { full_name: string | null; email: string | null }>()

  if (userIds.length > 0) {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .in('id', userIds)

    type ProfileRow = { id: string; full_name: string | null; email: string | null }
    const profileRows = (profiles || []) as ProfileRow[]
    profileMap = new Map(profileRows.map((p) => [p.id, { full_name: p.full_name, email: p.email }]))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Members</h2>
          <p className="mt-1 text-gray-600">
            {members?.length || 0} member{(members?.length || 0) !== 1 ? 's' : ''}
          </p>
        </div>
        <Button size="lg" className="gap-2 bg-teal-700 hover:bg-teal-800">
          <Plus className="h-4 w-4" />
          Invite member
        </Button>
      </div>

      {!members || members.length === 0 ? (
        <Card className="border-stone-200 bg-white p-12 text-center">
          <p className="text-gray-600">No members yet</p>
        </Card>
      ) : (
        <Card className="overflow-hidden border-stone-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Flat
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Consent
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {members.map((m, idx) => {
                  const profile = profileMap.get(m.user_id)
                  return (
                    <tr key={m.id} className="hover:bg-stone-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {m.flat_number || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {profile?.full_name || m.invited_email || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {profile?.email || m.invited_email || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {getRoleBadge(m.role as BuildingRole)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(m.joined_at)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {getConsentBadge(m.consent_given)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
