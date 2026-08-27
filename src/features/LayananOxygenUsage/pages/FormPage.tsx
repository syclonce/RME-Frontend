import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useOxygenUsageResource } from '../api'
import type { OxygenUsageFormValues } from '../types'

export function OxygenUsageFormPage() {
  const { create } = useOxygenUsageResource()
  const [values, setValues] = useState<OxygenUsageFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah OxygenUsage</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="flow_rate_lpm">Flow Rate Lpm *</Label>
        <Input id="flow_rate_lpm" type="number" value={values.flow_rate_lpm ?? ''} onChange={(e) => setValues({ ...values, flow_rate_lpm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="method">Method *</Label>
        <Input id="method" type="text" value={values.method ?? ''} onChange={(e) => setValues({ ...values, method: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="started_at">Started At *</Label>
        <Input id="started_at" type="date" value={values.started_at ?? ''} onChange={(e) => setValues({ ...values, started_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ended_at">Ended At</Label>
        <Input id="ended_at" type="date" value={values.ended_at ?? ''} onChange={(e) => setValues({ ...values, ended_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By</Label>
        <Input id="recorded_by" type="number" value={values.recorded_by ?? ''} onChange={(e) => setValues({ ...values, recorded_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
