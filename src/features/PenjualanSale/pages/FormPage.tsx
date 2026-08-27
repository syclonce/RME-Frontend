import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSaleResource } from '../api'
import type { SaleFormValues } from '../types'

export function SaleFormPage() {
  const { create } = useSaleResource()
  const [values, setValues] = useState<SaleFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Sale</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sold_by">Sold By *</Label>
        <Input id="sold_by" type="number" value={values.sold_by ?? ''} onChange={(e) => setValues({ ...values, sold_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sold_at">Sold At</Label>
        <Input id="sold_at" type="date" value={values.sold_at ?? ''} onChange={(e) => setValues({ ...values, sold_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_amount">Total Amount *</Label>
        <Input id="total_amount" type="number" value={values.total_amount ?? ''} onChange={(e) => setValues({ ...values, total_amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
