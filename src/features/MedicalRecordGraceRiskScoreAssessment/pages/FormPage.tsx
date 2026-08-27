import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useGraceRiskScoreAssessmentResource } from '../api'
import type { GraceRiskScoreAssessmentFormValues } from '../types'

export function GraceRiskScoreAssessmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useGraceRiskScoreAssessmentResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<GraceRiskScoreAssessmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as GraceRiskScoreAssessmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-grace-risk-score-assessment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-grace-risk-score-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} GraceRiskScoreAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="age">Age *</Label>
        <Input id="age" type="number" value={values.age ?? ''} onChange={(e) => setValues({ ...values, age: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="heart_rate">Heart Rate *</Label>
        <Input id="heart_rate" type="number" value={values.heart_rate ?? ''} onChange={(e) => setValues({ ...values, heart_rate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="systolic_bp">Systolic Bp *</Label>
        <Input id="systolic_bp" type="number" value={values.systolic_bp ?? ''} onChange={(e) => setValues({ ...values, systolic_bp: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="creatinine_mg_dl">Creatinine Mg Dl *</Label>
        <Input id="creatinine_mg_dl" type="number" value={values.creatinine_mg_dl ?? ''} onChange={(e) => setValues({ ...values, creatinine_mg_dl: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cardiac_arrest_at_admission" checked={!!values.cardiac_arrest_at_admission} onCheckedChange={(v) => setValues({ ...values, cardiac_arrest_at_admission: !!v })} />
        <Label htmlFor="cardiac_arrest_at_admission">Cardiac Arrest At Admission</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="st_segment_deviation" checked={!!values.st_segment_deviation} onCheckedChange={(v) => setValues({ ...values, st_segment_deviation: !!v })} />
        <Label htmlFor="st_segment_deviation">St Segment Deviation</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="elevated_cardiac_enzymes" checked={!!values.elevated_cardiac_enzymes} onCheckedChange={(v) => setValues({ ...values, elevated_cardiac_enzymes: !!v })} />
        <Label htmlFor="elevated_cardiac_enzymes">Elevated Cardiac Enzymes</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="killip_class">Killip Class</Label>
        <Input id="killip_class" type="number" value={values.killip_class ?? ''} onChange={(e) => setValues({ ...values, killip_class: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_score">Total Score</Label>
        <Input id="total_score" type="number" value={values.total_score ?? ''} onChange={(e) => setValues({ ...values, total_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="risk_category">Risk Category</Label>
        <Input id="risk_category" type="text" value={values.risk_category ?? ''} onChange={(e) => setValues({ ...values, risk_category: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_at">Assessed At</Label>
        <Input id="assessed_at" type="date" value={values.assessed_at ?? ''} onChange={(e) => setValues({ ...values, assessed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
