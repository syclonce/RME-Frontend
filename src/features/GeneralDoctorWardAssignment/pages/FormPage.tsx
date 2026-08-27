import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDoctorWardAssignmentResource } from '../api'
import type { DoctorWardAssignmentFormValues } from '../types'

export function DoctorWardAssignmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useDoctorWardAssignmentResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<DoctorWardAssignmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as DoctorWardAssignmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-doctor-ward-assignment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-doctor-ward-assignment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} DoctorWardAssignment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="doctor_id">Doctor *</Label>
        <Input id="doctor_id" type="number" value={values.doctor_id ?? ''} onChange={(e) => setValues({ ...values, doctor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <Input id="ward_id" type="number" value={values.ward_id ?? ''} onChange={(e) => setValues({ ...values, ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assigned_at">Assigned At</Label>
        <Input id="assigned_at" type="date" value={values.assigned_at ?? ''} onChange={(e) => setValues({ ...values, assigned_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="schedule_day">Schedule Day</Label>
        <Input id="schedule_day" type="text" value={values.schedule_day ?? ''} onChange={(e) => setValues({ ...values, schedule_day: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
