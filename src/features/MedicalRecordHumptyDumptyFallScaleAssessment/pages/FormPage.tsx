import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useHumptyDumptyFallScaleAssessmentResource } from '../api'
import type { HumptyDumptyFallScaleAssessmentFormValues } from '../types'

export function HumptyDumptyFallScaleAssessmentFormPage() {
  const navigate = useNavigate()
  const { create } = useHumptyDumptyFallScaleAssessmentResource()
  const [values, setValues] = useState<HumptyDumptyFallScaleAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-humpty-dumpty-fall-scale-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah HumptyDumptyFallScaleAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_by">Assessed By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.assessed_by ?? null}
          onChange={(v) => setValues({ ...values, assessed_by: v })}
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
        <Label htmlFor="age_score">Age Score *</Label>
        <Input id="age_score" type="number" value={values.age_score ?? ''} onChange={(e) => setValues({ ...values, age_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gender_score">Gender Score *</Label>
        <Input id="gender_score" type="number" value={values.gender_score ?? ''} onChange={(e) => setValues({ ...values, gender_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis_score">Diagnosis Score *</Label>
        <Input id="diagnosis_score" type="number" value={values.diagnosis_score ?? ''} onChange={(e) => setValues({ ...values, diagnosis_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="cognitive_impairment_score">Cognitive Impairment Score *</Label>
        <Input id="cognitive_impairment_score" type="number" value={values.cognitive_impairment_score ?? ''} onChange={(e) => setValues({ ...values, cognitive_impairment_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="environmental_score">Environmental Score *</Label>
        <Input id="environmental_score" type="number" value={values.environmental_score ?? ''} onChange={(e) => setValues({ ...values, environmental_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="surgery_sedation_score">Surgery Sedation Score *</Label>
        <Input id="surgery_sedation_score" type="number" value={values.surgery_sedation_score ?? ''} onChange={(e) => setValues({ ...values, surgery_sedation_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="medication_score">Medication Score *</Label>
        <Input id="medication_score" type="number" value={values.medication_score ?? ''} onChange={(e) => setValues({ ...values, medication_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_score">Total Score *</Label>
        <Input id="total_score" type="number" value={values.total_score ?? ''} onChange={(e) => setValues({ ...values, total_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="risk_level">Risk Level *</Label>
        <Input id="risk_level" type="text" value={values.risk_level ?? ''} onChange={(e) => setValues({ ...values, risk_level: e.target.value })} />
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
