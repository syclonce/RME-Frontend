import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGuarantorItemCategoryMappingResource } from '../api'
import type { GuarantorItemCategoryMappingFormValues } from '../types'

export function GuarantorItemCategoryMappingFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useGuarantorItemCategoryMappingResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<GuarantorItemCategoryMappingFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as GuarantorItemCategoryMappingFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-guarantor-item-category-mapping') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-guarantor-item-category-mapping') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} GuarantorItemCategoryMapping</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="guarantor_id">Guarantor *</Label>
        <Input id="guarantor_id" type="number" value={values.guarantor_id ?? ''} onChange={(e) => setValues({ ...values, guarantor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="item_category_id">Item Category *</Label>
        <Input id="item_category_id" type="number" value={values.item_category_id ?? ''} onChange={(e) => setValues({ ...values, item_category_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_covered" checked={!!values.is_covered} onCheckedChange={(v) => setValues({ ...values, is_covered: !!v })} />
        <Label htmlFor="is_covered">Is Covered</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="coverage_percentage">Coverage Percentage</Label>
        <Input id="coverage_percentage" type="number" value={values.coverage_percentage ?? ''} onChange={(e) => setValues({ ...values, coverage_percentage: e.target.value === '' ? null : Number(e.target.value) })} />
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
