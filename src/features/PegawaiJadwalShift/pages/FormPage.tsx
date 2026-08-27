import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useShiftScheduleResource } from '../api'
import type { ShiftScheduleFormValues } from '../types'

export function ShiftScheduleFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useShiftScheduleResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ShiftScheduleFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ShiftScheduleFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pegawai-jadwal-shift') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pegawai-jadwal-shift') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ShiftSchedule</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="staff_member_id">Staff Member</Label>
        <RelationSelect
          endpoint="/staff-members"
          value={values.staff_member_id ?? null}
          onChange={(v) => setValues({ ...values, staff_member_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_id">Employee</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.employee_id ?? null}
          onChange={(v) => setValues({ ...values, employee_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.ward_id ?? null}
          onChange={(v) => setValues({ ...values, ward_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="shift_type">Shift Type *</Label>
        <Input id="shift_type" type="text" value={values.shift_type ?? ''} onChange={(e) => setValues({ ...values, shift_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="shift_date">Shift Date *</Label>
        <Input id="shift_date" type="date" value={values.shift_date ?? ''} onChange={(e) => setValues({ ...values, shift_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="start_time">Start Time *</Label>
        <Input id="start_time" type="date" value={values.start_time ?? ''} onChange={(e) => setValues({ ...values, start_time: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="end_time">End Time *</Label>
        <Input id="end_time" type="date" value={values.end_time ?? ''} onChange={(e) => setValues({ ...values, end_time: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
