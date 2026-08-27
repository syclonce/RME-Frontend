import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStockRequestResource } from '../api'
import type { StockRequestFormValues } from '../types'

export function StockRequestFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useStockRequestResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<StockRequestFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as StockRequestFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-stock-request') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-stock-request') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} StockRequest</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <Input id="ward_id" type="number" value={values.ward_id ?? ''} onChange={(e) => setValues({ ...values, ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id">Item *</Label>
        <Input id="item_id" type="number" value={values.item_id ?? ''} onChange={(e) => setValues({ ...values, item_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantity">Quantity *</Label>
        <Input id="quantity" type="number" value={values.quantity ?? ''} onChange={(e) => setValues({ ...values, quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="requested_at">Requested At</Label>
        <Input id="requested_at" type="date" value={values.requested_at ?? ''} onChange={(e) => setValues({ ...values, requested_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
