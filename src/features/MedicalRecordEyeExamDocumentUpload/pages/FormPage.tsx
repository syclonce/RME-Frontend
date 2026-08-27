import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useEyeExamDocumentUploadResource } from '../api'
import type { EyeExamDocumentUploadFormValues } from '../types'

export function EyeExamDocumentUploadFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useEyeExamDocumentUploadResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<EyeExamDocumentUploadFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as EyeExamDocumentUploadFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-eye-exam-document-upload') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-eye-exam-document-upload') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} EyeExamDocumentUpload</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <AsyncCombobox
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="doctor_id">Doctor</Label>
        <RelationSelect
          endpoint="/doctors"
          value={values.doctor_id ?? null}
          onChange={(v) => setValues({ ...values, doctor_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="exam_date">Exam Date *</Label>
        <Input id="exam_date" type="date" value={values.exam_date ?? ''} onChange={(e) => setValues({ ...values, exam_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="file_path">File Path *</Label>
        <Input id="file_path" type="text" value={values.file_path ?? ''} onChange={(e) => setValues({ ...values, file_path: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="eye_side">Eye Side</Label>
        <Input id="eye_side" type="text" value={values.eye_side ?? ''} onChange={(e) => setValues({ ...values, eye_side: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="findings">Findings</Label>
        <Input id="findings" type="text" value={values.findings ?? ''} onChange={(e) => setValues({ ...values, findings: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
