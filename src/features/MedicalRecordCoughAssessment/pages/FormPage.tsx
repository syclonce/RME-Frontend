import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCoughAssessmentResource } from '../api'
import type { CoughAssessmentFormValues } from '../types'

export function CoughAssessmentFormPage() {
  const { create } = useCoughAssessmentResource()
  const [values, setValues] = useState<CoughAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah CoughAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="has_cough" checked={!!values.has_cough} onCheckedChange={(v) => setValues({ ...values, has_cough: !!v })} />
        <Label htmlFor="has_cough">Has Cough</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="duration_weeks">Duration Weeks</Label>
        <Input id="duration_weeks" type="number" value={values.duration_weeks ?? ''} onChange={(e) => setValues({ ...values, duration_weeks: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="cough_type">Cough Type</Label>
        <Input id="cough_type" type="text" value={values.cough_type ?? ''} onChange={(e) => setValues({ ...values, cough_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="other_symptoms">Other Symptoms</Label>
        <Input id="other_symptoms" type="text" value={values.other_symptoms ?? ''} onChange={(e) => setValues({ ...values, other_symptoms: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_referred_tb_screening" checked={!!values.is_referred_tb_screening} onCheckedChange={(v) => setValues({ ...values, is_referred_tb_screening: !!v })} />
        <Label htmlFor="is_referred_tb_screening">Is Referred Tb Screening</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_by">Assessed By *</Label>
        <Input id="assessed_by" type="number" value={values.assessed_by ?? ''} onChange={(e) => setValues({ ...values, assessed_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_at">Assessed At *</Label>
        <Input id="assessed_at" type="date" value={values.assessed_at ?? ''} onChange={(e) => setValues({ ...values, assessed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
