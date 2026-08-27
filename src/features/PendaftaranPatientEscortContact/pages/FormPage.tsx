import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePatientEscortContactResource } from '../api'
import type { PatientEscortContactFormValues } from '../types'

export function PatientEscortContactFormPage() {
  const { create } = usePatientEscortContactResource()
  const [values, setValues] = useState<PatientEscortContactFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PatientEscortContact</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_escort_id">Patient Escort *</Label>
        <Input id="patient_escort_id" type="number" value={values.patient_escort_id ?? ''} onChange={(e) => setValues({ ...values, patient_escort_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="contact_type">Contact Type *</Label>
        <Input id="contact_type" type="text" value={values.contact_type ?? ''} onChange={(e) => setValues({ ...values, contact_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="contact_value">Contact Value *</Label>
        <Input id="contact_value" type="text" value={values.contact_value ?? ''} onChange={(e) => setValues({ ...values, contact_value: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_primary" checked={!!values.is_primary} onCheckedChange={(v) => setValues({ ...values, is_primary: !!v })} />
        <Label htmlFor="is_primary">Is Primary</Label>
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
