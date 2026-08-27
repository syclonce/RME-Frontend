import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useMchatAssessmentExaminationResource } from '../api'
import type { MchatAssessmentExaminationFormValues } from '../types'

export function MchatAssessmentExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useMchatAssessmentExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<MchatAssessmentExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as MchatAssessmentExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-mchat-assessment-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-mchat-assessment-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} MchatAssessmentExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <RelationSelect
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
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
        <Label htmlFor="responses_json">Responses Json</Label>
        <Input id="responses_json" type="text" value={values.responses_json ?? ''} onChange={(e) => setValues({ ...values, responses_json: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recommendation">Recommendation</Label>
        <Input id="recommendation" type="text" value={values.recommendation ?? ''} onChange={(e) => setValues({ ...values, recommendation: e.target.value })} />
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
