import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePressureUlcerRiskAssessmentResource } from '../api'
import type { PressureUlcerRiskAssessmentFormValues } from '../types'

export function PressureUlcerRiskAssessmentFormPage() {
  const { create } = usePressureUlcerRiskAssessmentResource()
  const [values, setValues] = useState<PressureUlcerRiskAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PressureUlcerRiskAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
