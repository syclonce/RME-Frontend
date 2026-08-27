import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAmbulanceResource } from '../api'
import type { AmbulanceFormValues } from '../types'

export function AmbulanceFormPage() {
  const { create } = useAmbulanceResource()
  const [values, setValues] = useState<AmbulanceFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Ambulance</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="vehicle_code">Vehicle Code *</Label>
        <Input id="vehicle_code" type="text" value={values.vehicle_code ?? ''} onChange={(e) => setValues({ ...values, vehicle_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="plate_number">Plate Number *</Label>
        <Input id="plate_number" type="text" value={values.plate_number ?? ''} onChange={(e) => setValues({ ...values, plate_number: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
