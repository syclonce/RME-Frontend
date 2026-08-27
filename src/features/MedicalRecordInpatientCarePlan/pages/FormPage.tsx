import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInpatientCarePlanResource } from '../api'
import type { InpatientCarePlanFormValues } from '../types'

export function InpatientCarePlanFormPage() {
  const { create } = useInpatientCarePlanResource()
  const [values, setValues] = useState<InpatientCarePlanFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InpatientCarePlan</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="planned_by">Planned By *</Label>
        <Input id="planned_by" type="number" value={values.planned_by ?? ''} onChange={(e) => setValues({ ...values, planned_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <Input id="created_by" type="number" value={values.created_by ?? ''} onChange={(e) => setValues({ ...values, created_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="care_goals">Care Goals *</Label>
        <Input id="care_goals" type="text" value={values.care_goals ?? ''} onChange={(e) => setValues({ ...values, care_goals: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="planned_length_of_stay_days">Planned Length Of Stay Days</Label>
        <Input id="planned_length_of_stay_days" type="number" value={values.planned_length_of_stay_days ?? ''} onChange={(e) => setValues({ ...values, planned_length_of_stay_days: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="discharge_criteria">Discharge Criteria</Label>
        <Input id="discharge_criteria" type="text" value={values.discharge_criteria ?? ''} onChange={(e) => setValues({ ...values, discharge_criteria: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="planned_at">Planned At</Label>
        <Input id="planned_at" type="date" value={values.planned_at ?? ''} onChange={(e) => setValues({ ...values, planned_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
