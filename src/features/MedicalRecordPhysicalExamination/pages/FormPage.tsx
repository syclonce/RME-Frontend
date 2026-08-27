import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePhysicalExaminationResource } from '../api'
import type { PhysicalExaminationFormValues } from '../types'

export function PhysicalExaminationFormPage() {
  const { create } = usePhysicalExaminationResource()
  const [values, setValues] = useState<PhysicalExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PhysicalExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="general_condition">General Condition</Label>
        <Input id="general_condition" type="text" value={values.general_condition ?? ''} onChange={(e) => setValues({ ...values, general_condition: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="consciousness_gcs">Consciousness Gcs</Label>
        <Input id="consciousness_gcs" type="text" value={values.consciousness_gcs ?? ''} onChange={(e) => setValues({ ...values, consciousness_gcs: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="head_to_toe_notes">Head To Toe Notes</Label>
        <Input id="head_to_toe_notes" type="text" value={values.head_to_toe_notes ?? ''} onChange={(e) => setValues({ ...values, head_to_toe_notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_by">Examined By</Label>
        <Input id="examined_by" type="number" value={values.examined_by ?? ''} onChange={(e) => setValues({ ...values, examined_by: e.target.value === '' ? null : Number(e.target.value) })} />
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
