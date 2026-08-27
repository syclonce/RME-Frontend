import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useInventoryGoodsReturnResource } from '../api'
import type { InventoryGoodsReturnFormValues } from '../types'

export function InventoryGoodsReturnFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useInventoryGoodsReturnResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<InventoryGoodsReturnFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as InventoryGoodsReturnFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-goods-return') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-goods-return') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} InventoryGoodsReturn</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="supplier_id">Supplier *</Label>
        <RelationSelect
          endpoint="/suppliers"
          value={values.supplier_id ?? null}
          onChange={(v) => setValues({ ...values, supplier_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="returned_at">Returned At</Label>
        <Input id="returned_at" type="date" value={values.returned_at ?? ''} onChange={(e) => setValues({ ...values, returned_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason *</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
