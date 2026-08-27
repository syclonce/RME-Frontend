import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEegExaminationResource } from '../api'
import type { EegExaminationFormValues } from '../types'

export function EegExaminationFormPage() {
  const { create } = useEegExaminationResource()
  const [values, setValues] = useState<EegExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah EegExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="background_rhythm">Background Rhythm</Label>
        <Input id="background_rhythm" type="text" value={values.background_rhythm ?? ''} onChange={(e) => setValues({ ...values, background_rhythm: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="epileptiform_discharges" checked={!!values.epileptiform_discharges} onCheckedChange={(v) => setValues({ ...values, epileptiform_discharges: !!v })} />
        <Label htmlFor="epileptiform_discharges">Epileptiform Discharges</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="abnormality_type">Abnormality Type</Label>
        <Input id="abnormality_type" type="text" value={values.abnormality_type ?? ''} onChange={(e) => setValues({ ...values, abnormality_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="clinical_correlation">Clinical Correlation</Label>
        <Input id="clinical_correlation" type="text" value={values.clinical_correlation ?? ''} onChange={(e) => setValues({ ...values, clinical_correlation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="conclusion">Conclusion</Label>
        <Input id="conclusion" type="text" value={values.conclusion ?? ''} onChange={(e) => setValues({ ...values, conclusion: e.target.value })} />
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
