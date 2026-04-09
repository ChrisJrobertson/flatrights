'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createBuildingAction, type CreateBuildingState } from './actions'

const initialState: CreateBuildingState | undefined = undefined

export function NewBuildingForm() {
  const [state, formAction, isPending] = useActionState(createBuildingAction, initialState)

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <Link
          href="/buildings"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to buildings
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Add a building</h1>
        <p className="mt-2 text-slate-600">
          Enter your building details. You can add RTM or other claims from the building dashboard.
        </p>
      </div>

      <form action={formAction} className="space-y-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        {state && 'error' in state && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
            {state.error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Building name</Label>
          <Input id="name" name="name" required placeholder="e.g. Riverside Court" autoComplete="organization" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address_line_1">Address line 1</Label>
          <Input id="address_line_1" name="address_line_1" required placeholder="Street and number" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address_line_2">Address line 2 (optional)</Label>
          <Input id="address_line_2" name="address_line_2" placeholder="Area, unit name" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city">City / town</Label>
            <Input id="city" name="city" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postcode">Postcode</Label>
            <Input id="postcode" name="postcode" required className="uppercase" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="total_flats">Total flats in building</Label>
          <Input
            id="total_flats"
            name="total_flats"
            type="number"
            min={2}
            required
            placeholder="2 or more"
          />
          <p className="text-xs text-stone-500">Minimum 2 for most statutory processes.</p>
        </div>

        <div className="border-t border-stone-100 pt-4">
          <p className="mb-3 text-sm font-medium text-slate-800">Landlord (optional for now)</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="landlord_name">Landlord or management company name</Label>
              <Input id="landlord_name" name="landlord_name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landlord_address">Landlord correspondence address</Label>
              <Input id="landlord_address" name="landlord_address" placeholder="If known" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/buildings"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'inline-flex h-10 items-center justify-center px-4 text-center'
            )}
          >
            Cancel
          </Link>
          <Button type="submit" disabled={isPending} className="bg-teal-700 hover:bg-teal-800">
            {isPending ? 'Saving…' : 'Create building'}
          </Button>
        </div>
      </form>
    </div>
  )
}
