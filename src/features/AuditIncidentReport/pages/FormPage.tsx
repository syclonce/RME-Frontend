import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useIncidentReportResource } from '../api'
import type { IncidentReportFormValues } from '../types'

export function IncidentReportFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useIncidentReportResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<IncidentReportFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as IncidentReportFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/audit-incident-report') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/audit-incident-report') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} IncidentReport</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient</Label>
        <AsyncCombobox
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
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
        <AsyncCombobox
          endpoint="/employees"
          value={values.reported_by ?? null}
          onChange={(v) => setValues({ ...values, reported_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="impact_score">Impact Score *</Label>
        <Input id="impact_score" type="number" value={values.impact_score ?? ''} onChange={(e) => setValues({ ...values, impact_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="probability_score">Probability Score *</Label>
        <Input id="probability_score" type="number" value={values.probability_score ?? ''} onChange={(e) => setValues({ ...values, probability_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
