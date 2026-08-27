import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useMedicalSupplyUsageItemResource } from '../api'
import type { MedicalSupplyUsageItemFormValues } from '../types'

export function MedicalSupplyUsageItemFormPage() {
  const navigate = useNavigate()
  const { create } = useMedicalSupplyUsageItemResource()
  const [values, setValues] = useState<MedicalSupplyUsageItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-medical-supply-usage-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah MedicalSupplyUsageItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="medical_supply_usage_id">Medical Supply Usage *</Label>
        <RelationSelect
          endpoint="/medical-supply-usages"
          value={values.medical_supply_usage_id ?? null}
          onChange={(v) => setValues({ ...values, medical_supply_usage_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id">Item *</Label>
        <RelationSelect
          endpoint="/items"
          value={values.item_id ?? null}
          onChange={(v) => setValues({ ...values, item_id: v })}
        />
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
