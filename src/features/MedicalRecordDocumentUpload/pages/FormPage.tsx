import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useDocumentUploadResource } from '../api'
import type { DocumentUploadFormValues } from '../types'

export function DocumentUploadFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useDocumentUploadResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<DocumentUploadFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as DocumentUploadFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-document-upload') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-document-upload') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} DocumentUpload</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <RelationSelect
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="document_name">Document Name *</Label>
        <Input id="document_name" type="text" value={values.document_name ?? ''} onChange={(e) => setValues({ ...values, document_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="document_type">Document Type</Label>
        <Input id="document_type" type="text" value={values.document_type ?? ''} onChange={(e) => setValues({ ...values, document_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="file_path">File Path *</Label>
        <Input id="file_path" type="text" value={values.file_path ?? ''} onChange={(e) => setValues({ ...values, file_path: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="file_size_bytes">File Size Bytes</Label>
        <Input id="file_size_bytes" type="number" value={values.file_size_bytes ?? ''} onChange={(e) => setValues({ ...values, file_size_bytes: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="uploaded_at">Uploaded At</Label>
        <Input id="uploaded_at" type="date" value={values.uploaded_at ?? ''} onChange={(e) => setValues({ ...values, uploaded_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
