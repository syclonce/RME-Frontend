import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useGeneralScannedDocumentResource } from '../api'
import type { GeneralScannedDocumentFormValues } from '../types'

export function GeneralScannedDocumentFormPage() {
  const navigate = useNavigate()
  const { create } = useGeneralScannedDocumentResource()
  const [values, setValues] = useState<GeneralScannedDocumentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/general-scanned-document') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah GeneralScannedDocument</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient</Label>
        <AsyncCombobox
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
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
        <Label htmlFor="scanned_at">Scanned At *</Label>
        <Input id="scanned_at" type="date" value={values.scanned_at ?? ''} onChange={(e) => setValues({ ...values, scanned_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="scanned_by">Scanned By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.scanned_by ?? null}
          onChange={(v) => setValues({ ...values, scanned_by: v })}
        />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
