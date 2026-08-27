import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { usePharmacyOutpatientQueueResource } from '../api'
import type { PharmacyOutpatientQueueFormValues } from '../types'

export function PharmacyOutpatientQueueFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePharmacyOutpatientQueueResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PharmacyOutpatientQueueFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PharmacyOutpatientQueueFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-pharmacy-outpatient-queue') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-pharmacy-outpatient-queue') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PharmacyOutpatientQueue</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_id">Prescription *</Label>
        <AsyncCombobox
          endpoint="/prescriptions"
          value={values.prescription_id ?? null}
          onChange={(v) => setValues({ ...values, prescription_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="queue_number">Queue Number *</Label>
        <Input id="queue_number" type="text" value={values.queue_number ?? ''} onChange={(e) => setValues({ ...values, queue_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status *</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="called_at">Called At</Label>
        <Input id="called_at" type="date" value={values.called_at ?? ''} onChange={(e) => setValues({ ...values, called_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="completed_at">Completed At</Label>
        <Input id="completed_at" type="date" value={values.completed_at ?? ''} onChange={(e) => setValues({ ...values, completed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
