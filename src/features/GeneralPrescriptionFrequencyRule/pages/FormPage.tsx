import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePrescriptionFrequencyRuleResource } from '../api'
import type { PrescriptionFrequencyRuleFormValues } from '../types'

export function PrescriptionFrequencyRuleFormPage() {
  const { create } = usePrescriptionFrequencyRuleResource()
  const [values, setValues] = useState<PrescriptionFrequencyRuleFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PrescriptionFrequencyRule</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="code">Code *</Label>
        <Input id="code" type="text" value={values.code ?? ''} onChange={(e) => setValues({ ...values, code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input id="description" type="text" value={values.description ?? ''} onChange={(e) => setValues({ ...values, description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="times_per_day">Times Per Day *</Label>
        <Input id="times_per_day" type="number" value={values.times_per_day ?? ''} onChange={(e) => setValues({ ...values, times_per_day: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="interval_hours">Interval Hours</Label>
        <Input id="interval_hours" type="number" value={values.interval_hours ?? ''} onChange={(e) => setValues({ ...values, interval_hours: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
