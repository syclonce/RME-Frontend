import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMorseFallScaleAssessmentResource } from '../api'
import type { MorseFallScaleAssessmentFormValues } from '../types'

export function MorseFallScaleAssessmentFormPage() {
  const navigate = useNavigate()
  const { create } = useMorseFallScaleAssessmentResource()
  const [values, setValues] = useState<MorseFallScaleAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-morse-fall-scale-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah MorseFallScaleAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
        <Label htmlFor="history_of_falling">History Of Falling *</Label>
        <Input id="history_of_falling" type="text" value={values.history_of_falling ?? ''} onChange={(e) => setValues({ ...values, history_of_falling: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="secondary_diagnosis">Secondary Diagnosis *</Label>
        <Input id="secondary_diagnosis" type="text" value={values.secondary_diagnosis ?? ''} onChange={(e) => setValues({ ...values, secondary_diagnosis: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ambulatory_aid">Ambulatory Aid *</Label>
        <Input id="ambulatory_aid" type="text" value={values.ambulatory_aid ?? ''} onChange={(e) => setValues({ ...values, ambulatory_aid: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="iv_therapy">Iv Therapy *</Label>
        <Input id="iv_therapy" type="text" value={values.iv_therapy ?? ''} onChange={(e) => setValues({ ...values, iv_therapy: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gait">Gait *</Label>
        <Input id="gait" type="text" value={values.gait ?? ''} onChange={(e) => setValues({ ...values, gait: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mental_status">Mental Status *</Label>
        <Input id="mental_status" type="text" value={values.mental_status ?? ''} onChange={(e) => setValues({ ...values, mental_status: e.target.value })} />
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
