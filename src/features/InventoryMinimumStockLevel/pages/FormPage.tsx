import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useInventoryMinimumStockLevelResource } from '../api'
import type { InventoryMinimumStockLevelFormValues } from '../types'

export function InventoryMinimumStockLevelFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useInventoryMinimumStockLevelResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<InventoryMinimumStockLevelFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as InventoryMinimumStockLevelFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-minimum-stock-level') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-minimum-stock-level') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} InventoryMinimumStockLevel</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id">Item *</Label>
        <RelationSelect
          endpoint="/items"
          value={values.item_id ?? null}
          onChange={(v) => setValues({ ...values, item_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.ward_id ?? null}
          onChange={(v) => setValues({ ...values, ward_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="minimum_quantity">Minimum Quantity *</Label>
        <Input id="minimum_quantity" type="number" value={values.minimum_quantity ?? ''} onChange={(e) => setValues({ ...values, minimum_quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
