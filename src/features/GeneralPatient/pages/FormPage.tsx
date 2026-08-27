import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { RegionVillagePicker } from '@/shared/components/RegionVillagePicker'
import { usePatientResource } from '../api'
import type { PatientFormValues } from '../types'

export function PatientFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePatientResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PatientFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PatientFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-patient') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-patient') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Patient</h1>
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
        <RelationSelect
          endpoint="/genders"
          value={values.gender_id ?? null}
          onChange={(v) => setValues({ ...values, gender_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="religion_id">Religion</Label>
        <RelationSelect
          endpoint="/religions"
          value={values.religion_id ?? null}
          onChange={(v) => setValues({ ...values, religion_id: v })}
        />
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
        <Label>Village</Label>
        <RegionVillagePicker
          value={values.village_id ?? null}
          onChange={(v) => setValues({ ...values, village_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="education_id">Education</Label>
        <RelationSelect
          endpoint="/educations"
          value={values.education_id ?? null}
          onChange={(v) => setValues({ ...values, education_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="occupation_id">Occupation</Label>
        <RelationSelect
          endpoint="/occupations"
          value={values.occupation_id ?? null}
          onChange={(v) => setValues({ ...values, occupation_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="marital_status_id">Marital Status</Label>
        <RelationSelect
          endpoint="/marital_statuses"
          value={values.marital_status_id ?? null}
          onChange={(v) => setValues({ ...values, marital_status_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_type_id">Blood Type</Label>
        <RelationSelect
          endpoint="/blood_types"
          value={values.blood_type_id ?? null}
          onChange={(v) => setValues({ ...values, blood_type_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="nationality_id">Nationality</Label>
        <RelationSelect
          endpoint="/countries"
          value={values.nationality_id ?? null}
          onChange={(v) => setValues({ ...values, nationality_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ethnicity_id">Ethnicity</Label>
        <RelationSelect
          endpoint="/ethnicities"
          value={values.ethnicity_id ?? null}
          onChange={(v) => setValues({ ...values, ethnicity_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="language_id">Language</Label>
        <RelationSelect
          endpoint="/languages"
          value={values.language_id ?? null}
          onChange={(v) => setValues({ ...values, language_id: v })}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_unidentified" checked={!!values.is_unidentified} onCheckedChange={(v) => setValues({ ...values, is_unidentified: !!v })} />
        <Label htmlFor="is_unidentified">Is Unidentified</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
