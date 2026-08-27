import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePressureUlcerRiskAssessmentResource } from '../api'
import type { PressureUlcerRiskAssessmentFormValues } from '../types'

export function PressureUlcerRiskAssessmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePressureUlcerRiskAssessmentResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PressureUlcerRiskAssessmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PressureUlcerRiskAssessmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-pressure-ulcer-risk-assessment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-pressure-ulcer-risk-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PressureUlcerRiskAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sensory_perception">Sensory Perception</Label>
        <Input id="sensory_perception" type="number" value={values.sensory_perception ?? ''} onChange={(e) => setValues({ ...values, sensory_perception: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="moisture">Moisture</Label>
        <Input id="moisture" type="number" value={values.moisture ?? ''} onChange={(e) => setValues({ ...values, moisture: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="activity">Activity</Label>
        <Input id="activity" type="number" value={values.activity ?? ''} onChange={(e) => setValues({ ...values, activity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mobility">Mobility</Label>
        <Input id="mobility" type="number" value={values.mobility ?? ''} onChange={(e) => setValues({ ...values, mobility: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="nutrition">Nutrition</Label>
        <Input id="nutrition" type="number" value={values.nutrition ?? ''} onChange={(e) => setValues({ ...values, nutrition: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="friction_shear">Friction Shear</Label>
        <Input id="friction_shear" type="number" value={values.friction_shear ?? ''} onChange={(e) => setValues({ ...values, friction_shear: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_score">Total Score</Label>
        <Input id="total_score" type="number" value={values.total_score ?? ''} onChange={(e) => setValues({ ...values, total_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="risk_level">Risk Level</Label>
        <Select value={values.risk_level ?? ''} onValueChange={(v) => setValues({ ...values, risk_level: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="no_risk" value="no_risk">No Risk</SelectItem>
            <SelectItem key="mild_risk" value="mild_risk">Mild Risk</SelectItem>
            <SelectItem key="moderate_risk" value="moderate_risk">Moderate Risk</SelectItem>
            <SelectItem key="high_risk" value="high_risk">High Risk</SelectItem>
          </SelectContent>
        </Select>
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
