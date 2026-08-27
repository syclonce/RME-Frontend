import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { usePatientNutritionProblemResource } from '../api'
import type { PatientNutritionProblemFormValues } from '../types'

export function PatientNutritionProblemFormPage() {
  const navigate = useNavigate()
  const { create } = usePatientNutritionProblemResource()
  const [values, setValues] = useState<PatientNutritionProblemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-patient-nutrition-problem') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PatientNutritionProblem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="identified_by">Identified By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.identified_by ?? null}
          onChange={(v) => setValues({ ...values, identified_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <AsyncCombobox
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
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
        <Select value={values.status ?? ''} onValueChange={(v) => setValues({ ...values, status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="open" value="open">Open</SelectItem>
            <SelectItem key="in_progress" value="in_progress">In Progress</SelectItem>
            <SelectItem key="resolved" value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
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
