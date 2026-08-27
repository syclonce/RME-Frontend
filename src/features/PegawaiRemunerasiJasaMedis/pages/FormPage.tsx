import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRemunerationEntryResource } from '../api'
import type { RemunerationEntryFormValues } from '../types'

export function RemunerationEntryFormPage() {
  const { create } = useRemunerationEntryResource()
  const [values, setValues] = useState<RemunerationEntryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah RemunerationEntry</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_id">Employee *</Label>
        <Input id="employee_id" type="number" value={values.employee_id ?? ''} onChange={(e) => setValues({ ...values, employee_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="source_type">Source Type *</Label>
        <Input id="source_type" type="text" value={values.source_type ?? ''} onChange={(e) => setValues({ ...values, source_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="source_id">Source *</Label>
        <Input id="source_id" type="number" value={values.source_id ?? ''} onChange={(e) => setValues({ ...values, source_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="role">Role *</Label>
        <Input id="role" type="text" value={values.role ?? ''} onChange={(e) => setValues({ ...values, role: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gross_amount">Gross Amount *</Label>
        <Input id="gross_amount" type="number" value={values.gross_amount ?? ''} onChange={(e) => setValues({ ...values, gross_amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="deduction_percentage">Deduction Percentage</Label>
        <Input id="deduction_percentage" type="number" value={values.deduction_percentage ?? ''} onChange={(e) => setValues({ ...values, deduction_percentage: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fixed_deduction">Fixed Deduction</Label>
        <Input id="fixed_deduction" type="number" value={values.fixed_deduction ?? ''} onChange={(e) => setValues({ ...values, fixed_deduction: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="service_date">Service Date *</Label>
        <Input id="service_date" type="date" value={values.service_date ?? ''} onChange={(e) => setValues({ ...values, service_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
