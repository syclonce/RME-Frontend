import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useInventoryGoodsReturnItemResource } from '../api'
import type { InventoryGoodsReturnItemFormValues } from '../types'

export function InventoryGoodsReturnItemFormPage() {
  const navigate = useNavigate()
  const { create } = useInventoryGoodsReturnItemResource()
  const [values, setValues] = useState<InventoryGoodsReturnItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/inventory-goods-return-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InventoryGoodsReturnItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="goods_return_id">Goods Return *</Label>
        <RelationSelect
          endpoint="/goods-returns"
          value={values.goods_return_id ?? null}
          onChange={(v) => setValues({ ...values, goods_return_id: v })}
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
        <Label htmlFor="unit_price">Unit Price</Label>
        <Input id="unit_price" type="number" value={values.unit_price ?? ''} onChange={(e) => setValues({ ...values, unit_price: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
