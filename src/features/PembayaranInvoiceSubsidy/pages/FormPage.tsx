import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInvoiceSubsidyResource } from '../api'
import type { InvoiceSubsidyFormValues } from '../types'

export function InvoiceSubsidyFormPage() {
  const { create } = useInvoiceSubsidyResource()
  const [values, setValues] = useState<InvoiceSubsidyFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InvoiceSubsidy</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_id">Invoice *</Label>
        <Input id="invoice_id" type="number" value={values.invoice_id ?? ''} onChange={(e) => setValues({ ...values, invoice_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="subsidy_source">Subsidy Source *</Label>
        <Input id="subsidy_source" type="text" value={values.subsidy_source ?? ''} onChange={(e) => setValues({ ...values, subsidy_source: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="subsidy_amount">Subsidy Amount *</Label>
        <Input id="subsidy_amount" type="number" value={values.subsidy_amount ?? ''} onChange={(e) => setValues({ ...values, subsidy_amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
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
