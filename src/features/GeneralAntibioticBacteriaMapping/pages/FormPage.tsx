import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAntibioticBacteriaMappingResource } from '../api'
import type { AntibioticBacteriaMappingFormValues } from '../types'

export function AntibioticBacteriaMappingFormPage() {
  const { create } = useAntibioticBacteriaMappingResource()
  const [values, setValues] = useState<AntibioticBacteriaMappingFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AntibioticBacteriaMapping</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="antibiotic_name">Antibiotic Name *</Label>
        <Input id="antibiotic_name" type="text" value={values.antibiotic_name ?? ''} onChange={(e) => setValues({ ...values, antibiotic_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bacteria_name">Bacteria Name *</Label>
        <Input id="bacteria_name" type="text" value={values.bacteria_name ?? ''} onChange={(e) => setValues({ ...values, bacteria_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sensitivity_category">Sensitivity Category</Label>
        <Input id="sensitivity_category" type="text" value={values.sensitivity_category ?? ''} onChange={(e) => setValues({ ...values, sensitivity_category: e.target.value })} />
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
