import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSkinPrickTestExaminationResource } from '../api'
import type { SkinPrickTestExaminationFormValues } from '../types'

export function SkinPrickTestExaminationFormPage() {
  const { create } = useSkinPrickTestExaminationResource()
  const [values, setValues] = useState<SkinPrickTestExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah SkinPrickTestExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="allergen">Allergen *</Label>
        <Input id="allergen" type="text" value={values.allergen ?? ''} onChange={(e) => setValues({ ...values, allergen: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="wheal_size_mm">Wheal Size Mm</Label>
        <Input id="wheal_size_mm" type="number" value={values.wheal_size_mm ?? ''} onChange={(e) => setValues({ ...values, wheal_size_mm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="flare_size_mm">Flare Size Mm</Label>
        <Input id="flare_size_mm" type="number" value={values.flare_size_mm ?? ''} onChange={(e) => setValues({ ...values, flare_size_mm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="result">Result</Label>
        <Input id="result" type="text" value={values.result ?? ''} onChange={(e) => setValues({ ...values, result: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reaction_onset_minutes">Reaction Onset Minutes</Label>
        <Input id="reaction_onset_minutes" type="number" value={values.reaction_onset_minutes ?? ''} onChange={(e) => setValues({ ...values, reaction_onset_minutes: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tested_at">Tested At</Label>
        <Input id="tested_at" type="date" value={values.tested_at ?? ''} onChange={(e) => setValues({ ...values, tested_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
