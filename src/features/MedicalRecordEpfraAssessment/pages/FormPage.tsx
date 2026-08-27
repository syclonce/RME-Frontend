import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEpfraAssessmentResource } from '../api'
import type { EpfraAssessmentFormValues } from '../types'

export function EpfraAssessmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useEpfraAssessmentResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<EpfraAssessmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as EpfraAssessmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-epfra-assessment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-epfra-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} EpfraAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessor_id">Assessor</Label>
        <Input id="assessor_id" type="number" value={values.assessor_id ?? ''} onChange={(e) => setValues({ ...values, assessor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="criteria_notes">Criteria Notes</Label>
        <Input id="criteria_notes" type="text" value={values.criteria_notes ?? ''} onChange={(e) => setValues({ ...values, criteria_notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="score">Score</Label>
        <Input id="score" type="number" value={values.score ?? ''} onChange={(e) => setValues({ ...values, score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="risk_level">Risk Level</Label>
        <Input id="risk_level" type="text" value={values.risk_level ?? ''} onChange={(e) => setValues({ ...values, risk_level: e.target.value })} />
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
