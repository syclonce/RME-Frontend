import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRavenTestExaminationResource } from '../api'
import type { RavenTestExaminationFormValues } from '../types'

export function RavenTestExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useRavenTestExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<RavenTestExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as RavenTestExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-raven-test-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-raven-test-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} RavenTestExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="test_form">Test Form</Label>
        <Input id="test_form" type="text" value={values.test_form ?? ''} onChange={(e) => setValues({ ...values, test_form: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="raw_score">Raw Score</Label>
        <Input id="raw_score" type="number" value={values.raw_score ?? ''} onChange={(e) => setValues({ ...values, raw_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="percentile">Percentile</Label>
        <Input id="percentile" type="number" value={values.percentile ?? ''} onChange={(e) => setValues({ ...values, percentile: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="iq_grade">Iq Grade</Label>
        <Input id="iq_grade" type="text" value={values.iq_grade ?? ''} onChange={(e) => setValues({ ...values, iq_grade: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examiner_notes">Examiner Notes</Label>
        <Input id="examiner_notes" type="text" value={values.examiner_notes ?? ''} onChange={(e) => setValues({ ...values, examiner_notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tested_at">Tested At</Label>
        <Input id="tested_at" type="date" value={values.tested_at ?? ''} onChange={(e) => setValues({ ...values, tested_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
