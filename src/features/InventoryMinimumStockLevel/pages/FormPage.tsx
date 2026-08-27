import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInventoryMinimumStockLevelResource } from '../api'
import type { InventoryMinimumStockLevelFormValues } from '../types'

export function InventoryMinimumStockLevelFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useInventoryMinimumStockLevelResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<InventoryMinimumStockLevelFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as InventoryMinimumStockLevelFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-minimum-stock-level') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-minimum-stock-level') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} InventoryMinimumStockLevel</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id">Item *</Label>
        <Input id="item_id" type="number" value={values.item_id ?? ''} onChange={(e) => setValues({ ...values, item_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward</Label>
        <Input id="ward_id" type="number" value={values.ward_id ?? ''} onChange={(e) => setValues({ ...values, ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="minimum_quantity">Minimum Quantity *</Label>
        <Input id="minimum_quantity" type="number" value={values.minimum_quantity ?? ''} onChange={(e) => setValues({ ...values, minimum_quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
