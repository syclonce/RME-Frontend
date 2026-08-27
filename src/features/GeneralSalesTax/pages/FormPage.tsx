import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSalesTaxResource } from '../api'
import type { SalesTaxFormValues } from '../types'

export function SalesTaxFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useSalesTaxResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<SalesTaxFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as SalesTaxFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-sales-tax') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-sales-tax') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} SalesTax</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="rate">Rate *</Label>
        <Input id="rate" type="number" value={values.rate ?? ''} onChange={(e) => setValues({ ...values, rate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="effective_date">Effective Date</Label>
        <Input id="effective_date" type="date" value={values.effective_date ?? ''} onChange={(e) => setValues({ ...values, effective_date: e.target.value })} />
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
