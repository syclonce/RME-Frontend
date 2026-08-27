import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBerkasKlaimSupportingDocumentResource } from '../api'
import type { BerkasKlaimSupportingDocumentFormValues } from '../types'

export function BerkasKlaimSupportingDocumentFormPage() {
  const { create } = useBerkasKlaimSupportingDocumentResource()
  const [values, setValues] = useState<BerkasKlaimSupportingDocumentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BerkasKlaimSupportingDocument</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="claim_file_id">Claim File *</Label>
        <Input id="claim_file_id" type="number" value={values.claim_file_id ?? ''} onChange={(e) => setValues({ ...values, claim_file_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
