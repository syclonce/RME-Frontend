import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useInventoryItemSerialNumberResource } from '../api'
import type { InventoryItemSerialNumberFormValues } from '../types'

export function InventoryItemSerialNumberFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useInventoryItemSerialNumberResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<InventoryItemSerialNumberFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as InventoryItemSerialNumberFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-item-serial-number') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-item-serial-number') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} InventoryItemSerialNumber</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_item_stock_id">Ward Item Stock *</Label>
        <RelationSelect
          endpoint="/inventorywarditemstocks"
          value={values.ward_item_stock_id ?? null}
          onChange={(v) => setValues({ ...values, ward_item_stock_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="serial_number">Serial Number *</Label>
        <Input id="serial_number" type="text" value={values.serial_number ?? ''} onChange={(e) => setValues({ ...values, serial_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="expiry_date">Expiry Date</Label>
        <Input id="expiry_date" type="date" value={values.expiry_date ?? ''} onChange={(e) => setValues({ ...values, expiry_date: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
