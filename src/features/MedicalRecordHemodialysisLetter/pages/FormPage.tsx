import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useHemodialysisLetterResource } from '../api'
import type { HemodialysisLetterFormValues } from '../types'

export function HemodialysisLetterFormPage() {
  const { create } = useHemodialysisLetterResource()
  const [values, setValues] = useState<HemodialysisLetterFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah HemodialysisLetter</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="letter_number">Letter Number *</Label>
        <Input id="letter_number" type="text" value={values.letter_number ?? ''} onChange={(e) => setValues({ ...values, letter_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="doctor_id">Doctor *</Label>
        <Input id="doctor_id" type="number" value={values.doctor_id ?? ''} onChange={(e) => setValues({ ...values, doctor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="issue_date">Issue Date *</Label>
        <Input id="issue_date" type="date" value={values.issue_date ?? ''} onChange={(e) => setValues({ ...values, issue_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis">Diagnosis</Label>
        <Input id="diagnosis" type="text" value={values.diagnosis ?? ''} onChange={(e) => setValues({ ...values, diagnosis: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="hd_frequency_per_week">Hd Frequency Per Week</Label>
        <Input id="hd_frequency_per_week" type="number" value={values.hd_frequency_per_week ?? ''} onChange={(e) => setValues({ ...values, hd_frequency_per_week: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="vascular_access">Vascular Access</Label>
        <Input id="vascular_access" type="text" value={values.vascular_access ?? ''} onChange={(e) => setValues({ ...values, vascular_access: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="remarks">Remarks</Label>
        <Input id="remarks" type="text" value={values.remarks ?? ''} onChange={(e) => setValues({ ...values, remarks: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
