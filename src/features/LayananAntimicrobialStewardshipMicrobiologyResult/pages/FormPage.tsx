import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAntimicrobialStewardshipMicrobiologyResultResource } from '../api'
import type { AntimicrobialStewardshipMicrobiologyResultFormValues } from '../types'

export function AntimicrobialStewardshipMicrobiologyResultFormPage() {
  const { create } = useAntimicrobialStewardshipMicrobiologyResultResource()
  const [values, setValues] = useState<AntimicrobialStewardshipMicrobiologyResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AntimicrobialStewardshipMicrobiologyResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="antimicrobial_stewardship_form_id">Antimicrobial Stewardship Form *</Label>
        <Input id="antimicrobial_stewardship_form_id" type="number" value={values.antimicrobial_stewardship_form_id ?? ''} onChange={(e) => setValues({ ...values, antimicrobial_stewardship_form_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="specimen_type">Specimen Type *</Label>
        <Input id="specimen_type" type="text" value={values.specimen_type ?? ''} onChange={(e) => setValues({ ...values, specimen_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="organism_found">Organism Found</Label>
        <Input id="organism_found" type="text" value={values.organism_found ?? ''} onChange={(e) => setValues({ ...values, organism_found: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sensitivity_result">Sensitivity Result</Label>
        <Input id="sensitivity_result" type="text" value={values.sensitivity_result ?? ''} onChange={(e) => setValues({ ...values, sensitivity_result: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At *</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
