import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useReceivingItemResource } from '../api'
import type { ReceivingItemFormValues } from '../types'

export function ReceivingItemFormPage() {
  const navigate = useNavigate()
  const { create } = useReceivingItemResource()
  const [values, setValues] = useState<ReceivingItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/inventory-receiving-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ReceivingItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="receiving_record_id">Receiving Record *</Label>
        <RelationSelect
          endpoint="/receiving-records"
          value={values.receiving_record_id ?? null}
          onChange={(v) => setValues({ ...values, receiving_record_id: v })}
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
