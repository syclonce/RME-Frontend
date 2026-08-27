import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useObstetricsResource } from '../api'
import type { ObstetricsFormValues } from '../types'

export function ObstetricsFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useObstetricsResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ObstetricsFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ObstetricsFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-obstetrics') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-obstetrics') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Obstetrics</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
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
        <Label htmlFor="gravida">Gravida</Label>
        <Input id="gravida" type="number" value={values.gravida ?? ''} onChange={(e) => setValues({ ...values, gravida: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="para">Para</Label>
        <Input id="para" type="number" value={values.para ?? ''} onChange={(e) => setValues({ ...values, para: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="abortus">Abortus</Label>
        <Input id="abortus" type="number" value={values.abortus ?? ''} onChange={(e) => setValues({ ...values, abortus: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gestational_age_weeks">Gestational Age Weeks</Label>
        <Input id="gestational_age_weeks" type="number" value={values.gestational_age_weeks ?? ''} onChange={(e) => setValues({ ...values, gestational_age_weeks: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fundal_height_cm">Fundal Height Cm</Label>
        <Input id="fundal_height_cm" type="number" value={values.fundal_height_cm ?? ''} onChange={(e) => setValues({ ...values, fundal_height_cm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fetal_heart_rate">Fetal Heart Rate</Label>
        <Input id="fetal_heart_rate" type="number" value={values.fetal_heart_rate ?? ''} onChange={(e) => setValues({ ...values, fetal_heart_rate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fetal_presentation">Fetal Presentation</Label>
        <Input id="fetal_presentation" type="text" value={values.fetal_presentation ?? ''} onChange={(e) => setValues({ ...values, fetal_presentation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="estimated_fetal_weight">Estimated Fetal Weight</Label>
        <Input id="estimated_fetal_weight" type="number" value={values.estimated_fetal_weight ?? ''} onChange={(e) => setValues({ ...values, estimated_fetal_weight: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
