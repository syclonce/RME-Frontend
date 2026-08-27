import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAdmissionDiagnosisResource } from '../api'
import type { AdmissionDiagnosisFormValues } from '../types'

export function AdmissionDiagnosisFormPage() {
  const { create } = useAdmissionDiagnosisResource()
  const [values, setValues] = useState<AdmissionDiagnosisFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AdmissionDiagnosis</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis_code_id">Diagnosis Code *</Label>
        <Input id="diagnosis_code_id" type="number" value={values.diagnosis_code_id ?? ''} onChange={(e) => setValues({ ...values, diagnosis_code_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis_text">Diagnosis Text</Label>
        <Input id="diagnosis_text" type="text" value={values.diagnosis_text ?? ''} onChange={(e) => setValues({ ...values, diagnosis_text: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_primary" checked={!!values.is_primary} onCheckedChange={(v) => setValues({ ...values, is_primary: !!v })} />
        <Label htmlFor="is_primary">Is Primary</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosed_at">Diagnosed At</Label>
        <Input id="diagnosed_at" type="date" value={values.diagnosed_at ?? ''} onChange={(e) => setValues({ ...values, diagnosed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
