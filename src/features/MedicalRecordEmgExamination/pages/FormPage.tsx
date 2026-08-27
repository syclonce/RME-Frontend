import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEmgExaminationResource } from '../api'
import type { EmgExaminationFormValues } from '../types'

export function EmgExaminationFormPage() {
  const { create } = useEmgExaminationResource()
  const [values, setValues] = useState<EmgExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah EmgExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="nerve_conduction_velocity">Nerve Conduction Velocity</Label>
        <Input id="nerve_conduction_velocity" type="number" value={values.nerve_conduction_velocity ?? ''} onChange={(e) => setValues({ ...values, nerve_conduction_velocity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="spontaneous_activity">Spontaneous Activity</Label>
        <Input id="spontaneous_activity" type="text" value={values.spontaneous_activity ?? ''} onChange={(e) => setValues({ ...values, spontaneous_activity: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="motor_unit_potentials">Motor Unit Potentials</Label>
        <Input id="motor_unit_potentials" type="text" value={values.motor_unit_potentials ?? ''} onChange={(e) => setValues({ ...values, motor_unit_potentials: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recruitment_pattern">Recruitment Pattern</Label>
        <Input id="recruitment_pattern" type="text" value={values.recruitment_pattern ?? ''} onChange={(e) => setValues({ ...values, recruitment_pattern: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="conclusion">Conclusion</Label>
        <Input id="conclusion" type="text" value={values.conclusion ?? ''} onChange={(e) => setValues({ ...values, conclusion: e.target.value })} />
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
