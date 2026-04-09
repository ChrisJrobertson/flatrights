// @ts-nocheck
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Plus, ArrowRight, Users, FileText, PoundSterling, Clock, Shield } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'
import type { RtmStatus } from '@/types/database'

function formatDate(dateString: string | null | undefined) {
  if (!dateString) return null
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function daysUntilDeadline(deadline: string | null | undefined) {
  if (!deadline) return null
  const deadlineDate = new Date(deadline)
  const today = new Date()
  const diffTime = deadlineDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

function getRtmStatusBadge(status: RtmStatus) {
  const statusMap: Record<RtmStatus, { label: string; className: string }> = {
    draft: { label: 'Draft', className: 'bg-stone-100 text-stone-800' },
    gathering_consent: { label: 'Gathering consent', className: 'bg-blue-100 text-blue-800' },
    company_formed: { label: 'Company formed', className: 'bg-blue-100 text-blue-800' },
    participation_notices_served: { label: 'Notices served', className: 'bg-yellow-100 text-yellow-800' },
    claim_notice_served: { label: 'Claim notice served', className: 'bg-yellow-100 text-yellow-800' },
    counter_notice_period: { label: 'Counter notice period', className: 'bg-orange-100 text-orange-800' },
    counter_notice_received: { label: 'Counter notice received', className: 'bg-orange-100 text-orange-800' },
    determination_pending: { label: 'Determination pending', className: 'bg-purple-100 text-purple-800' },
    determination_applied: { label: 'Determination applied', className: 'bg-purple-100 text-purple-800' },
    rtm_acquired: { label: 'RTM acquired', className: 'bg-green-100 text-green-800' },
    failed: { label: 'Failed', className: 'bg-red-100 text-red-800' },
    withdrawn: { label: 'Withdrawn', className: 'bg-red-100 text-red-800' },
  }

  const config = statusMap[status] || { label: status, className: 'bg-stone-100 text-stone-800' }
  return <Badge className={config.className}>{config.label}</Badge>
}

export default async function BuildingOverviewPage({
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

  // Verify user is a member and fetch building
  const { data: building } = await supabase
    .from('buildings')
    .select('*')
    .eq('id', id)
    .single()

  if (!building) {
    redirect('/buildings')
  }

  const { data: member } = await supabase
    .from('building_members')
    .select('id')
    .eq('building_id', id)
    .eq('user_id', user.id)
    .single()

  if (!member) {
    redirect('/buildings')
  }

  // Fetch stats
  const { data: members } = await supabase
    .from('building_members')
    .select('id')
    .eq('building_id', id)

  const { data: rtmClaim } = await supabase
    .from('rtm_claims')
    .select('*')
    .eq('building_id', id)
    .neq('status', 'withdrawn')
    .neq('status', 'failed')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const { data: challenges } = await supabase
    .from('service_charge_challenges')
    .select('*')
    .eq('building_id', id)
    .neq('status', 'withdrawn')

  const { data: extensions } = await supabase
    .from('lease_extensions')
    .select('*')
    .eq('building_id', id)
    .neq('status', 'withdrawn')

  const { data: freehold } = await supabase
    .from('enfranchisement_claims')
    .select('*')
    .eq('building_id', id)
    .neq('status', 'withdrawn')
    .neq('status', 'failed')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  // Fetch next task if RTM claim exists
  let nextTask = null
  if (rtmClaim) {
    const { data: tasks } = await supabase
      .from('rtm_tasks')
      .select('*')
      .eq('claim_id', rtmClaim.id)
      .neq('status', 'completed')
      .neq('status', 'skipped')
      .order('sort_order', { ascending: true })
      .limit(1)
      .single()

    nextTask = tasks
  }

  // Calculate RTM consent progress if gathering consent
  let consentProgress = null
  if (rtmClaim?.status === 'gathering_consent') {
    const { data: consents } = await supabase
      .from('rtm_consents')
      .select('consent_given')
      .eq('claim_id', rtmClaim.id)

    if (consents) {
      const given = consents.filter((c) => c.consent_given).length
      consentProgress = { given, total: consents.length }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{building.name}</h2>
            <p className="mt-1 text-gray-600">
              {building.address_line_1}
              {building.address_line_2 && `, ${building.address_line_2}`}
            </p>
            <p className="text-gray-600">
              {building.city}, {building.postcode}
            </p>
          </div>
          <Badge variant="outline" className="bg-stone-50">
            {building.total_flats} flats
          </Badge>
        </div>
        {members && (
          <p className="mt-4 text-sm text-gray-600">
            {members.length} member{members.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Product Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* RTM Card */}
        <Card className="border-stone-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Right to Manage (RTM)</h3>
              {rtmClaim ? (
                <div className="mt-3 space-y-3">
                  <div>{getRtmStatusBadge(rtmClaim.status)}</div>

                  {consentProgress && (
                    <div>
                      <p className="text-sm text-gray-600">
                        Consent progress: {consentProgress.given} of {consentProgress.total}
                      </p>
                      <div className="mt-2 h-2 w-full rounded-full bg-stone-200">
                        <div
                          className="h-full rounded-full bg-teal-700 transition-all"
                          style={{
                            width: `${(consentProgress.given / consentProgress.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {nextTask && (
                    <div>
                      <p className="text-sm font-medium text-gray-900">{nextTask.title}</p>
                      {nextTask.due_date && (
                        <p className="text-xs text-gray-600">
                          Due: {formatDate(nextTask.due_date)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-600">Not started</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Link href={`/building/${id}/claim`} className={cn(buttonVariants({ size: "sm" }), "gap-2 bg-teal-700 hover:bg-teal-800")}>
              {rtmClaim ? 'Continue' : 'Start RTM claim'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>

        {/* Service Charges Card */}
        <Card className="border-stone-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Service Charges</h3>
              <p className="mt-3 text-lg font-semibold text-gray-900">
                {challenges?.length || 0} challenge{(challenges?.length || 0) !== 1 ? 's' : ''}
              </p>
              {challenges && challenges.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Total disputed:{' '}
                    <span className="font-semibold text-gray-900">
                      £
                      {challenges
                        .reduce((sum, c) => sum + (c.disputed_amount || 0), 0)
                        .toLocaleString()}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Latest: {challenges[0].status}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Link href={`/building/${id}/challenges`} className={cn(buttonVariants({ size: "sm", variant: "outline" }), "gap-2")}>
              {challenges && challenges.length > 0 ? 'View' : 'New challenge'}
            </Link>
          </div>
        </Card>

        {/* Lease Extensions Card */}
        <Card className="border-stone-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Lease Extensions</h3>
              <p className="mt-3 text-sm text-gray-600">
                {extensions?.length || 0} extension{(extensions?.length || 0) !== 1 ? 's' : ''}
              </p>
              {extensions && extensions.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-600">
                    Latest deadline: Pending
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Link href={`/building/${id}/extensions`} className={cn(buttonVariants({ size: "sm", variant: "outline" }), "gap-2")}>
              {extensions && extensions.length > 0 ? 'View' : 'New extension'}
            </Link>
          </div>
        </Card>

        {/* Freehold Card */}
        <Card className="border-stone-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Freehold (Enfranchisement)</h3>
              {freehold ? (
                <div className="mt-3 space-y-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    {freehold.status}
                  </Badge>
                  {freehold.participating_flats && (
                    <p className="text-sm text-gray-600">
                      Participants: {freehold.participating_flats}
                    </p>
                  )}
                  {freehold.estimated_cost_per_flat && (
                    <p className="text-sm text-gray-600">
                      Est. cost per flat: £{freehold.estimated_cost_per_flat.toLocaleString()}
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-600">Not started</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Link href={`/building/${id}/freehold`} className={cn(buttonVariants({ size: "sm", variant: "outline" }), "gap-2")}>
              {freehold ? 'Continue' : 'Start'}
            </Link>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-stone-200 bg-stone-50 p-6">
        <h3 className="font-semibold text-gray-900">Quick actions</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={`/building/${id}/members`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}>
            <Users className="h-4 w-4" />
            Invite neighbours
          </Link>
          <Link href={`/building/${id}/documents`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}>
            <FileText className="h-4 w-4" />
            Generate document
          </Link>
          <Link href={`/building/${id}/documents`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}>
            <FileText className="h-4 w-4" />
            View all documents
          </Link>
        </div>
      </Card>
    </div>
  )
}
