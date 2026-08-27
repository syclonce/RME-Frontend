import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNursingCarePlanImplementationResource } from '../api'
import type { NursingCarePlanImplementationFormValues } from '../types'

export function NursingCarePlanImplementationFormPage() {
  const { create } = useNursingCarePlanImplementationResource()
  const [values, setValues] = useState<NursingCarePlanImplementationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah NursingCarePlanImplementation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="nursing_care_plan_id">Nursing Care Plan *</Label>
        <Input id="nursing_care_plan_id" type="number" value={values.nursing_care_plan_id ?? ''} onChange={(e) => setValues({ ...values, nursing_care_plan_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="action_taken">Action Taken</Label>
        <Input id="action_taken" type="text" value={values.action_taken ?? ''} onChange={(e) => setValues({ ...values, action_taken: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="performed_by">Performed By *</Label>
        <Input id="performed_by" type="number" value={values.performed_by ?? ''} onChange={(e) => setValues({ ...values, performed_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="performed_at">Performed At *</Label>
        <Input id="performed_at" type="date" value={values.performed_at ?? ''} onChange={(e) => setValues({ ...values, performed_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="evaluation">Evaluation</Label>
        <Input id="evaluation" type="text" value={values.evaluation ?? ''} onChange={(e) => setValues({ ...values, evaluation: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
