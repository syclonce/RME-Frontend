import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useShiftScheduleResource } from '../api'
import type { ShiftScheduleFormValues } from '../types'

export function ShiftScheduleFormPage() {
  const { create } = useShiftScheduleResource()
  const [values, setValues] = useState<ShiftScheduleFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ShiftSchedule</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="staff_member_id">Staff Member</Label>
        <Input id="staff_member_id" type="number" value={values.staff_member_id ?? ''} onChange={(e) => setValues({ ...values, staff_member_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_id">Employee</Label>
        <Input id="employee_id" type="number" value={values.employee_id ?? ''} onChange={(e) => setValues({ ...values, employee_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward</Label>
        <Input id="ward_id" type="number" value={values.ward_id ?? ''} onChange={(e) => setValues({ ...values, ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
