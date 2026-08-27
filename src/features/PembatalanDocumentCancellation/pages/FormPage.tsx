import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePembatalanDocumentCancellationResource } from '../api'
import type { PembatalanDocumentCancellationFormValues } from '../types'

export function PembatalanDocumentCancellationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = usePembatalanDocumentCancellationResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PembatalanDocumentCancellationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PembatalanDocumentCancellationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pembatalan-document-cancellation') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pembatalan-document-cancellation') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PembatalanDocumentCancellation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="document_id">Document *</Label>
        <Input id="document_id" type="text" value={values.document_id ?? ''} onChange={(e) => setValues({ ...values, document_id: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="document_type">Document Type *</Label>
        <Input id="document_type" type="text" value={values.document_type ?? ''} onChange={(e) => setValues({ ...values, document_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason *</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="cancellation_date">Cancellation Date *</Label>
        <Input id="cancellation_date" type="date" value={values.cancellation_date ?? ''} onChange={(e) => setValues({ ...values, cancellation_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="requested_by">Requested By *</Label>
        <Input id="requested_by" type="text" value={values.requested_by ?? ''} onChange={(e) => setValues({ ...values, requested_by: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
