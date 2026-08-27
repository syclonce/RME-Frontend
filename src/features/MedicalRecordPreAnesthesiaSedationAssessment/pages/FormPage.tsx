import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePreAnesthesiaSedationAssessmentResource } from '../api'
import type { PreAnesthesiaSedationAssessmentFormValues } from '../types'

export function PreAnesthesiaSedationAssessmentFormPage() {
  const navigate = useNavigate()
  const { create } = usePreAnesthesiaSedationAssessmentResource()
  const [values, setValues] = useState<PreAnesthesiaSedationAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-pre-anesthesia-sedation-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PreAnesthesiaSedationAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="doctor_id">Doctor *</Label>
        <RelationSelect
          endpoint="/doctors"
          value={values.doctor_id ?? null}
          onChange={(v) => setValues({ ...values, doctor_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <RelationSelect
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="asa_classification">Asa Classification *</Label>
        <Input id="asa_classification" type="text" value={values.asa_classification ?? ''} onChange={(e) => setValues({ ...values, asa_classification: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mallampati_class">Mallampati Class</Label>
        <Input id="mallampati_class" type="number" value={values.mallampati_class ?? ''} onChange={(e) => setValues({ ...values, mallampati_class: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="npo_hours">Npo Hours</Label>
        <Input id="npo_hours" type="number" value={values.npo_hours ?? ''} onChange={(e) => setValues({ ...values, npo_hours: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="comorbidities">Comorbidities</Label>
        <Input id="comorbidities" type="text" value={values.comorbidities ?? ''} onChange={(e) => setValues({ ...values, comorbidities: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="planned_anesthesia_type">Planned Anesthesia Type</Label>
        <Input id="planned_anesthesia_type" type="text" value={values.planned_anesthesia_type ?? ''} onChange={(e) => setValues({ ...values, planned_anesthesia_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="risk_notes">Risk Notes</Label>
        <Input id="risk_notes" type="text" value={values.risk_notes ?? ''} onChange={(e) => setValues({ ...values, risk_notes: e.target.value })} />
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
