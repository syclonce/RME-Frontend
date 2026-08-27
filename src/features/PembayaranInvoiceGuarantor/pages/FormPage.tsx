import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInvoiceGuarantorResource } from '../api'
import type { InvoiceGuarantorFormValues } from '../types'

export function InvoiceGuarantorFormPage() {
  const { create } = useInvoiceGuarantorResource()
  const [values, setValues] = useState<InvoiceGuarantorFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InvoiceGuarantor</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_id">Invoice *</Label>
        <Input id="invoice_id" type="number" value={values.invoice_id ?? ''} onChange={(e) => setValues({ ...values, invoice_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="guarantor_id">Guarantor *</Label>
        <Input id="guarantor_id" type="number" value={values.guarantor_id ?? ''} onChange={(e) => setValues({ ...values, guarantor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="covered_amount">Covered Amount</Label>
        <Input id="covered_amount" type="number" value={values.covered_amount ?? ''} onChange={(e) => setValues({ ...values, covered_amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="coverage_percentage">Coverage Percentage</Label>
        <Input id="coverage_percentage" type="number" value={values.coverage_percentage ?? ''} onChange={(e) => setValues({ ...values, coverage_percentage: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="verification_status">Verification Status</Label>
        <Input id="verification_status" type="text" value={values.verification_status ?? ''} onChange={(e) => setValues({ ...values, verification_status: e.target.value })} />
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
