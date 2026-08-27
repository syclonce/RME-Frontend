import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInvoiceItemResource } from '../api'
import type { InvoiceItemFormValues } from '../types'

export function InvoiceItemFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useInvoiceItemResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<InvoiceItemFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as InvoiceItemFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pembayaran-invoice-item') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-invoice-item') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} InvoiceItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_id">Invoice *</Label>
        <Input id="invoice_id" type="number" value={values.invoice_id ?? ''} onChange={(e) => setValues({ ...values, invoice_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="service_id">Service</Label>
        <Input id="service_id" type="number" value={values.service_id ?? ''} onChange={(e) => setValues({ ...values, service_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="description">Description *</Label>
        <Input id="description" type="text" value={values.description ?? ''} onChange={(e) => setValues({ ...values, description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="category">Category</Label>
        <Input id="category" type="text" value={values.category ?? ''} onChange={(e) => setValues({ ...values, category: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantity">Quantity *</Label>
        <Input id="quantity" type="number" value={values.quantity ?? ''} onChange={(e) => setValues({ ...values, quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
