import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useParentalHealthHistoryScreeningResource } from '../api'
import type { ParentalHealthHistoryScreeningFormValues } from '../types'

export function ParentalHealthHistoryScreeningFormPage() {
  const { create } = useParentalHealthHistoryScreeningResource()
  const [values, setValues] = useState<ParentalHealthHistoryScreeningFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ParentalHealthHistoryScreening</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="screened_by">Screened By *</Label>
        <Input id="screened_by" type="number" value={values.screened_by ?? ''} onChange={(e) => setValues({ ...values, screened_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <Input id="created_by" type="number" value={values.created_by ?? ''} onChange={(e) => setValues({ ...values, created_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="father_health_conditions">Father Health Conditions</Label>
        <Input id="father_health_conditions" type="text" value={values.father_health_conditions ?? ''} onChange={(e) => setValues({ ...values, father_health_conditions: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mother_health_conditions">Mother Health Conditions</Label>
        <Input id="mother_health_conditions" type="text" value={values.mother_health_conditions ?? ''} onChange={(e) => setValues({ ...values, mother_health_conditions: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="consanguinity" checked={!!values.consanguinity} onCheckedChange={(v) => setValues({ ...values, consanguinity: !!v })} />
        <Label htmlFor="consanguinity">Consanguinity</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="genetic_disorder_history">Genetic Disorder History</Label>
        <Input id="genetic_disorder_history" type="text" value={values.genetic_disorder_history ?? ''} onChange={(e) => setValues({ ...values, genetic_disorder_history: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="screened_at">Screened At</Label>
        <Input id="screened_at" type="date" value={values.screened_at ?? ''} onChange={(e) => setValues({ ...values, screened_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
