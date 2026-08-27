import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useQueueCallResource } from '../api'
import type { QueueCallFormValues } from '../types'

export function QueueCallFormPage() {
  const navigate = useNavigate()
  const { create } = useQueueCallResource()
  const [values, setValues] = useState<QueueCallFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-queue-call') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah QueueCall</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_queue_id">Ward Queue *</Label>
        <Input id="ward_queue_id" type="number" value={values.ward_queue_id ?? ''} onChange={(e) => setValues({ ...values, ward_queue_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="counter">Counter *</Label>
        <Input id="counter" type="text" value={values.counter ?? ''} onChange={(e) => setValues({ ...values, counter: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
