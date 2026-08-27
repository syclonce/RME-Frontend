import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMedicationServiceLimitResource } from '../api'
import type { MedicationServiceLimitFormValues } from '../types'

export function MedicationServiceLimitFormPage() {
  const { create } = useMedicationServiceLimitResource()
  const [values, setValues] = useState<MedicationServiceLimitFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah MedicationServiceLimit</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id">Item *</Label>
        <Input id="item_id" type="number" value={values.item_id ?? ''} onChange={(e) => setValues({ ...values, item_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="guarantor_type">Guarantor Type</Label>
        <Input id="guarantor_type" type="text" value={values.guarantor_type ?? ''} onChange={(e) => setValues({ ...values, guarantor_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="max_quantity_per_month">Max Quantity Per Month *</Label>
        <Input id="max_quantity_per_month" type="number" value={values.max_quantity_per_month ?? ''} onChange={(e) => setValues({ ...values, max_quantity_per_month: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="max_days_supply">Max Days Supply</Label>
        <Input id="max_days_supply" type="number" value={values.max_days_supply ?? ''} onChange={(e) => setValues({ ...values, max_days_supply: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
