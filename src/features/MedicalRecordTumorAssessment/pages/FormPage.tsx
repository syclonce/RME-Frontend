import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTumorAssessmentResource } from '../api'
import type { TumorAssessmentFormValues } from '../types'

export function TumorAssessmentFormPage() {
  const navigate = useNavigate()
  const { create } = useTumorAssessmentResource()
  const [values, setValues] = useState<TumorAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-tumor-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah TumorAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis_id">Diagnosis</Label>
        <Input id="diagnosis_id" type="number" value={values.diagnosis_id ?? ''} onChange={(e) => setValues({ ...values, diagnosis_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_by">Assessed By *</Label>
        <Input id="assessed_by" type="number" value={values.assessed_by ?? ''} onChange={(e) => setValues({ ...values, assessed_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <Input id="created_by" type="number" value={values.created_by ?? ''} onChange={(e) => setValues({ ...values, created_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tumor_location">Tumor Location *</Label>
        <Input id="tumor_location" type="text" value={values.tumor_location ?? ''} onChange={(e) => setValues({ ...values, tumor_location: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="size_cm">Size Cm</Label>
        <Input id="size_cm" type="number" value={values.size_cm ?? ''} onChange={(e) => setValues({ ...values, size_cm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tnm_t">Tnm T</Label>
        <Input id="tnm_t" type="text" value={values.tnm_t ?? ''} onChange={(e) => setValues({ ...values, tnm_t: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tnm_n">Tnm N</Label>
        <Input id="tnm_n" type="text" value={values.tnm_n ?? ''} onChange={(e) => setValues({ ...values, tnm_n: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tnm_m">Tnm M</Label>
        <Input id="tnm_m" type="text" value={values.tnm_m ?? ''} onChange={(e) => setValues({ ...values, tnm_m: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="grade">Grade</Label>
        <Input id="grade" type="text" value={values.grade ?? ''} onChange={(e) => setValues({ ...values, grade: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_at">Assessed At</Label>
        <Input id="assessed_at" type="date" value={values.assessed_at ?? ''} onChange={(e) => setValues({ ...values, assessed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
