import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAntibioticRestrictionResource } from '../api'
import type { AntibioticRestrictionFormValues } from '../types'

export function AntibioticRestrictionFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useAntibioticRestrictionResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<AntibioticRestrictionFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as AntibioticRestrictionFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-antibiotic-restriction') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-antibiotic-restriction') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} AntibioticRestriction</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="antibiotic_name">Antibiotic Name *</Label>
        <Input id="antibiotic_name" type="text" value={values.antibiotic_name ?? ''} onChange={(e) => setValues({ ...values, antibiotic_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="aware_category">Aware Category *</Label>
        <Input id="aware_category" type="text" value={values.aware_category ?? ''} onChange={(e) => setValues({ ...values, aware_category: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="requires_pra_approval" checked={!!values.requires_pra_approval} onCheckedChange={(v) => setValues({ ...values, requires_pra_approval: !!v })} />
        <Label htmlFor="requires_pra_approval">Requires Pra Approval</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="restriction_condition">Restriction Condition</Label>
        <Input id="restriction_condition" type="text" value={values.restriction_condition ?? ''} onChange={(e) => setValues({ ...values, restriction_condition: e.target.value })} />
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
