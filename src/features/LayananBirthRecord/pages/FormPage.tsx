import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useBirthRecordResource } from '../api'
import type { BirthRecordFormValues } from '../types'

export function BirthRecordFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useBirthRecordResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<BirthRecordFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as BirthRecordFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-birth-record') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-birth-record') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} BirthRecord</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mother_patient_id">Mother Patient *</Label>
        <RelationSelect
          endpoint="/patients"
          value={values.mother_patient_id ?? null}
          onChange={(v) => setValues({ ...values, mother_patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="baby_name">Baby Name</Label>
        <Input id="baby_name" type="text" value={values.baby_name ?? ''} onChange={(e) => setValues({ ...values, baby_name: e.target.value })} />
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
        <Label htmlFor="birth_date">Birth Date *</Label>
        <Input id="birth_date" type="date" value={values.birth_date ?? ''} onChange={(e) => setValues({ ...values, birth_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="birth_weight_grams">Birth Weight Grams</Label>
        <Input id="birth_weight_grams" type="number" value={values.birth_weight_grams ?? ''} onChange={(e) => setValues({ ...values, birth_weight_grams: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="birth_length_cm">Birth Length Cm</Label>
        <Input id="birth_length_cm" type="number" value={values.birth_length_cm ?? ''} onChange={(e) => setValues({ ...values, birth_length_cm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="delivery_method">Delivery Method *</Label>
        <Input id="delivery_method" type="text" value={values.delivery_method ?? ''} onChange={(e) => setValues({ ...values, delivery_method: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="attending_doctor_id">Attending Doctor</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.attending_doctor_id ?? null}
          onChange={(v) => setValues({ ...values, attending_doctor_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
