import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePathologyAnatomyResultResource } from '../api'
import type { PathologyAnatomyResultFormValues } from '../types'

export function PathologyAnatomyResultFormPage() {
  const { create } = usePathologyAnatomyResultResource()
  const [values, setValues] = useState<PathologyAnatomyResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PathologyAnatomyResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="specimen_description">Specimen Description *</Label>
        <Input id="specimen_description" type="text" value={values.specimen_description ?? ''} onChange={(e) => setValues({ ...values, specimen_description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="macroscopic_finding">Macroscopic Finding</Label>
        <Input id="macroscopic_finding" type="text" value={values.macroscopic_finding ?? ''} onChange={(e) => setValues({ ...values, macroscopic_finding: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="microscopic_finding">Microscopic Finding</Label>
        <Input id="microscopic_finding" type="text" value={values.microscopic_finding ?? ''} onChange={(e) => setValues({ ...values, microscopic_finding: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis">Diagnosis</Label>
        <Input id="diagnosis" type="text" value={values.diagnosis ?? ''} onChange={(e) => setValues({ ...values, diagnosis: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_by">Examined By</Label>
        <Input id="examined_by" type="number" value={values.examined_by ?? ''} onChange={(e) => setValues({ ...values, examined_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At *</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status *</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
