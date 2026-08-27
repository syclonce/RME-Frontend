import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGeneralExaminationResource } from '../api'
import type { GeneralExaminationFormValues } from '../types'

export function GeneralExaminationFormPage() {
  const { create } = useGeneralExaminationResource()
  const [values, setValues] = useState<GeneralExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah GeneralExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="general_appearance">General Appearance</Label>
        <Input id="general_appearance" type="text" value={values.general_appearance ?? ''} onChange={(e) => setValues({ ...values, general_appearance: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="consciousness_level">Consciousness Level</Label>
        <Input id="consciousness_level" type="text" value={values.consciousness_level ?? ''} onChange={(e) => setValues({ ...values, consciousness_level: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="nutritional_status">Nutritional Status</Label>
        <Input id="nutritional_status" type="text" value={values.nutritional_status ?? ''} onChange={(e) => setValues({ ...values, nutritional_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="posture">Posture</Label>
        <Input id="posture" type="text" value={values.posture ?? ''} onChange={(e) => setValues({ ...values, posture: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gait">Gait</Label>
        <Input id="gait" type="text" value={values.gait ?? ''} onChange={(e) => setValues({ ...values, gait: e.target.value })} />
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
