import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useIncidentReportResource } from '../api'
import type { IncidentReportFormValues } from '../types'

export function IncidentReportFormPage() {
  const { create } = useIncidentReportResource()
  const [values, setValues] = useState<IncidentReportFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah IncidentReport</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="incident_category">Incident Category *</Label>
        <Input id="incident_category" type="text" value={values.incident_category ?? ''} onChange={(e) => setValues({ ...values, incident_category: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="description">Description *</Label>
        <Input id="description" type="text" value={values.description ?? ''} onChange={(e) => setValues({ ...values, description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="occurred_at">Occurred At *</Label>
        <Input id="occurred_at" type="date" value={values.occurred_at ?? ''} onChange={(e) => setValues({ ...values, occurred_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reported_by">Reported By *</Label>
        <Input id="reported_by" type="number" value={values.reported_by ?? ''} onChange={(e) => setValues({ ...values, reported_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="impact_score">Impact Score *</Label>
        <Input id="impact_score" type="number" value={values.impact_score ?? ''} onChange={(e) => setValues({ ...values, impact_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="probability_score">Probability Score *</Label>
        <Input id="probability_score" type="number" value={values.probability_score ?? ''} onChange={(e) => setValues({ ...values, probability_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
