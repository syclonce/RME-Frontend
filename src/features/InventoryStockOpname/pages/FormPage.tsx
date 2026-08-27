import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInventoryStockOpnameResource } from '../api'
import type { InventoryStockOpnameFormValues } from '../types'

export function InventoryStockOpnameFormPage() {
  const { create } = useInventoryStockOpnameResource()
  const [values, setValues] = useState<InventoryStockOpnameFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InventoryStockOpname</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <Input id="ward_id" type="number" value={values.ward_id ?? ''} onChange={(e) => setValues({ ...values, ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="opname_date">Opname Date *</Label>
        <Input id="opname_date" type="date" value={values.opname_date ?? ''} onChange={(e) => setValues({ ...values, opname_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="conducted_by">Conducted By *</Label>
        <Input id="conducted_by" type="number" value={values.conducted_by ?? ''} onChange={(e) => setValues({ ...values, conducted_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
