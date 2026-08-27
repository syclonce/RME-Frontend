import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTreatmentProtocolStepDrugResource } from '../api'
import type { TreatmentProtocolStepDrugFormValues } from '../types'

export function TreatmentProtocolStepDrugFormPage() {
  const { create } = useTreatmentProtocolStepDrugResource()
  const [values, setValues] = useState<TreatmentProtocolStepDrugFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah TreatmentProtocolStepDrug</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="treatment_protocol_step_id">Treatment Protocol Step *</Label>
        <Input id="treatment_protocol_step_id" type="number" value={values.treatment_protocol_step_id ?? ''} onChange={(e) => setValues({ ...values, treatment_protocol_step_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="drug_name">Drug Name *</Label>
        <Input id="drug_name" type="text" value={values.drug_name ?? ''} onChange={(e) => setValues({ ...values, drug_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dosage">Dosage *</Label>
        <Input id="dosage" type="text" value={values.dosage ?? ''} onChange={(e) => setValues({ ...values, dosage: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="frequency">Frequency *</Label>
        <Input id="frequency" type="text" value={values.frequency ?? ''} onChange={(e) => setValues({ ...values, frequency: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="route">Route</Label>
        <Input id="route" type="text" value={values.route ?? ''} onChange={(e) => setValues({ ...values, route: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
