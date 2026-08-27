import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePatientNutritionProblemResource } from '../api'
import type { PatientNutritionProblemFormValues } from '../types'

export function PatientNutritionProblemFormPage() {
  const { create } = usePatientNutritionProblemResource()
  const [values, setValues] = useState<PatientNutritionProblemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PatientNutritionProblem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="identified_by">Identified By *</Label>
        <Input id="identified_by" type="number" value={values.identified_by ?? ''} onChange={(e) => setValues({ ...values, identified_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <Input id="created_by" type="number" value={values.created_by ?? ''} onChange={(e) => setValues({ ...values, created_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="problem_category">Problem Category *</Label>
        <Input id="problem_category" type="text" value={values.problem_category ?? ''} onChange={(e) => setValues({ ...values, problem_category: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="problem_description">Problem Description *</Label>
        <Input id="problem_description" type="text" value={values.problem_description ?? ''} onChange={(e) => setValues({ ...values, problem_description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="intervention_plan">Intervention Plan</Label>
        <Input id="intervention_plan" type="text" value={values.intervention_plan ?? ''} onChange={(e) => setValues({ ...values, intervention_plan: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="identified_at">Identified At</Label>
        <Input id="identified_at" type="date" value={values.identified_at ?? ''} onChange={(e) => setValues({ ...values, identified_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
