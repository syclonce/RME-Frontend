import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useDoctorDiscountResource } from '../api'
import type { DoctorDiscountFormValues } from '../types'

export function DoctorDiscountFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useDoctorDiscountResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<DoctorDiscountFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as DoctorDiscountFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pembayaran-doctor-discount') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-doctor-discount') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} DoctorDiscount</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="discount_id">Discount *</Label>
        <RelationSelect
          endpoint="/discounts"
          value={values.discount_id ?? null}
          onChange={(v) => setValues({ ...values, discount_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_id">Employee *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.employee_id ?? null}
          onChange={(v) => setValues({ ...values, employee_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="percentage">Percentage *</Label>
        <Input id="percentage" type="number" value={values.percentage ?? ''} onChange={(e) => setValues({ ...values, percentage: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
