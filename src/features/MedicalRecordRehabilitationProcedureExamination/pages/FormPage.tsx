import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRehabilitationProcedureExaminationResource } from '../api'
import type { RehabilitationProcedureExaminationFormValues } from '../types'

export function RehabilitationProcedureExaminationFormPage() {
  const { create } = useRehabilitationProcedureExaminationResource()
  const [values, setValues] = useState<RehabilitationProcedureExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah RehabilitationProcedureExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="procedure_name">Procedure Name *</Label>
        <Input id="procedure_name" type="text" value={values.procedure_name ?? ''} onChange={(e) => setValues({ ...values, procedure_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="therapist_id">Therapist</Label>
        <Input id="therapist_id" type="number" value={values.therapist_id ?? ''} onChange={(e) => setValues({ ...values, therapist_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis_summary">Diagnosis Summary</Label>
        <Input id="diagnosis_summary" type="text" value={values.diagnosis_summary ?? ''} onChange={(e) => setValues({ ...values, diagnosis_summary: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="functional_goal">Functional Goal</Label>
        <Input id="functional_goal" type="text" value={values.functional_goal ?? ''} onChange={(e) => setValues({ ...values, functional_goal: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
