import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLinenItemResource } from '../api'
import type { LinenItemFormValues } from '../types'

export function LinenItemFormPage() {
  const { create } = useLinenItemResource()
  const [values, setValues] = useState<LinenItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah LinenItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="linen_item_id">Linen Item *</Label>
        <Input id="linen_item_id" type="number" value={values.linen_item_id ?? ''} onChange={(e) => setValues({ ...values, linen_item_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sent_at">Sent At</Label>
        <Input id="sent_at" type="date" value={values.sent_at ?? ''} onChange={(e) => setValues({ ...values, sent_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" type="number" value={values.quantity ?? ''} onChange={(e) => setValues({ ...values, quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
