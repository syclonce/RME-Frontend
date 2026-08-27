import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useVisitCancellationResource } from '../api'
import type { VisitCancellationFormValues } from '../types'

export function VisitCancellationFormPage() {
  const navigate = useNavigate()
  const { create } = useVisitCancellationResource()
  const [values, setValues] = useState<VisitCancellationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-visit-cancellation') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah VisitCancellation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="cancelled_at">Cancelled At</Label>
        <Input id="cancelled_at" type="date" value={values.cancelled_at ?? ''} onChange={(e) => setValues({ ...values, cancelled_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
