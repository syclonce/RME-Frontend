import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDischargeSummaryResource } from '../api'
import type { DischargeSummaryFormValues } from '../types'

export function DischargeSummaryFormPage() {
  const { create } = useDischargeSummaryResource()
  const [values, setValues] = useState<DischargeSummaryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah DischargeSummary</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="admission_diagnosis_id">Admission Diagnosis</Label>
        <Input id="admission_diagnosis_id" type="number" value={values.admission_diagnosis_id ?? ''} onChange={(e) => setValues({ ...values, admission_diagnosis_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="discharge_diagnosis_id">Discharge Diagnosis</Label>
        <Input id="discharge_diagnosis_id" type="number" value={values.discharge_diagnosis_id ?? ''} onChange={(e) => setValues({ ...values, discharge_diagnosis_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="treatment_summary">Treatment Summary</Label>
        <Input id="treatment_summary" type="text" value={values.treatment_summary ?? ''} onChange={(e) => setValues({ ...values, treatment_summary: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="condition_at_discharge">Condition At Discharge</Label>
        <Input id="condition_at_discharge" type="text" value={values.condition_at_discharge ?? ''} onChange={(e) => setValues({ ...values, condition_at_discharge: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="follow_up_plan">Follow Up Plan</Label>
        <Input id="follow_up_plan" type="text" value={values.follow_up_plan ?? ''} onChange={(e) => setValues({ ...values, follow_up_plan: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="discharge_medication">Discharge Medication</Label>
        <Input id="discharge_medication" type="text" value={values.discharge_medication ?? ''} onChange={(e) => setValues({ ...values, discharge_medication: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="authored_by">Authored By *</Label>
        <Input id="authored_by" type="number" value={values.authored_by ?? ''} onChange={(e) => setValues({ ...values, authored_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="authored_at">Authored At</Label>
        <Input id="authored_at" type="date" value={values.authored_at ?? ''} onChange={(e) => setValues({ ...values, authored_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
