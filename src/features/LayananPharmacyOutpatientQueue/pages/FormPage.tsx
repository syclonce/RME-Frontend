import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePharmacyOutpatientQueueResource } from '../api'
import type { PharmacyOutpatientQueueFormValues } from '../types'

export function PharmacyOutpatientQueueFormPage() {
  const { create } = usePharmacyOutpatientQueueResource()
  const [values, setValues] = useState<PharmacyOutpatientQueueFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PharmacyOutpatientQueue</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_id">Prescription *</Label>
        <Input id="prescription_id" type="number" value={values.prescription_id ?? ''} onChange={(e) => setValues({ ...values, prescription_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
