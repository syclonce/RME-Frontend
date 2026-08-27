import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDischargePlanningScreeningResource } from '../api'
import type { DischargePlanningScreeningFormValues } from '../types'

export function DischargePlanningScreeningFormPage() {
  const { create } = useDischargePlanningScreeningResource()
  const [values, setValues] = useState<DischargePlanningScreeningFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah DischargePlanningScreening</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="screening_criteria">Screening Criteria</Label>
        <Input id="screening_criteria" type="text" value={values.screening_criteria ?? ''} onChange={(e) => setValues({ ...values, screening_criteria: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_score">Total Score</Label>
        <Input id="total_score" type="number" value={values.total_score ?? ''} onChange={(e) => setValues({ ...values, total_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="requires_planning" checked={!!values.requires_planning} onCheckedChange={(v) => setValues({ ...values, requires_planning: !!v })} />
        <Label htmlFor="requires_planning">Requires Planning</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="screened_by">Screened By *</Label>
        <Input id="screened_by" type="number" value={values.screened_by ?? ''} onChange={(e) => setValues({ ...values, screened_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="screened_at">Screened At *</Label>
        <Input id="screened_at" type="date" value={values.screened_at ?? ''} onChange={(e) => setValues({ ...values, screened_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
