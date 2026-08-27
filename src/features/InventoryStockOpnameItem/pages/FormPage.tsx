import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useInventoryStockOpnameItemResource } from '../api'
import type { InventoryStockOpnameItemFormValues } from '../types'

export function InventoryStockOpnameItemFormPage() {
  const navigate = useNavigate()
  const { create } = useInventoryStockOpnameItemResource()
  const [values, setValues] = useState<InventoryStockOpnameItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/inventory-stock-opname-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InventoryStockOpnameItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="stock_opname_id">Stock Opname *</Label>
        <RelationSelect
          endpoint="/inventorystockopnames"
          value={values.stock_opname_id ?? null}
          onChange={(v) => setValues({ ...values, stock_opname_id: v })}
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
        <Label htmlFor="system_quantity">System Quantity *</Label>
        <Input id="system_quantity" type="number" value={values.system_quantity ?? ''} onChange={(e) => setValues({ ...values, system_quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="physical_quantity">Physical Quantity *</Label>
        <Input id="physical_quantity" type="number" value={values.physical_quantity ?? ''} onChange={(e) => setValues({ ...values, physical_quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
