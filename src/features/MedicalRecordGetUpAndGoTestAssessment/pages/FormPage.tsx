import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGetUpAndGoTestAssessmentResource } from '../api'
import type { GetUpAndGoTestAssessmentFormValues } from '../types'

export function GetUpAndGoTestAssessmentFormPage() {
  const { create } = useGetUpAndGoTestAssessmentResource()
  const [values, setValues] = useState<GetUpAndGoTestAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah GetUpAndGoTestAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="time_seconds">Time Seconds *</Label>
        <Input id="time_seconds" type="number" value={values.time_seconds ?? ''} onChange={(e) => setValues({ ...values, time_seconds: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assistive_device">Assistive Device</Label>
        <Input id="assistive_device" type="text" value={values.assistive_device ?? ''} onChange={(e) => setValues({ ...values, assistive_device: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fall_risk">Fall Risk</Label>
        <Input id="fall_risk" type="text" value={values.fall_risk ?? ''} onChange={(e) => setValues({ ...values, fall_risk: e.target.value })} />
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
