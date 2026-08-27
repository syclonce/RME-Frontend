import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUltrasoundGuidedProcedureResource } from '../api'
import type { UltrasoundGuidedProcedureFormValues } from '../types'

export function UltrasoundGuidedProcedureFormPage() {
  const { create } = useUltrasoundGuidedProcedureResource()
  const [values, setValues] = useState<UltrasoundGuidedProcedureFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah UltrasoundGuidedProcedure</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="doctor_id">Doctor</Label>
        <Input id="doctor_id" type="number" value={values.doctor_id ?? ''} onChange={(e) => setValues({ ...values, doctor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="procedure_name">Procedure Name *</Label>
        <Input id="procedure_name" type="text" value={values.procedure_name ?? ''} onChange={(e) => setValues({ ...values, procedure_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="target_site">Target Site</Label>
        <Input id="target_site" type="text" value={values.target_site ?? ''} onChange={(e) => setValues({ ...values, target_site: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="needle_gauge">Needle Gauge</Label>
        <Input id="needle_gauge" type="text" value={values.needle_gauge ?? ''} onChange={(e) => setValues({ ...values, needle_gauge: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="findings_and_outcome">Findings And Outcome</Label>
        <Input id="findings_and_outcome" type="text" value={values.findings_and_outcome ?? ''} onChange={(e) => setValues({ ...values, findings_and_outcome: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="complications">Complications</Label>
        <Input id="complications" type="text" value={values.complications ?? ''} onChange={(e) => setValues({ ...values, complications: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="performed_at">Performed At *</Label>
        <Input id="performed_at" type="date" value={values.performed_at ?? ''} onChange={(e) => setValues({ ...values, performed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
