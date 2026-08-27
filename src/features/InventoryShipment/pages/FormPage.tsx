import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useShipmentResource } from '../api'
import type { ShipmentFormValues } from '../types'

export function ShipmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useShipmentResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ShipmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ShipmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-shipment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-shipment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Shipment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="from_ward_id">From Ward *</Label>
        <Input id="from_ward_id" type="number" value={values.from_ward_id ?? ''} onChange={(e) => setValues({ ...values, from_ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="to_ward_id">To Ward *</Label>
        <Input id="to_ward_id" type="number" value={values.to_ward_id ?? ''} onChange={(e) => setValues({ ...values, to_ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="shipped_by">Shipped By *</Label>
        <Input id="shipped_by" type="number" value={values.shipped_by ?? ''} onChange={(e) => setValues({ ...values, shipped_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="shipped_at">Shipped At</Label>
        <Input id="shipped_at" type="date" value={values.shipped_at ?? ''} onChange={(e) => setValues({ ...values, shipped_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
