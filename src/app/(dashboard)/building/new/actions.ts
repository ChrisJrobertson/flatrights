'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type CreateBuildingState = { error: string } | { success: true }

export async function createBuildingAction(
  _prev: CreateBuildingState | undefined,
  formData: FormData
): Promise<CreateBuildingState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be signed in to add a building.' }
  }

  const name = String(formData.get('name') ?? '').trim()
  const address_line_1 = String(formData.get('address_line_1') ?? '').trim()
  const address_line_2 = String(formData.get('address_line_2') ?? '').trim() || null
  const city = String(formData.get('city') ?? '').trim()
  const postcode = String(formData.get('postcode') ?? '').trim()
  const total_flatsRaw = formData.get('total_flats')
  const total_flats =
    typeof total_flatsRaw === 'string' && total_flatsRaw !== ''
      ? parseInt(total_flatsRaw, 10)
      : NaN

  if (!name || !address_line_1 || !city || !postcode) {
    return { error: 'Please fill in building name, address line 1, city, and postcode.' }
  }

  if (!Number.isFinite(total_flats) || total_flats < 2) {
    return { error: 'Total flats must be at least 2.' }
  }

  const landlord_name = String(formData.get('landlord_name') ?? '').trim() || null
  const landlord_address = String(formData.get('landlord_address') ?? '').trim() || null

  const { data: building, error: buildingError } = await supabase
    .from('buildings')
    .insert({
      name,
      address_line_1,
      address_line_2,
      city,
      postcode,
      total_flats,
      landlord_name,
      landlord_address,
      created_by: user.id,
    })
    .select('id')
    .single()

  if (buildingError || !building) {
    return {
      error: buildingError?.message ?? 'Could not create building. Check your data and try again.',
    }
  }

  const { error: memberError } = await supabase.from('building_members').insert({
    building_id: building.id,
    user_id: user.id,
    role: 'organiser',
  })

  if (memberError) {
    return {
      error:
        memberError.message +
        ' (Building was created but membership failed — contact support.)',
    }
  }

  redirect(`/building/${building.id}`)
}
