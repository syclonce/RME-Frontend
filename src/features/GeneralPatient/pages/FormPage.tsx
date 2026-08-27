import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePatientResource } from '../api'
import type { PatientFormValues } from '../types'

export function PatientFormPage() {
  const { create } = usePatientResource()
  const [values, setValues] = useState<PatientFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Patient</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="medical_record_number">Medical Record Number</Label>
        <Input id="medical_record_number" type="text" value={values.medical_record_number ?? ''} onChange={(e) => setValues({ ...values, medical_record_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="nickname">Nickname</Label>
        <Input id="nickname" type="text" value={values.nickname ?? ''} onChange={(e) => setValues({ ...values, nickname: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="title_prefix">Title Prefix</Label>
        <Input id="title_prefix" type="text" value={values.title_prefix ?? ''} onChange={(e) => setValues({ ...values, title_prefix: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="title_suffix">Title Suffix</Label>
        <Input id="title_suffix" type="text" value={values.title_suffix ?? ''} onChange={(e) => setValues({ ...values, title_suffix: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="birth_place">Birth Place</Label>
        <Input id="birth_place" type="text" value={values.birth_place ?? ''} onChange={(e) => setValues({ ...values, birth_place: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="birth_date">Birth Date</Label>
        <Input id="birth_date" type="date" value={values.birth_date ?? ''} onChange={(e) => setValues({ ...values, birth_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gender_id">Gender</Label>
        <Input id="gender_id" type="number" value={values.gender_id ?? ''} onChange={(e) => setValues({ ...values, gender_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="religion_id">Religion</Label>
        <Input id="religion_id" type="number" value={values.religion_id ?? ''} onChange={(e) => setValues({ ...values, religion_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="address">Address</Label>
        <Input id="address" type="text" value={values.address ?? ''} onChange={(e) => setValues({ ...values, address: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="rt">Rt</Label>
        <Input id="rt" type="text" value={values.rt ?? ''} onChange={(e) => setValues({ ...values, rt: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="rw">Rw</Label>
        <Input id="rw" type="text" value={values.rw ?? ''} onChange={(e) => setValues({ ...values, rw: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="postal_code">Postal Code</Label>
        <Input id="postal_code" type="text" value={values.postal_code ?? ''} onChange={(e) => setValues({ ...values, postal_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="village_id">Village</Label>
        <Input id="village_id" type="number" value={values.village_id ?? ''} onChange={(e) => setValues({ ...values, village_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="education_id">Education</Label>
        <Input id="education_id" type="number" value={values.education_id ?? ''} onChange={(e) => setValues({ ...values, education_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="occupation_id">Occupation</Label>
        <Input id="occupation_id" type="number" value={values.occupation_id ?? ''} onChange={(e) => setValues({ ...values, occupation_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="marital_status_id">Marital Status</Label>
        <Input id="marital_status_id" type="number" value={values.marital_status_id ?? ''} onChange={(e) => setValues({ ...values, marital_status_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_type_id">Blood Type</Label>
        <Input id="blood_type_id" type="number" value={values.blood_type_id ?? ''} onChange={(e) => setValues({ ...values, blood_type_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="nationality_id">Nationality</Label>
        <Input id="nationality_id" type="number" value={values.nationality_id ?? ''} onChange={(e) => setValues({ ...values, nationality_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ethnicity_id">Ethnicity</Label>
        <Input id="ethnicity_id" type="number" value={values.ethnicity_id ?? ''} onChange={(e) => setValues({ ...values, ethnicity_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="language_id">Language</Label>
        <Input id="language_id" type="number" value={values.language_id ?? ''} onChange={(e) => setValues({ ...values, language_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_unidentified" checked={!!values.is_unidentified} onCheckedChange={(v) => setValues({ ...values, is_unidentified: !!v })} />
        <Label htmlFor="is_unidentified">Is Unidentified</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
