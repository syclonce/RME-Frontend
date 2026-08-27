import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCriticalLabValueResource } from '../api'
import type { CriticalLabValueFormValues } from '../types'

export function CriticalLabValueFormPage() {
  const { create } = useCriticalLabValueResource()
  const [values, setValues] = useState<CriticalLabValueFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah CriticalLabValue</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_order_id">Lab Order *</Label>
        <Input id="lab_order_id" type="number" value={values.lab_order_id ?? ''} onChange={(e) => setValues({ ...values, lab_order_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="parameter_name">Parameter Name *</Label>
        <Input id="parameter_name" type="text" value={values.parameter_name ?? ''} onChange={(e) => setValues({ ...values, parameter_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="critical_value">Critical Value *</Label>
        <Input id="critical_value" type="text" value={values.critical_value ?? ''} onChange={(e) => setValues({ ...values, critical_value: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notified_to">Notified To</Label>
        <Input id="notified_to" type="text" value={values.notified_to ?? ''} onChange={(e) => setValues({ ...values, notified_to: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notified_at">Notified At</Label>
        <Input id="notified_at" type="date" value={values.notified_at ?? ''} onChange={(e) => setValues({ ...values, notified_at: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="acknowledged" checked={!!values.acknowledged} onCheckedChange={(v) => setValues({ ...values, acknowledged: !!v })} />
        <Label htmlFor="acknowledged">Acknowledged</Label>
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
