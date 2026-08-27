import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDeviceDayResource } from '../api'
import type { DeviceDayFormValues } from '../types'

export function DeviceDayFormPage() {
  const { create } = useDeviceDayResource()
  const [values, setValues] = useState<DeviceDayFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah DeviceDay</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="device_type">Device Type *</Label>
        <Input id="device_type" type="text" value={values.device_type ?? ''} onChange={(e) => setValues({ ...values, device_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="inserted_at">Inserted At *</Label>
        <Input id="inserted_at" type="date" value={values.inserted_at ?? ''} onChange={(e) => setValues({ ...values, inserted_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="removed_at">Removed At</Label>
        <Input id="removed_at" type="date" value={values.removed_at ?? ''} onChange={(e) => setValues({ ...values, removed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
