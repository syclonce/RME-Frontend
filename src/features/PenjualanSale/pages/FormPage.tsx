import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSaleResource } from '../api'
import type { SaleFormValues } from '../types'

export function SaleFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useSaleResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<SaleFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as SaleFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/penjualan-sale') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/penjualan-sale') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Sale</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sold_by">Sold By *</Label>
        <Input id="sold_by" type="number" value={values.sold_by ?? ''} onChange={(e) => setValues({ ...values, sold_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sold_at">Sold At</Label>
        <Input id="sold_at" type="date" value={values.sold_at ?? ''} onChange={(e) => setValues({ ...values, sold_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_amount">Total Amount *</Label>
        <Input id="total_amount" type="number" value={values.total_amount ?? ''} onChange={(e) => setValues({ ...values, total_amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
