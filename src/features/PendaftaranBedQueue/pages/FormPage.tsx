import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBedQueueResource } from '../api'
import type { BedQueueFormValues } from '../types'

export function BedQueueFormPage() {
  const { create } = useBedQueueResource()
  const [values, setValues] = useState<BedQueueFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BedQueue</h1>
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
