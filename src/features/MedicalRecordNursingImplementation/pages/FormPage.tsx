import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNursingImplementationResource } from '../api'
import type { NursingImplementationFormValues } from '../types'

export function NursingImplementationFormPage() {
  const { create } = useNursingImplementationResource()
  const [values, setValues] = useState<NursingImplementationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah NursingImplementation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="nursing_diagnosis_id">Nursing Diagnosis *</Label>
        <Input id="nursing_diagnosis_id" type="number" value={values.nursing_diagnosis_id ?? ''} onChange={(e) => setValues({ ...values, nursing_diagnosis_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
        <Label htmlFor="patient_response">Patient Response</Label>
        <Input id="patient_response" type="text" value={values.patient_response ?? ''} onChange={(e) => setValues({ ...values, patient_response: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
