import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRadiologyResultResource } from '../api'
import type { RadiologyResultFormValues } from '../types'

export function RadiologyResultFormPage() {
  const { create } = useRadiologyResultResource()
  const [values, setValues] = useState<RadiologyResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah RadiologyResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="radiology_order_id">Radiology Order *</Label>
        <Input id="radiology_order_id" type="number" value={values.radiology_order_id ?? ''} onChange={(e) => setValues({ ...values, radiology_order_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="findings">Findings *</Label>
        <Input id="findings" type="text" value={values.findings ?? ''} onChange={(e) => setValues({ ...values, findings: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="impression">Impression</Label>
        <Input id="impression" type="text" value={values.impression ?? ''} onChange={(e) => setValues({ ...values, impression: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="radiologist_id">Radiologist</Label>
        <Input id="radiologist_id" type="number" value={values.radiologist_id ?? ''} onChange={(e) => setValues({ ...values, radiologist_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At *</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status *</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
