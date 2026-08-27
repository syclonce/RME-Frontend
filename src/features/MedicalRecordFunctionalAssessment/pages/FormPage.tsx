import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFunctionalAssessmentResource } from '../api'
import type { FunctionalAssessmentFormValues } from '../types'

export function FunctionalAssessmentFormPage() {
  const { create } = useFunctionalAssessmentResource()
  const [values, setValues] = useState<FunctionalAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah FunctionalAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessment_date">Assessment Date *</Label>
        <Input id="assessment_date" type="date" value={values.assessment_date ?? ''} onChange={(e) => setValues({ ...values, assessment_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mobility_status">Mobility Status</Label>
        <Input id="mobility_status" type="text" value={values.mobility_status ?? ''} onChange={(e) => setValues({ ...values, mobility_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="adl_score">Adl Score</Label>
        <Input id="adl_score" type="number" value={values.adl_score ?? ''} onChange={(e) => setValues({ ...values, adl_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assistive_device">Assistive Device</Label>
        <Input id="assistive_device" type="text" value={values.assistive_device ?? ''} onChange={(e) => setValues({ ...values, assistive_device: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_by">Assessed By *</Label>
        <Input id="assessed_by" type="number" value={values.assessed_by ?? ''} onChange={(e) => setValues({ ...values, assessed_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
