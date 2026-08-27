import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAntibioticRestrictionResource } from '../api'
import type { AntibioticRestrictionFormValues } from '../types'

export function AntibioticRestrictionFormPage() {
  const { create } = useAntibioticRestrictionResource()
  const [values, setValues] = useState<AntibioticRestrictionFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AntibioticRestriction</h1>
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
