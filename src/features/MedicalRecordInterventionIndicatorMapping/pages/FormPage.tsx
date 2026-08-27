import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInterventionIndicatorMappingResource } from '../api'
import type { InterventionIndicatorMappingFormValues } from '../types'

export function InterventionIndicatorMappingFormPage() {
  const { create } = useInterventionIndicatorMappingResource()
  const [values, setValues] = useState<InterventionIndicatorMappingFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InterventionIndicatorMapping</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="intervention_code">Intervention Code *</Label>
        <Input id="intervention_code" type="text" value={values.intervention_code ?? ''} onChange={(e) => setValues({ ...values, intervention_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="intervention_name">Intervention Name *</Label>
        <Input id="intervention_name" type="text" value={values.intervention_name ?? ''} onChange={(e) => setValues({ ...values, intervention_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="indicator_code">Indicator Code *</Label>
        <Input id="indicator_code" type="text" value={values.indicator_code ?? ''} onChange={(e) => setValues({ ...values, indicator_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="indicator_name">Indicator Name *</Label>
        <Input id="indicator_name" type="text" value={values.indicator_name ?? ''} onChange={(e) => setValues({ ...values, indicator_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="evaluation_criteria">Evaluation Criteria</Label>
        <Input id="evaluation_criteria" type="text" value={values.evaluation_criteria ?? ''} onChange={(e) => setValues({ ...values, evaluation_criteria: e.target.value })} />
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
