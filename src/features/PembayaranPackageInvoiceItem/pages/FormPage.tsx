import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePackageInvoiceItemResource } from '../api'
import type { PackageInvoiceItemFormValues } from '../types'

export function PackageInvoiceItemFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = usePackageInvoiceItemResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PackageInvoiceItemFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PackageInvoiceItemFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pembayaran-package-invoice-item') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-package-invoice-item') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PackageInvoiceItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_id">Invoice *</Label>
        <Input id="invoice_id" type="number" value={values.invoice_id ?? ''} onChange={(e) => setValues({ ...values, invoice_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="package_id">Package *</Label>
        <Input id="package_id" type="number" value={values.package_id ?? ''} onChange={(e) => setValues({ ...values, package_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" type="number" value={values.quantity ?? ''} onChange={(e) => setValues({ ...values, quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="unit_price">Unit Price *</Label>
        <Input id="unit_price" type="number" value={values.unit_price ?? ''} onChange={(e) => setValues({ ...values, unit_price: e.target.value === '' ? null : Number(e.target.value) })} />
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
