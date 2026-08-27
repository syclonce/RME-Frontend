import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInventoryGoodsReturnResource } from '../api'
import type { InventoryGoodsReturnFormValues } from '../types'

export function InventoryGoodsReturnFormPage() {
  const { create } = useInventoryGoodsReturnResource()
  const [values, setValues] = useState<InventoryGoodsReturnFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InventoryGoodsReturn</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="supplier_id">Supplier *</Label>
        <Input id="supplier_id" type="number" value={values.supplier_id ?? ''} onChange={(e) => setValues({ ...values, supplier_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="returned_at">Returned At</Label>
        <Input id="returned_at" type="date" value={values.returned_at ?? ''} onChange={(e) => setValues({ ...values, returned_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason *</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
