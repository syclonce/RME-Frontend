import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useBerkasKlaimSupportingDocumentResource } from '../api'
import type { BerkasKlaimSupportingDocumentFormValues } from '../types'

export function BerkasKlaimSupportingDocumentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useBerkasKlaimSupportingDocumentResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<BerkasKlaimSupportingDocumentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as BerkasKlaimSupportingDocumentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/berkas-klaim-supporting-document') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/berkas-klaim-supporting-document') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} BerkasKlaimSupportingDocument</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="claim_file_id">Claim File *</Label>
        <RelationSelect
          endpoint="/claim-files"
          value={values.claim_file_id ?? null}
          onChange={(v) => setValues({ ...values, claim_file_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="document_type">Document Type *</Label>
        <Input id="document_type" type="text" value={values.document_type ?? ''} onChange={(e) => setValues({ ...values, document_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="file_path">File Path *</Label>
        <Input id="file_path" type="text" value={values.file_path ?? ''} onChange={(e) => setValues({ ...values, file_path: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="uploaded_at">Uploaded At</Label>
        <Input id="uploaded_at" type="date" value={values.uploaded_at ?? ''} onChange={(e) => setValues({ ...values, uploaded_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
