import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useVisitDateChangeResource } from '../api'
import type { VisitDateChangeFormValues } from '../types'

export function VisitDateChangeFormPage() {
  const { create } = useVisitDateChangeResource()
  const [values, setValues] = useState<VisitDateChangeFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah VisitDateChange</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="old_date">Old Date *</Label>
        <Input id="old_date" type="date" value={values.old_date ?? ''} onChange={(e) => setValues({ ...values, old_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="new_date">New Date *</Label>
        <Input id="new_date" type="date" value={values.new_date ?? ''} onChange={(e) => setValues({ ...values, new_date: e.target.value })} />
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
