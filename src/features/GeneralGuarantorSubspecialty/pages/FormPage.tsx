import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGuarantorSubspecialtyResource } from '../api'
import type { GuarantorSubspecialtyFormValues } from '../types'

export function GuarantorSubspecialtyFormPage() {
  const { create } = useGuarantorSubspecialtyResource()
  const [values, setValues] = useState<GuarantorSubspecialtyFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah GuarantorSubspecialty</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="guarantor_id">Guarantor *</Label>
        <Input id="guarantor_id" type="number" value={values.guarantor_id ?? ''} onChange={(e) => setValues({ ...values, guarantor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="subspecialty_name">Subspecialty Name *</Label>
        <Input id="subspecialty_name" type="text" value={values.subspecialty_name ?? ''} onChange={(e) => setValues({ ...values, subspecialty_name: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_covered" checked={!!values.is_covered} onCheckedChange={(v) => setValues({ ...values, is_covered: !!v })} />
        <Label htmlFor="is_covered">Is Covered</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="coverage_note">Coverage Note</Label>
        <Input id="coverage_note" type="text" value={values.coverage_note ?? ''} onChange={(e) => setValues({ ...values, coverage_note: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
