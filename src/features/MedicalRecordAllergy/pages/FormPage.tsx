import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAllergyResource } from '../api'
import type { AllergyFormValues } from '../types'

export function AllergyFormPage() {
  const { create } = useAllergyResource()
  const [values, setValues] = useState<AllergyFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Allergy</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="category">Category *</Label>
        <Input id="category" type="text" value={values.category ?? ''} onChange={(e) => setValues({ ...values, category: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="allergen">Allergen *</Label>
        <Input id="allergen" type="text" value={values.allergen ?? ''} onChange={(e) => setValues({ ...values, allergen: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reaction">Reaction</Label>
        <Input id="reaction" type="text" value={values.reaction ?? ''} onChange={(e) => setValues({ ...values, reaction: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="severity">Severity</Label>
        <Input id="severity" type="text" value={values.severity ?? ''} onChange={(e) => setValues({ ...values, severity: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By *</Label>
        <Input id="recorded_by" type="number" value={values.recorded_by ?? ''} onChange={(e) => setValues({ ...values, recorded_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
