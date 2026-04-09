// @ts-nocheck
import Link from 'next/link'
import { Plus, ArrowRight, Building2, Shield } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'

export default async function BuildingsPage() {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Fetch all buildings where user is a member
  const { data: buildings } = await supabase
    .from('building_members')
    .select('building_id')
    .eq('user_id', user.id)

  if (!buildings || buildings.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Buildings</h1>
            <p className="mt-2 text-gray-600">Manage your properties and RTM claims</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-300 bg-white px-6 py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-stone-100">
            <Building2 className="h-8 w-8 text-stone-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Add your first building</h2>
          <p className="mt-2 max-w-md text-gray-600">
            Run the free eligibility check, or add a building manually if you already know the details.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
            <Link href="/check" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-teal-700 hover:bg-teal-800")}>
              Check if you qualify
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/building/new" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "gap-2")}>
              <Plus className="h-4 w-4" />
              Add building
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Fetch building details and counts for each building
  const buildingIds = buildings.map((b) => b.building_id)

  const { data: buildingDetails } = await supabase
    .from('buildings')
    .select('id, name, address_line_1, address_line_2, city, postcode, total_flats')
    .in('id', buildingIds)

  const { data: rtmClaims } = await supabase
    .from('rtm_claims')
    .select('id, building_id, status')
    .in('building_id', buildingIds)
    .neq('status', 'withdrawn')
    .neq('status', 'failed')

  const { data: challenges } = await supabase
    .from('service_charge_challenges')
    .select('id, building_id, status')
    .in('building_id', buildingIds)
    .neq('status', 'withdrawn')

  const { data: extensions } = await supabase
    .from('lease_extensions')
    .select('id, building_id, status')
    .in('building_id', buildingIds)
    .neq('status', 'withdrawn')

  // Create a map of counts by building
  const rtmMap = new Map<string, number>()
  const challengeMap = new Map<string, number>()
  const extensionMap = new Map<string, number>()

  rtmClaims?.forEach((claim) => {
    rtmMap.set(claim.building_id, (rtmMap.get(claim.building_id) || 0) + 1)
  })

  challenges?.forEach((challenge) => {
    challengeMap.set(challenge.building_id, (challengeMap.get(challenge.building_id) || 0) + 1)
  })

  extensions?.forEach((ext) => {
    extensionMap.set(ext.building_id, (extensionMap.get(ext.building_id) || 0) + 1)
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Buildings</h1>
          <p className="mt-2 text-gray-600">Manage your properties and RTM claims</p>
        </div>
        <Link href="/building/new" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-teal-700 hover:bg-teal-800")}>
          <Plus className="h-4 w-4" />
          Add building
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {buildingDetails?.map((building) => (
          <Link key={building.id} href={`/building/${building.id}`}>
            <div className="group flex h-full flex-col gap-4 rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-teal-200 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{building.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {building.address_line_1}
                    {building.address_line_2 && `, ${building.address_line_2}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {building.city}, {building.postcode}
                  </p>
                </div>
              </div>

              <Badge variant="outline" className="w-fit bg-stone-50">
                {building.total_flats} flats
              </Badge>

              <div className="flex flex-wrap gap-2">
                {rtmMap.has(building.id) && (
                  <Badge variant="default" className="bg-teal-100 text-teal-800">
                    RTM in progress
                  </Badge>
                )}
                {challengeMap.has(building.id) && (
                  <Badge variant="default" className="bg-blue-100 text-blue-800">
                    {challengeMap.get(building.id)} challenge{(challengeMap.get(building.id) || 0) > 1 ? 's' : ''}
                  </Badge>
                )}
                {extensionMap.has(building.id) && (
                  <Badge variant="default" className="bg-purple-100 text-purple-800">
                    {extensionMap.get(building.id)} extension{(extensionMap.get(building.id) || 0) > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>

              <div className="mt-auto flex items-center gap-2 text-sm font-medium text-teal-700 group-hover:gap-3 transition-all">
                View building
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
