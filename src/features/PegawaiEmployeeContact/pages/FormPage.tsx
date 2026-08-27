import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useEmployeeContactResource } from '../api'
import type { EmployeeContactFormValues } from '../types'

export function EmployeeContactFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useEmployeeContactResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<EmployeeContactFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as EmployeeContactFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pegawai-employee-contact') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pegawai-employee-contact') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} EmployeeContact</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_id">Employee *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.employee_id ?? null}
          onChange={(v) => setValues({ ...values, employee_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="contact_type">Contact Type *</Label>
        <Select value={values.contact_type ?? ''} onValueChange={(v) => setValues({ ...values, contact_type: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="phone" value="phone">Phone</SelectItem>
            <SelectItem key="email" value="email">Email</SelectItem>
            <SelectItem key="emergency" value="emergency">Emergency</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="value">Value *</Label>
        <Input id="value" type="text" value={values.value ?? ''} onChange={(e) => setValues({ ...values, value: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
