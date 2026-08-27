import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDurationRestrictionResource } from '../api'
import type { DurationRestrictionFormValues } from '../types'

export function DurationRestrictionFormPage() {
  const { create } = useDurationRestrictionResource()
  const [values, setValues] = useState<DurationRestrictionFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah DurationRestriction</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="antibiotic_name">Antibiotic Name *</Label>
        <Input id="antibiotic_name" type="text" value={values.antibiotic_name ?? ''} onChange={(e) => setValues({ ...values, antibiotic_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="max_days">Max Days *</Label>
        <Input id="max_days" type="number" value={values.max_days ?? ''} onChange={(e) => setValues({ ...values, max_days: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="min_days">Min Days</Label>
        <Input id="min_days" type="number" value={values.min_days ?? ''} onChange={(e) => setValues({ ...values, min_days: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="requires_reevaluation" checked={!!values.requires_reevaluation} onCheckedChange={(v) => setValues({ ...values, requires_reevaluation: !!v })} />
        <Label htmlFor="requires_reevaluation">Requires Reevaluation</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
