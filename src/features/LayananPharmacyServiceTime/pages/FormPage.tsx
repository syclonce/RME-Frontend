import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePharmacyServiceTimeResource } from '../api'
import type { PharmacyServiceTimeFormValues } from '../types'

export function PharmacyServiceTimeFormPage() {
  const { create } = usePharmacyServiceTimeResource()
  const [values, setValues] = useState<PharmacyServiceTimeFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PharmacyServiceTime</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_id">Prescription *</Label>
        <Input id="prescription_id" type="number" value={values.prescription_id ?? ''} onChange={(e) => setValues({ ...values, prescription_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="received_at">Received At</Label>
        <Input id="received_at" type="date" value={values.received_at ?? ''} onChange={(e) => setValues({ ...values, received_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="prepared_at">Prepared At</Label>
        <Input id="prepared_at" type="date" value={values.prepared_at ?? ''} onChange={(e) => setValues({ ...values, prepared_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dispensed_at">Dispensed At</Label>
        <Input id="dispensed_at" type="date" value={values.dispensed_at ?? ''} onChange={(e) => setValues({ ...values, dispensed_at: e.target.value })} />
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
