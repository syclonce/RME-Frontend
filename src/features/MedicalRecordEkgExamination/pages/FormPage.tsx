import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEkgExaminationResource } from '../api'
import type { EkgExaminationFormValues } from '../types'

export function EkgExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useEkgExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<EkgExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as EkgExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-ekg-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-ekg-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} EkgExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="heart_rate_bpm">Heart Rate Bpm</Label>
        <Input id="heart_rate_bpm" type="number" value={values.heart_rate_bpm ?? ''} onChange={(e) => setValues({ ...values, heart_rate_bpm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="rhythm">Rhythm</Label>
        <Input id="rhythm" type="text" value={values.rhythm ?? ''} onChange={(e) => setValues({ ...values, rhythm: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="p_wave">P Wave</Label>
        <Input id="p_wave" type="text" value={values.p_wave ?? ''} onChange={(e) => setValues({ ...values, p_wave: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pr_interval_ms">Pr Interval Ms</Label>
        <Input id="pr_interval_ms" type="number" value={values.pr_interval_ms ?? ''} onChange={(e) => setValues({ ...values, pr_interval_ms: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="qrs_duration_ms">Qrs Duration Ms</Label>
        <Input id="qrs_duration_ms" type="number" value={values.qrs_duration_ms ?? ''} onChange={(e) => setValues({ ...values, qrs_duration_ms: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="st_segment">St Segment</Label>
        <Input id="st_segment" type="text" value={values.st_segment ?? ''} onChange={(e) => setValues({ ...values, st_segment: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="t_wave">T Wave</Label>
        <Input id="t_wave" type="text" value={values.t_wave ?? ''} onChange={(e) => setValues({ ...values, t_wave: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="conclusion">Conclusion</Label>
        <Input id="conclusion" type="text" value={values.conclusion ?? ''} onChange={(e) => setValues({ ...values, conclusion: e.target.value })} />
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
