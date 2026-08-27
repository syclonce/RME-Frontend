import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMedicalSupplyUsageItemResource } from '../api'
import type { MedicalSupplyUsageItemFormValues } from '../types'

export function MedicalSupplyUsageItemFormPage() {
  const { create } = useMedicalSupplyUsageItemResource()
  const [values, setValues] = useState<MedicalSupplyUsageItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah MedicalSupplyUsageItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="medical_supply_usage_id">Medical Supply Usage *</Label>
        <Input id="medical_supply_usage_id" type="number" value={values.medical_supply_usage_id ?? ''} onChange={(e) => setValues({ ...values, medical_supply_usage_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
        <Label htmlFor="unit">Unit</Label>
        <Input id="unit" type="text" value={values.unit ?? ''} onChange={(e) => setValues({ ...values, unit: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
