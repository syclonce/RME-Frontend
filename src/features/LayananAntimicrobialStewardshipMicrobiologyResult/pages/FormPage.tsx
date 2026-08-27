import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useAntimicrobialStewardshipMicrobiologyResultResource } from '../api'
import type { AntimicrobialStewardshipMicrobiologyResultFormValues } from '../types'

export function AntimicrobialStewardshipMicrobiologyResultFormPage() {
  const navigate = useNavigate()
  const { create } = useAntimicrobialStewardshipMicrobiologyResultResource()
  const [values, setValues] = useState<AntimicrobialStewardshipMicrobiologyResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-antimicrobial-stewardship-microbiology-result') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AntimicrobialStewardshipMicrobiologyResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="antimicrobial_stewardship_form_id">Antimicrobial Stewardship Form *</Label>
        <RelationSelect
          endpoint="/antimicrobial-stewardship-forms"
          value={values.antimicrobial_stewardship_form_id ?? null}
          onChange={(v) => setValues({ ...values, antimicrobial_stewardship_form_id: v })}
        />
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
