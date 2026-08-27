import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGenitalExaminationResource } from '../api'
import type { GenitalExaminationFormValues } from '../types'

export function GenitalExaminationFormPage() {
  const { create } = useGenitalExaminationResource()
  const [values, setValues] = useState<GenitalExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah GenitalExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="external_genitalia">External Genitalia</Label>
        <Input id="external_genitalia" type="text" value={values.external_genitalia ?? ''} onChange={(e) => setValues({ ...values, external_genitalia: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="discharge_characteristics">Discharge Characteristics</Label>
        <Input id="discharge_characteristics" type="text" value={values.discharge_characteristics ?? ''} onChange={(e) => setValues({ ...values, discharge_characteristics: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lesions_or_masses">Lesions Or Masses</Label>
        <Input id="lesions_or_masses" type="text" value={values.lesions_or_masses ?? ''} onChange={(e) => setValues({ ...values, lesions_or_masses: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
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
