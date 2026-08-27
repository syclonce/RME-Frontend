import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePrescriptionFrequencyRuleCategoryResource } from '../api'
import type { PrescriptionFrequencyRuleCategoryFormValues } from '../types'

export function PrescriptionFrequencyRuleCategoryFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = usePrescriptionFrequencyRuleCategoryResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PrescriptionFrequencyRuleCategoryFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PrescriptionFrequencyRuleCategoryFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-prescription-frequency-rule-category') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-prescription-frequency-rule-category') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PrescriptionFrequencyRuleCategory</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_frequency_rule_id">Prescription Frequency Rule *</Label>
        <Input id="prescription_frequency_rule_id" type="number" value={values.prescription_frequency_rule_id ?? ''} onChange={(e) => setValues({ ...values, prescription_frequency_rule_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="category_name">Category Name *</Label>
        <Input id="category_name" type="text" value={values.category_name ?? ''} onChange={(e) => setValues({ ...values, category_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sort_order">Sort Order</Label>
        <Input id="sort_order" type="number" value={values.sort_order ?? ''} onChange={(e) => setValues({ ...values, sort_order: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
