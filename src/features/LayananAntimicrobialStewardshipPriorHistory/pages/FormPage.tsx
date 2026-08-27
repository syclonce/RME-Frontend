import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAntimicrobialStewardshipPriorHistoryResource } from '../api'
import type { AntimicrobialStewardshipPriorHistoryFormValues } from '../types'

export function AntimicrobialStewardshipPriorHistoryFormPage() {
  const { create } = useAntimicrobialStewardshipPriorHistoryResource()
  const [values, setValues] = useState<AntimicrobialStewardshipPriorHistoryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AntimicrobialStewardshipPriorHistory</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="antimicrobial_stewardship_form_id">Antimicrobial Stewardship Form *</Label>
        <Input id="antimicrobial_stewardship_form_id" type="number" value={values.antimicrobial_stewardship_form_id ?? ''} onChange={(e) => setValues({ ...values, antimicrobial_stewardship_form_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="previous_antibiotic">Previous Antibiotic *</Label>
        <Input id="previous_antibiotic" type="text" value={values.previous_antibiotic ?? ''} onChange={(e) => setValues({ ...values, previous_antibiotic: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="start_date">Start Date</Label>
        <Input id="start_date" type="date" value={values.start_date ?? ''} onChange={(e) => setValues({ ...values, start_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="end_date">End Date</Label>
        <Input id="end_date" type="date" value={values.end_date ?? ''} onChange={(e) => setValues({ ...values, end_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="outcome">Outcome</Label>
        <Input id="outcome" type="text" value={values.outcome ?? ''} onChange={(e) => setValues({ ...values, outcome: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
