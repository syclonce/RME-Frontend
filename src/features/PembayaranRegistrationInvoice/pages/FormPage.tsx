import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useRegistrationInvoiceResource } from '../api'
import type { RegistrationInvoiceFormValues } from '../types'

export function RegistrationInvoiceFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useRegistrationInvoiceResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<RegistrationInvoiceFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as RegistrationInvoiceFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pembayaran-registration-invoice') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-registration-invoice') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} RegistrationInvoice</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="registration_id">Registration *</Label>
        <AsyncCombobox
          endpoint="/registrations"
          value={values.registration_id ?? null}
          onChange={(v) => setValues({ ...values, registration_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_id">Invoice *</Label>
        <AsyncCombobox
          endpoint="/invoices"
          value={values.invoice_id ?? null}
          onChange={(v) => setValues({ ...values, invoice_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_category">Invoice Category</Label>
        <Input id="invoice_category" type="text" value={values.invoice_category ?? ''} onChange={(e) => setValues({ ...values, invoice_category: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="amount">Amount *</Label>
        <Input id="amount" type="number" value={values.amount ?? ''} onChange={(e) => setValues({ ...values, amount: e.target.value === '' ? null : Number(e.target.value) })} />
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
