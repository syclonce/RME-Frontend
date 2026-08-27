import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLinenItemResource } from '../api'
import type { LinenItemFormValues } from '../types'

export function LinenItemFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useLinenItemResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<LinenItemFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as LinenItemFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-linen-tracking') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-linen-tracking') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} LinenItem</h1>
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
