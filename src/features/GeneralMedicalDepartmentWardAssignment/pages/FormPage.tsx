import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMedicalDepartmentWardAssignmentResource } from '../api'
import type { MedicalDepartmentWardAssignmentFormValues } from '../types'

export function MedicalDepartmentWardAssignmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useMedicalDepartmentWardAssignmentResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<MedicalDepartmentWardAssignmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as MedicalDepartmentWardAssignmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-medical-department-ward-assignment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-medical-department-ward-assignment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} MedicalDepartmentWardAssignment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="medical_department_id">Medical Department *</Label>
        <Input id="medical_department_id" type="number" value={values.medical_department_id ?? ''} onChange={(e) => setValues({ ...values, medical_department_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <Input id="ward_id" type="number" value={values.ward_id ?? ''} onChange={(e) => setValues({ ...values, ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_primary" checked={!!values.is_primary} onCheckedChange={(v) => setValues({ ...values, is_primary: !!v })} />
        <Label htmlFor="is_primary">Is Primary</Label>
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
