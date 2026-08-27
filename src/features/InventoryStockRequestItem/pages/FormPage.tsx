import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useInventoryStockRequestItemResource } from '../api'
import type { InventoryStockRequestItemFormValues } from '../types'

export function InventoryStockRequestItemFormPage() {
  const navigate = useNavigate()
  const { create } = useInventoryStockRequestItemResource()
  const [values, setValues] = useState<InventoryStockRequestItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/inventory-stock-request-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InventoryStockRequestItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="stock_request_id">Stock Request *</Label>
        <RelationSelect
          endpoint="/stock-requests"
          value={values.stock_request_id ?? null}
          onChange={(v) => setValues({ ...values, stock_request_id: v })}
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
