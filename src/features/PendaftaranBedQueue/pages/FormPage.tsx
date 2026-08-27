import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBedQueueResource } from '../api'
import type { BedQueueFormValues } from '../types'

export function BedQueueFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useBedQueueResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<BedQueueFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as BedQueueFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pendaftaran-bed-queue') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-bed-queue') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} BedQueue</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="bed_id">Bed *</Label>
        <Input id="bed_id" type="number" value={values.bed_id ?? ''} onChange={(e) => setValues({ ...values, bed_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="queue_number">Queue Number *</Label>
        <Input id="queue_number" type="number" value={values.queue_number ?? ''} onChange={(e) => setValues({ ...values, queue_number: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
