import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDoctorMedicalDepartmentResource } from '../api'
import type { DoctorMedicalDepartmentFormValues } from '../types'

export function DoctorMedicalDepartmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useDoctorMedicalDepartmentResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<DoctorMedicalDepartmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as DoctorMedicalDepartmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-doctor-medical-department') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-doctor-medical-department') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} DoctorMedicalDepartment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="doctor_id">Doctor *</Label>
        <Input id="doctor_id" type="number" value={values.doctor_id ?? ''} onChange={(e) => setValues({ ...values, doctor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="medical_department_id">Medical Department *</Label>
        <Input id="medical_department_id" type="number" value={values.medical_department_id ?? ''} onChange={(e) => setValues({ ...values, medical_department_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_head" checked={!!values.is_head} onCheckedChange={(v) => setValues({ ...values, is_head: !!v })} />
        <Label htmlFor="is_head">Is Head</Label>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
