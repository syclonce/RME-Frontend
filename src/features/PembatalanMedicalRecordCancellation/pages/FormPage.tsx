import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePembatalanMedicalRecordCancellationResource } from '../api'
import type { PembatalanMedicalRecordCancellationFormValues } from '../types'

export function PembatalanMedicalRecordCancellationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePembatalanMedicalRecordCancellationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PembatalanMedicalRecordCancellationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PembatalanMedicalRecordCancellationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pembatalan-medical-record-cancellation') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pembatalan-medical-record-cancellation') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PembatalanMedicalRecordCancellation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="medical_record_id">Medical Record *</Label>
        <Input id="medical_record_id" type="text" value={values.medical_record_id ?? ''} onChange={(e) => setValues({ ...values, medical_record_id: e.target.value })} />
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
