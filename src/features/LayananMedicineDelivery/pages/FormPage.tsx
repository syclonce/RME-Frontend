import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMedicineDeliveryResource } from '../api'
import type { MedicineDeliveryFormValues } from '../types'

export function MedicineDeliveryFormPage() {
  const { create } = useMedicineDeliveryResource()
  const [values, setValues] = useState<MedicineDeliveryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah MedicineDelivery</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="pharmacy_dispense_id">Pharmacy Dispense *</Label>
        <Input id="pharmacy_dispense_id" type="number" value={values.pharmacy_dispense_id ?? ''} onChange={(e) => setValues({ ...values, pharmacy_dispense_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_address">Patient Address *</Label>
        <Input id="patient_address" type="text" value={values.patient_address ?? ''} onChange={(e) => setValues({ ...values, patient_address: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="requested_at">Requested At</Label>
        <Input id="requested_at" type="date" value={values.requested_at ?? ''} onChange={(e) => setValues({ ...values, requested_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
