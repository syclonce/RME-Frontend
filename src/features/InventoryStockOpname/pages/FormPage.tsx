import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useInventoryStockOpnameResource } from '../api'
import type { InventoryStockOpnameFormValues } from '../types'

export function InventoryStockOpnameFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useInventoryStockOpnameResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<InventoryStockOpnameFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as InventoryStockOpnameFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-stock-opname') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-stock-opname') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} InventoryStockOpname</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.ward_id ?? null}
          onChange={(v) => setValues({ ...values, ward_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="opname_date">Opname Date *</Label>
        <Input id="opname_date" type="date" value={values.opname_date ?? ''} onChange={(e) => setValues({ ...values, opname_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="conducted_by">Conducted By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.conducted_by ?? null}
          onChange={(v) => setValues({ ...values, conducted_by: v })}
        />
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
