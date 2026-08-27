import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useSaleItemResource } from '../api'
import type { SaleItemFormValues } from '../types'

export function SaleItemFormPage() {
  const navigate = useNavigate()
  const { create } = useSaleItemResource()
  const [values, setValues] = useState<SaleItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/penjualan-sale-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah SaleItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="sale_id">Sale *</Label>
        <RelationSelect
          endpoint="/sales"
          value={values.sale_id ?? null}
          onChange={(v) => setValues({ ...values, sale_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id">Item *</Label>
        <RelationSelect
          endpoint="/items"
          value={values.item_id ?? null}
          onChange={(v) => setValues({ ...values, item_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantity">Quantity *</Label>
        <Input id="quantity" type="number" value={values.quantity ?? ''} onChange={(e) => setValues({ ...values, quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="unit_price">Unit Price *</Label>
        <Input id="unit_price" type="number" value={values.unit_price ?? ''} onChange={(e) => setValues({ ...values, unit_price: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="subtotal">Subtotal *</Label>
        <Input id="subtotal" type="number" value={values.subtotal ?? ''} onChange={(e) => setValues({ ...values, subtotal: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
