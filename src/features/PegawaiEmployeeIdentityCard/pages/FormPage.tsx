import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEmployeeIdentityCardResource } from '../api'
import type { EmployeeIdentityCardFormValues } from '../types'

export function EmployeeIdentityCardFormPage() {
  const { create } = useEmployeeIdentityCardResource()
  const [values, setValues] = useState<EmployeeIdentityCardFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah EmployeeIdentityCard</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_id">Employee *</Label>
        <Input id="employee_id" type="number" value={values.employee_id ?? ''} onChange={(e) => setValues({ ...values, employee_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="id_type">Id Type *</Label>
        <Input id="id_type" type="text" value={values.id_type ?? ''} onChange={(e) => setValues({ ...values, id_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="id_number">Id Number *</Label>
        <Input id="id_number" type="text" value={values.id_number ?? ''} onChange={(e) => setValues({ ...values, id_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="issued_at">Issued At</Label>
        <Input id="issued_at" type="date" value={values.issued_at ?? ''} onChange={(e) => setValues({ ...values, issued_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
