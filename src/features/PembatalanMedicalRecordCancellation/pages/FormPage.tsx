import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePembatalanMedicalRecordCancellationResource } from '../api'
import type { PembatalanMedicalRecordCancellationFormValues } from '../types'

export function PembatalanMedicalRecordCancellationFormPage() {
  const { create } = usePembatalanMedicalRecordCancellationResource()
  const [values, setValues] = useState<PembatalanMedicalRecordCancellationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PembatalanMedicalRecordCancellation</h1>
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
