import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePatientDeathRecordResource } from '../api'
import type { PatientDeathRecordFormValues } from '../types'

export function PatientDeathRecordFormPage() {
  const { create } = usePatientDeathRecordResource()
  const [values, setValues] = useState<PatientDeathRecordFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PatientDeathRecord</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="died_at">Died At *</Label>
        <Input id="died_at" type="date" value={values.died_at ?? ''} onChange={(e) => setValues({ ...values, died_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="cause_of_death">Cause Of Death</Label>
        <Input id="cause_of_death" type="text" value={values.cause_of_death ?? ''} onChange={(e) => setValues({ ...values, cause_of_death: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="declared_by">Declared By</Label>
        <Input id="declared_by" type="number" value={values.declared_by ?? ''} onChange={(e) => setValues({ ...values, declared_by: e.target.value === '' ? null : Number(e.target.value) })} />
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
