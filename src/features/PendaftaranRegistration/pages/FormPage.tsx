import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useRegistrationResource } from '../api'
import type { RegistrationFormValues } from '../types'

export function RegistrationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useRegistrationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<RegistrationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as RegistrationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pendaftaran-registration') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-registration') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Registration</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="registration_number">Registration Number</Label>
        <Input id="registration_number" type="text" value={values.registration_number ?? ''} onChange={(e) => setValues({ ...values, registration_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <RelationSelect
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="registered_at">Registered At</Label>
        <Input id="registered_at" type="date" value={values.registered_at ?? ''} onChange={(e) => setValues({ ...values, registered_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="admission_diagnosis_id">Admission Diagnosis</Label>
        <RelationSelect
          endpoint="/diagnosis-codes"
          value={values.admission_diagnosis_id ?? null}
          onChange={(v) => setValues({ ...values, admission_diagnosis_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="referral_id">Referral</Label>
        <RelationSelect
          endpoint="/referrals"
          value={values.referral_id ?? null}
          onChange={(v) => setValues({ ...values, referral_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="package_id">Package</Label>
        <RelationSelect
          endpoint="/packages"
          value={values.package_id ?? null}
          onChange={(v) => setValues({ ...values, package_id: v })}
        />
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
