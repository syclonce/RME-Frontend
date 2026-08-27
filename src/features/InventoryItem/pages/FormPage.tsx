import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useItemResource } from '../api'
import type { ItemFormValues } from '../types'

export function ItemFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useItemResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ItemFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ItemFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-item') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-item') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Item</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="code">Code</Label>
        <Input id="code" type="text" value={values.code ?? ''} onChange={(e) => setValues({ ...values, code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="category">Category</Label>
        <Input id="category" type="text" value={values.category ?? ''} onChange={(e) => setValues({ ...values, category: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="unit">Unit *</Label>
        <Input id="unit" type="text" value={values.unit ?? ''} onChange={(e) => setValues({ ...values, unit: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="brand">Brand</Label>
        <Input id="brand" type="text" value={values.brand ?? ''} onChange={(e) => setValues({ ...values, brand: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_generic" checked={!!values.is_generic} onCheckedChange={(v) => setValues({ ...values, is_generic: !!v })} />
        <Label htmlFor="is_generic">Is Generic</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_formulary" checked={!!values.is_formulary} onCheckedChange={(v) => setValues({ ...values, is_formulary: !!v })} />
        <Label htmlFor="is_formulary">Is Formulary</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="buy_price">Buy Price</Label>
        <Input id="buy_price" type="number" value={values.buy_price ?? ''} onChange={(e) => setValues({ ...values, buy_price: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sell_price">Sell Price</Label>
        <Input id="sell_price" type="number" value={values.sell_price ?? ''} onChange={(e) => setValues({ ...values, sell_price: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="stock_quantity">Stock Quantity</Label>
        <Input id="stock_quantity" type="number" value={values.stock_quantity ?? ''} onChange={(e) => setValues({ ...values, stock_quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
