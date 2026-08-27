import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useInvoiceCancellationResource } from '../api'
import type { InvoiceCancellationFormValues } from '../types'

export function InvoiceCancellationFormPage() {
  const navigate = useNavigate()
  const { create } = useInvoiceCancellationResource()
  const [values, setValues] = useState<InvoiceCancellationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-invoice-cancellation') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InvoiceCancellation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_id">Invoice *</Label>
        <AsyncCombobox
          endpoint="/invoices"
          value={values.invoice_id ?? null}
          onChange={(v) => setValues({ ...values, invoice_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason *</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
