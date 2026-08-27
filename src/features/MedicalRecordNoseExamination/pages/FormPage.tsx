import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNoseExaminationResource } from '../api'
import type { NoseExaminationFormValues } from '../types'

export function NoseExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useNoseExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<NoseExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as NoseExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-nose-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-nose-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} NoseExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="deformity">Deformity</Label>
        <Input id="deformity" type="text" value={values.deformity ?? ''} onChange={(e) => setValues({ ...values, deformity: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="septum_deviation" checked={!!values.septum_deviation} onCheckedChange={(v) => setValues({ ...values, septum_deviation: !!v })} />
        <Label htmlFor="septum_deviation">Septum Deviation</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="turbinate_hypertrophy" checked={!!values.turbinate_hypertrophy} onCheckedChange={(v) => setValues({ ...values, turbinate_hypertrophy: !!v })} />
        <Label htmlFor="turbinate_hypertrophy">Turbinate Hypertrophy</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="nasal_discharge">Nasal Discharge</Label>
        <Input id="nasal_discharge" type="text" value={values.nasal_discharge ?? ''} onChange={(e) => setValues({ ...values, nasal_discharge: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="polyp_present" checked={!!values.polyp_present} onCheckedChange={(v) => setValues({ ...values, polyp_present: !!v })} />
        <Label htmlFor="polyp_present">Polyp Present</Label>
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
