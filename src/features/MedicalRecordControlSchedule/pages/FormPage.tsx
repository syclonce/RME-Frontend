import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useControlScheduleResource } from '../api'
import type { ControlScheduleFormValues } from '../types'

export function ControlScheduleFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useControlScheduleResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ControlScheduleFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ControlScheduleFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-control-schedule') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-control-schedule') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ControlSchedule</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <AsyncCombobox
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="medical_department_id">Medical Department</Label>
        <RelationSelect
          endpoint="/medical-departments"
          value={values.medical_department_id ?? null}
          onChange={(v) => setValues({ ...values, medical_department_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="scheduled_date">Scheduled Date *</Label>
        <Input id="scheduled_date" type="date" value={values.scheduled_date ?? ''} onChange={(e) => setValues({ ...values, scheduled_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="purpose">Purpose</Label>
        <Input id="purpose" type="text" value={values.purpose ?? ''} onChange={(e) => setValues({ ...values, purpose: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="scheduled_by">Scheduled By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.scheduled_by ?? null}
          onChange={(v) => setValues({ ...values, scheduled_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
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
