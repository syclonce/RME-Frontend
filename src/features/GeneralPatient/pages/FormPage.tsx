import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RegionVillagePicker } from '@/shared/components/RegionVillagePicker'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { humanizeField } from '@/shared/labels'
import { usePatientResource } from '../api'
import type { PatientFormValues } from '../types'

function Field({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{humanizeField(htmlFor)}</Label>
      {children}
    </div>
  )
}

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

  function set<K extends keyof PatientFormValues>(key: K, value: PatientFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const submitting = create.isPending || update.isPending

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{isEdit ? 'Ubah' : 'Tambah'} Pasien</h1>
        <p className="text-muted-foreground text-sm">
          {isEdit ? `No. RM: ${values.medical_record_number ?? '—'}` : 'Nomor rekam medis dibuat otomatis bila dikosongkan.'}
        </p>
      </div>

      <form
        className="flex max-w-3xl flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-patient') })
          else create.mutate(values, { onSuccess: () => navigate('/modul/general-patient') })
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Identitas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field htmlFor="name">
              <Input id="name" required value={values.name ?? ''} onChange={(e) => set('name', e.target.value)} />
            </Field>
            <Field htmlFor="nickname">
              <Input id="nickname" value={values.nickname ?? ''} onChange={(e) => set('nickname', e.target.value)} />
            </Field>
            <Field htmlFor="title_prefix">
              <Input id="title_prefix" value={values.title_prefix ?? ''} onChange={(e) => set('title_prefix', e.target.value)} />
            </Field>
            <Field htmlFor="title_suffix">
              <Input id="title_suffix" value={values.title_suffix ?? ''} onChange={(e) => set('title_suffix', e.target.value)} />
            </Field>
            <Field htmlFor="birth_place">
              <Input id="birth_place" value={values.birth_place ?? ''} onChange={(e) => set('birth_place', e.target.value)} />
            </Field>
            <Field htmlFor="birth_date">
              <Input id="birth_date" type="date" value={values.birth_date ?? ''} onChange={(e) => set('birth_date', e.target.value)} />
            </Field>
            <Field htmlFor="gender_id">
              <RelationSelect endpoint="/genders" value={values.gender_id ?? null} onChange={(v) => set('gender_id', v)} />
            </Field>
            <Field htmlFor="religion_id">
              <RelationSelect endpoint="/religions" value={values.religion_id ?? null} onChange={(v) => set('religion_id', v)} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alamat</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Field htmlFor="address">
              <Input id="address" value={values.address ?? ''} onChange={(e) => set('address', e.target.value)} />
            </Field>
            <div className="grid grid-cols-3 gap-4">
              <Field htmlFor="rt">
                <Input id="rt" value={values.rt ?? ''} onChange={(e) => set('rt', e.target.value)} />
              </Field>
              <Field htmlFor="rw">
                <Input id="rw" value={values.rw ?? ''} onChange={(e) => set('rw', e.target.value)} />
              </Field>
              <Field htmlFor="postal_code">
                <Input id="postal_code" value={values.postal_code ?? ''} onChange={(e) => set('postal_code', e.target.value)} />
              </Field>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{humanizeField('village_id')}</Label>
              <RegionVillagePicker value={values.village_id ?? null} onChange={(v) => set('village_id', v)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Tambahan</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field htmlFor="education_id">
              <RelationSelect endpoint="/educations" value={values.education_id ?? null} onChange={(v) => set('education_id', v)} />
            </Field>
            <Field htmlFor="occupation_id">
              <RelationSelect endpoint="/occupations" value={values.occupation_id ?? null} onChange={(v) => set('occupation_id', v)} />
            </Field>
            <Field htmlFor="marital_status_id">
              <RelationSelect
                endpoint="/marital_statuses"
                value={values.marital_status_id ?? null}
                onChange={(v) => set('marital_status_id', v)}
              />
            </Field>
            <Field htmlFor="blood_type_id">
              <RelationSelect endpoint="/blood_types" value={values.blood_type_id ?? null} onChange={(v) => set('blood_type_id', v)} />
            </Field>
            <Field htmlFor="nationality_id">
              <RelationSelect endpoint="/countries" value={values.nationality_id ?? null} onChange={(v) => set('nationality_id', v)} />
            </Field>
            <Field htmlFor="ethnicity_id">
              <RelationSelect endpoint="/ethnicities" value={values.ethnicity_id ?? null} onChange={(v) => set('ethnicity_id', v)} />
            </Field>
            <Field htmlFor="language_id">
              <RelationSelect endpoint="/languages" value={values.language_id ?? null} onChange={(v) => set('language_id', v)} />
            </Field>
            <div className="flex items-center gap-2">
              <Checkbox
                id="is_unidentified"
                checked={!!values.is_unidentified}
                onCheckedChange={(v) => set('is_unidentified', !!v)}
              />
              <Label htmlFor="is_unidentified">{humanizeField('is_unidentified')}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => set('is_active', !!v)} />
              <Label htmlFor="is_active">{humanizeField('is_active')}</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/modul/general-patient')}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  )
}
