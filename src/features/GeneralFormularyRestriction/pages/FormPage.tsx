import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormularyRestrictionResource } from '../api'
import type { FormularyRestrictionFormValues } from '../types'

export function FormularyRestrictionFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useFormularyRestrictionResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<FormularyRestrictionFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as FormularyRestrictionFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-formulary-restriction') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-formulary-restriction') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} FormularyRestriction</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="drug_name">Drug Name *</Label>
        <Input id="drug_name" type="text" value={values.drug_name ?? ''} onChange={(e) => setValues({ ...values, drug_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="formulary_category">Formulary Category *</Label>
        <Input id="formulary_category" type="text" value={values.formulary_category ?? ''} onChange={(e) => setValues({ ...values, formulary_category: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="requires_substitution" checked={!!values.requires_substitution} onCheckedChange={(v) => setValues({ ...values, requires_substitution: !!v })} />
        <Label htmlFor="requires_substitution">Requires Substitution</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="substitution_drug_name">Substitution Drug Name</Label>
        <Input id="substitution_drug_name" type="text" value={values.substitution_drug_name ?? ''} onChange={(e) => setValues({ ...values, substitution_drug_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
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
