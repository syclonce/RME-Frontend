import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePharmacyGuarantorMarginResource } from '../api'
import type { PharmacyGuarantorMarginFormValues } from '../types'

export function PharmacyGuarantorMarginFormPage() {
  const { create } = usePharmacyGuarantorMarginResource()
  const [values, setValues] = useState<PharmacyGuarantorMarginFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PharmacyGuarantorMargin</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="guarantor_id">Guarantor *</Label>
        <Input id="guarantor_id" type="number" value={values.guarantor_id ?? ''} onChange={(e) => setValues({ ...values, guarantor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="margin_percentage">Margin Percentage *</Label>
        <Input id="margin_percentage" type="number" value={values.margin_percentage ?? ''} onChange={(e) => setValues({ ...values, margin_percentage: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="effective_date">Effective Date</Label>
        <Input id="effective_date" type="date" value={values.effective_date ?? ''} onChange={(e) => setValues({ ...values, effective_date: e.target.value })} />
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
