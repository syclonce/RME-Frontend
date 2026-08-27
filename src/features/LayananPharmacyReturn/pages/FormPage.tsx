import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePharmacyReturnResource } from '../api'
import type { PharmacyReturnFormValues } from '../types'

export function PharmacyReturnFormPage() {
  const { create } = usePharmacyReturnResource()
  const [values, setValues] = useState<PharmacyReturnFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PharmacyReturn</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_item_id">Prescription Item *</Label>
        <Input id="prescription_item_id" type="number" value={values.prescription_item_id ?? ''} onChange={(e) => setValues({ ...values, prescription_item_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantity_returned">Quantity Returned *</Label>
        <Input id="quantity_returned" type="number" value={values.quantity_returned ?? ''} onChange={(e) => setValues({ ...values, quantity_returned: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason *</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="returned_by">Returned By *</Label>
        <Input id="returned_by" type="number" value={values.returned_by ?? ''} onChange={(e) => setValues({ ...values, returned_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="returned_at">Returned At *</Label>
        <Input id="returned_at" type="date" value={values.returned_at ?? ''} onChange={(e) => setValues({ ...values, returned_at: e.target.value })} />
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
