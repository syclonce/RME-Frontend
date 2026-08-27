import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePatientEscortResource } from '../api'
import type { PatientEscortFormValues } from '../types'

export function PatientEscortFormPage() {
  const { create } = usePatientEscortResource()
  const [values, setValues] = useState<PatientEscortFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PatientEscort</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="registration_id">Registration *</Label>
        <Input id="registration_id" type="number" value={values.registration_id ?? ''} onChange={(e) => setValues({ ...values, registration_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="full_name">Full Name *</Label>
        <Input id="full_name" type="text" value={values.full_name ?? ''} onChange={(e) => setValues({ ...values, full_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="relationship_to_patient">Relationship To Patient *</Label>
        <Input id="relationship_to_patient" type="text" value={values.relationship_to_patient ?? ''} onChange={(e) => setValues({ ...values, relationship_to_patient: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input id="phone_number" type="text" value={values.phone_number ?? ''} onChange={(e) => setValues({ ...values, phone_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="address">Address</Label>
        <Input id="address" type="text" value={values.address ?? ''} onChange={(e) => setValues({ ...values, address: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="arrival_mode">Arrival Mode</Label>
        <Input id="arrival_mode" type="text" value={values.arrival_mode ?? ''} onChange={(e) => setValues({ ...values, arrival_mode: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
