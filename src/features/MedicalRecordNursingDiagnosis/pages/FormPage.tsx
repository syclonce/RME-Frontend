import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNursingDiagnosisResource } from '../api'
import type { NursingDiagnosisFormValues } from '../types'

export function NursingDiagnosisFormPage() {
  const { create } = useNursingDiagnosisResource()
  const [values, setValues] = useState<NursingDiagnosisFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah NursingDiagnosis</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis_label">Diagnosis Label *</Label>
        <Input id="diagnosis_label" type="text" value={values.diagnosis_label ?? ''} onChange={(e) => setValues({ ...values, diagnosis_label: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="related_factors">Related Factors</Label>
        <Input id="related_factors" type="text" value={values.related_factors ?? ''} onChange={(e) => setValues({ ...values, related_factors: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="defining_characteristics">Defining Characteristics</Label>
        <Input id="defining_characteristics" type="text" value={values.defining_characteristics ?? ''} onChange={(e) => setValues({ ...values, defining_characteristics: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="priority">Priority</Label>
        <Input id="priority" type="text" value={values.priority ?? ''} onChange={(e) => setValues({ ...values, priority: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By *</Label>
        <Input id="recorded_by" type="number" value={values.recorded_by ?? ''} onChange={(e) => setValues({ ...values, recorded_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At *</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
