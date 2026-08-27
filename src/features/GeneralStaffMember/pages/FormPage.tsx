import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStaffMemberResource } from '../api'
import type { StaffMemberFormValues } from '../types'

export function StaffMemberFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useStaffMemberResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<StaffMemberFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as StaffMemberFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-staff-member') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-staff-member') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} StaffMember</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_id">Employee *</Label>
        <Input id="employee_id" type="number" value={values.employee_id ?? ''} onChange={(e) => setValues({ ...values, employee_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="staff_role">Staff Role</Label>
        <Input id="staff_role" type="text" value={values.staff_role ?? ''} onChange={(e) => setValues({ ...values, staff_role: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
