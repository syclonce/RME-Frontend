import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNurseWardAssignmentResource } from '../api'
import type { NurseWardAssignmentFormValues } from '../types'

export function NurseWardAssignmentFormPage() {
  const { create } = useNurseWardAssignmentResource()
  const [values, setValues] = useState<NurseWardAssignmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah NurseWardAssignment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="nurse_id">Nurse *</Label>
        <Input id="nurse_id" type="number" value={values.nurse_id ?? ''} onChange={(e) => setValues({ ...values, nurse_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <Input id="ward_id" type="number" value={values.ward_id ?? ''} onChange={(e) => setValues({ ...values, ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="shift">Shift</Label>
        <Input id="shift" type="text" value={values.shift ?? ''} onChange={(e) => setValues({ ...values, shift: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assigned_at">Assigned At</Label>
        <Input id="assigned_at" type="date" value={values.assigned_at ?? ''} onChange={(e) => setValues({ ...values, assigned_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
