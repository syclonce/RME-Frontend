import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInventoryItemSerialNumberResource } from '../api'
import type { InventoryItemSerialNumberFormValues } from '../types'

export function InventoryItemSerialNumberFormPage() {
  const { create } = useInventoryItemSerialNumberResource()
  const [values, setValues] = useState<InventoryItemSerialNumberFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InventoryItemSerialNumber</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_item_stock_id">Ward Item Stock *</Label>
        <Input id="ward_item_stock_id" type="number" value={values.ward_item_stock_id ?? ''} onChange={(e) => setValues({ ...values, ward_item_stock_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="serial_number">Serial Number *</Label>
        <Input id="serial_number" type="text" value={values.serial_number ?? ''} onChange={(e) => setValues({ ...values, serial_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="expiry_date">Expiry Date</Label>
        <Input id="expiry_date" type="date" value={values.expiry_date ?? ''} onChange={(e) => setValues({ ...values, expiry_date: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
