import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useMedicalProcedureStaffResource } from '../api'
import type { MedicalProcedureStaffFormValues } from '../types'

export function MedicalProcedureStaffFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useMedicalProcedureStaffResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<MedicalProcedureStaffFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as MedicalProcedureStaffFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-medical-procedure-staff') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-medical-procedure-staff') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} MedicalProcedureStaff</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="medical_procedure_id">Medical Procedure *</Label>
        <RelationSelect
          endpoint="/medical-procedures"
          value={values.medical_procedure_id ?? null}
          onChange={(v) => setValues({ ...values, medical_procedure_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_id">Employee *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.employee_id ?? null}
          onChange={(v) => setValues({ ...values, employee_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="role">Role *</Label>
        <Input id="role" type="text" value={values.role ?? ''} onChange={(e) => setValues({ ...values, role: e.target.value })} />
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
