import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSterilizationCycleResource } from '../api'
import type { SterilizationCycleFormValues } from '../types'

export function SterilizationCycleFormPage() {
  const { create } = useSterilizationCycleResource()
  const [values, setValues] = useState<SterilizationCycleFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah SterilizationCycle</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="machine_name">Machine Name *</Label>
        <Input id="machine_name" type="text" value={values.machine_name ?? ''} onChange={(e) => setValues({ ...values, machine_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="temperature_celsius">Temperature Celsius *</Label>
        <Input id="temperature_celsius" type="number" value={values.temperature_celsius ?? ''} onChange={(e) => setValues({ ...values, temperature_celsius: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pressure_bar">Pressure Bar *</Label>
        <Input id="pressure_bar" type="number" value={values.pressure_bar ?? ''} onChange={(e) => setValues({ ...values, pressure_bar: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="duration_minutes">Duration Minutes *</Label>
        <Input id="duration_minutes" type="number" value={values.duration_minutes ?? ''} onChange={(e) => setValues({ ...values, duration_minutes: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="started_at">Started At *</Label>
        <Input id="started_at" type="date" value={values.started_at ?? ''} onChange={(e) => setValues({ ...values, started_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="completed_at">Completed At</Label>
        <Input id="completed_at" type="date" value={values.completed_at ?? ''} onChange={(e) => setValues({ ...values, completed_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="biological_indicator_result">Biological Indicator Result</Label>
        <Input id="biological_indicator_result" type="text" value={values.biological_indicator_result ?? ''} onChange={(e) => setValues({ ...values, biological_indicator_result: e.target.value })} />
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
