import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInventoryGoodsReceiptCancellationResource } from '../api'
import type { InventoryGoodsReceiptCancellationFormValues } from '../types'

export function InventoryGoodsReceiptCancellationFormPage() {
  const navigate = useNavigate()
  const { create } = useInventoryGoodsReceiptCancellationResource()
  const [values, setValues] = useState<InventoryGoodsReceiptCancellationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/inventory-goods-receipt-cancellation') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InventoryGoodsReceiptCancellation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="goods_receipt_id">Goods Receipt *</Label>
        <Input id="goods_receipt_id" type="number" value={values.goods_receipt_id ?? ''} onChange={(e) => setValues({ ...values, goods_receipt_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason *</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="cancelled_at">Cancelled At</Label>
        <Input id="cancelled_at" type="date" value={values.cancelled_at ?? ''} onChange={(e) => setValues({ ...values, cancelled_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
