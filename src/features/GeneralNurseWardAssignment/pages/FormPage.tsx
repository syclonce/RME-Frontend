import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNurseWardAssignmentResource } from '../api'
import type { NurseWardAssignmentFormValues } from '../types'

export function NurseWardAssignmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useNurseWardAssignmentResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<NurseWardAssignmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as NurseWardAssignmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-nurse-ward-assignment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-nurse-ward-assignment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} NurseWardAssignment</h1>
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
