import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInvoiceMergeResource } from '../api'
import type { InvoiceMergeFormValues } from '../types'

export function InvoiceMergeFormPage() {
  const { create } = useInvoiceMergeResource()
  const [values, setValues] = useState<InvoiceMergeFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InvoiceMerge</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="merge_number">Merge Number</Label>
        <Input id="merge_number" type="text" value={values.merge_number ?? ''} onChange={(e) => setValues({ ...values, merge_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="payment_id">Payment *</Label>
        <Input id="payment_id" type="number" value={values.payment_id ?? ''} onChange={(e) => setValues({ ...values, payment_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_id">Invoice *</Label>
        <Input id="invoice_id" type="number" value={values.invoice_id ?? ''} onChange={(e) => setValues({ ...values, invoice_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="allocated_amount">Allocated Amount *</Label>
        <Input id="allocated_amount" type="number" value={values.allocated_amount ?? ''} onChange={(e) => setValues({ ...values, allocated_amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="merged_at">Merged At</Label>
        <Input id="merged_at" type="date" value={values.merged_at ?? ''} onChange={(e) => setValues({ ...values, merged_at: e.target.value })} />
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
