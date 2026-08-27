import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDoctorDiscountResource } from '../api'
import type { DoctorDiscountFormValues } from '../types'

export function DoctorDiscountFormPage() {
  const { create } = useDoctorDiscountResource()
  const [values, setValues] = useState<DoctorDiscountFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah DoctorDiscount</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="discount_id">Discount *</Label>
        <Input id="discount_id" type="number" value={values.discount_id ?? ''} onChange={(e) => setValues({ ...values, discount_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_id">Employee *</Label>
        <Input id="employee_id" type="number" value={values.employee_id ?? ''} onChange={(e) => setValues({ ...values, employee_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="percentage">Percentage *</Label>
        <Input id="percentage" type="number" value={values.percentage ?? ''} onChange={(e) => setValues({ ...values, percentage: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
