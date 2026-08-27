import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRegistrationResource } from '../api'
import type { RegistrationFormValues } from '../types'

export function RegistrationFormPage() {
  const { create } = useRegistrationResource()
  const [values, setValues] = useState<RegistrationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Registration</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="registration_number">Registration Number</Label>
        <Input id="registration_number" type="text" value={values.registration_number ?? ''} onChange={(e) => setValues({ ...values, registration_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="registered_at">Registered At</Label>
        <Input id="registered_at" type="date" value={values.registered_at ?? ''} onChange={(e) => setValues({ ...values, registered_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="admission_diagnosis_id">Admission Diagnosis</Label>
        <Input id="admission_diagnosis_id" type="number" value={values.admission_diagnosis_id ?? ''} onChange={(e) => setValues({ ...values, admission_diagnosis_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="referral_id">Referral</Label>
        <Input id="referral_id" type="number" value={values.referral_id ?? ''} onChange={(e) => setValues({ ...values, referral_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="package_id">Package</Label>
        <Input id="package_id" type="number" value={values.package_id ?? ''} onChange={(e) => setValues({ ...values, package_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_emergency" checked={!!values.is_emergency} onCheckedChange={(v) => setValues({ ...values, is_emergency: !!v })} />
        <Label htmlFor="is_emergency">Is Emergency</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="has_fall_risk" checked={!!values.has_fall_risk} onCheckedChange={(v) => setValues({ ...values, has_fall_risk: !!v })} />
        <Label htmlFor="has_fall_risk">Has Fall Risk</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="newborn_weight_grams">Newborn Weight Grams</Label>
        <Input id="newborn_weight_grams" type="number" value={values.newborn_weight_grams ?? ''} onChange={(e) => setValues({ ...values, newborn_weight_grams: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="newborn_length_cm">Newborn Length Cm</Label>
        <Input id="newborn_length_cm" type="number" value={values.newborn_length_cm ?? ''} onChange={(e) => setValues({ ...values, newborn_length_cm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="birth_time">Birth Time</Label>
        <Input id="birth_time" type="date" value={values.birth_time ?? ''} onChange={(e) => setValues({ ...values, birth_time: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="found_location">Found Location</Label>
        <Input id="found_location" type="text" value={values.found_location ?? ''} onChange={(e) => setValues({ ...values, found_location: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="found_at">Found At</Label>
        <Input id="found_at" type="date" value={values.found_at ?? ''} onChange={(e) => setValues({ ...values, found_at: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="satu_sehat_consent" checked={!!values.satu_sehat_consent} onCheckedChange={(v) => setValues({ ...values, satu_sehat_consent: !!v })} />
        <Label htmlFor="satu_sehat_consent">Satu Sehat Consent</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
