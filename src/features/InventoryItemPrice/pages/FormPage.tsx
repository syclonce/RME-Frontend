import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInventoryItemPriceResource } from '../api'
import type { InventoryItemPriceFormValues } from '../types'

export function InventoryItemPriceFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useInventoryItemPriceResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<InventoryItemPriceFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as InventoryItemPriceFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-item-price') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-item-price') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} InventoryItemPrice</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id">Item *</Label>
        <Input id="item_id" type="number" value={values.item_id ?? ''} onChange={(e) => setValues({ ...values, item_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="price">Price *</Label>
        <Input id="price" type="number" value={values.price ?? ''} onChange={(e) => setValues({ ...values, price: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="effective_date">Effective Date *</Label>
        <Input id="effective_date" type="date" value={values.effective_date ?? ''} onChange={(e) => setValues({ ...values, effective_date: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
