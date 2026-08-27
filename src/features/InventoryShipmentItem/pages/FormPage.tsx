import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useShipmentItemResource } from '../api'
import type { ShipmentItemFormValues } from '../types'

export function ShipmentItemFormPage() {
  const navigate = useNavigate()
  const { create } = useShipmentItemResource()
  const [values, setValues] = useState<ShipmentItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/inventory-shipment-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ShipmentItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="shipment_id">Shipment *</Label>
        <Input id="shipment_id" type="number" value={values.shipment_id ?? ''} onChange={(e) => setValues({ ...values, shipment_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id">Item *</Label>
        <Input id="item_id" type="number" value={values.item_id ?? ''} onChange={(e) => setValues({ ...values, item_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantity">Quantity *</Label>
        <Input id="quantity" type="number" value={values.quantity ?? ''} onChange={(e) => setValues({ ...values, quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
