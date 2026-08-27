import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInhalantAllergenExaminationResource } from '../api'
import type { InhalantAllergenExaminationFormValues } from '../types'

export function InhalantAllergenExaminationFormPage() {
  const { create } = useInhalantAllergenExaminationResource()
  const [values, setValues] = useState<InhalantAllergenExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InhalantAllergenExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="allergen_name">Allergen Name *</Label>
        <Input id="allergen_name" type="text" value={values.allergen_name ?? ''} onChange={(e) => setValues({ ...values, allergen_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reaction_grade">Reaction Grade</Label>
        <Input id="reaction_grade" type="text" value={values.reaction_grade ?? ''} onChange={(e) => setValues({ ...values, reaction_grade: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="wheal_diameter_mm">Wheal Diameter Mm</Label>
        <Input id="wheal_diameter_mm" type="number" value={values.wheal_diameter_mm ?? ''} onChange={(e) => setValues({ ...values, wheal_diameter_mm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="erythema_diameter_mm">Erythema Diameter Mm</Label>
        <Input id="erythema_diameter_mm" type="number" value={values.erythema_diameter_mm ?? ''} onChange={(e) => setValues({ ...values, erythema_diameter_mm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="interpretation">Interpretation</Label>
        <Input id="interpretation" type="text" value={values.interpretation ?? ''} onChange={(e) => setValues({ ...values, interpretation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
