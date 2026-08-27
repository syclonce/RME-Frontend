import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePrescriptionResource } from '../api'
import type { PrescriptionFormValues } from '../types'

export function PrescriptionFormPage() {
  const { create } = usePrescriptionResource()
  const [values, setValues] = useState<PrescriptionFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Prescription</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_number">Prescription Number</Label>
        <Input id="prescription_number" type="text" value={values.prescription_number ?? ''} onChange={(e) => setValues({ ...values, prescription_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis_id">Diagnosis</Label>
        <Input id="diagnosis_id" type="number" value={values.diagnosis_id ?? ''} onChange={(e) => setValues({ ...values, diagnosis_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="prescribed_by">Prescribed By *</Label>
        <Input id="prescribed_by" type="number" value={values.prescribed_by ?? ''} onChange={(e) => setValues({ ...values, prescribed_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="prescribed_at">Prescribed At</Label>
        <Input id="prescribed_at" type="date" value={values.prescribed_at ?? ''} onChange={(e) => setValues({ ...values, prescribed_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="weight_kg">Weight Kg</Label>
        <Input id="weight_kg" type="number" value={values.weight_kg ?? ''} onChange={(e) => setValues({ ...values, weight_kg: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="height_cm">Height Cm</Label>
        <Input id="height_cm" type="number" value={values.height_cm ?? ''} onChange={(e) => setValues({ ...values, height_cm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="has_drug_allergy" checked={!!values.has_drug_allergy} onCheckedChange={(v) => setValues({ ...values, has_drug_allergy: !!v })} />
        <Label htmlFor="has_drug_allergy">Has Drug Allergy</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_pregnant" checked={!!values.is_pregnant} onCheckedChange={(v) => setValues({ ...values, is_pregnant: !!v })} />
        <Label htmlFor="is_pregnant">Is Pregnant</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_breastfeeding" checked={!!values.is_breastfeeding} onCheckedChange={(v) => setValues({ ...values, is_breastfeeding: !!v })} />
        <Label htmlFor="is_breastfeeding">Is Breastfeeding</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_discharge_prescription" checked={!!values.is_discharge_prescription} onCheckedChange={(v) => setValues({ ...values, is_discharge_prescription: !!v })} />
        <Label htmlFor="is_discharge_prescription">Is Discharge Prescription</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_emergency" checked={!!values.is_emergency} onCheckedChange={(v) => setValues({ ...values, is_emergency: !!v })} />
        <Label htmlFor="is_emergency">Is Emergency</Label>
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
