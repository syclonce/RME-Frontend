import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCorporateReceivableResource } from '../api'
import type { CorporateReceivableFormValues } from '../types'

export function CorporateReceivableFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useCorporateReceivableResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<CorporateReceivableFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as CorporateReceivableFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pembayaran-corporate-receivable') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-corporate-receivable') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} CorporateReceivable</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_id">Invoice *</Label>
        <Input id="invoice_id" type="number" value={values.invoice_id ?? ''} onChange={(e) => setValues({ ...values, invoice_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="guarantor_id">Guarantor *</Label>
        <Input id="guarantor_id" type="number" value={values.guarantor_id ?? ''} onChange={(e) => setValues({ ...values, guarantor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="amount">Amount *</Label>
        <Input id="amount" type="number" value={values.amount ?? ''} onChange={(e) => setValues({ ...values, amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="due_date">Due Date *</Label>
        <Input id="due_date" type="date" value={values.due_date ?? ''} onChange={(e) => setValues({ ...values, due_date: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
