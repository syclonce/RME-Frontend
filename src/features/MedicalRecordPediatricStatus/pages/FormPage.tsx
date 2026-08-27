import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePediatricStatusResource } from '../api'
import type { PediatricStatusFormValues } from '../types'

export function PediatricStatusFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePediatricStatusResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PediatricStatusFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PediatricStatusFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-pediatric-status') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-pediatric-status') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PediatricStatus</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <RelationSelect
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
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
        <Label htmlFor="head_circumference_cm">Head Circumference Cm</Label>
        <Input id="head_circumference_cm" type="number" value={values.head_circumference_cm ?? ''} onChange={(e) => setValues({ ...values, head_circumference_cm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gestational_age_weeks">Gestational Age Weeks</Label>
        <Input id="gestational_age_weeks" type="number" value={values.gestational_age_weeks ?? ''} onChange={(e) => setValues({ ...values, gestational_age_weeks: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="immunization_status">Immunization Status</Label>
        <Input id="immunization_status" type="text" value={values.immunization_status ?? ''} onChange={(e) => setValues({ ...values, immunization_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="developmental_milestones">Developmental Milestones</Label>
        <Input id="developmental_milestones" type="text" value={values.developmental_milestones ?? ''} onChange={(e) => setValues({ ...values, developmental_milestones: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
