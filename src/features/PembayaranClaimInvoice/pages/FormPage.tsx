import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useClaimInvoiceResource } from '../api'
import type { ClaimInvoiceFormValues } from '../types'

export function ClaimInvoiceFormPage() {
  const { create } = useClaimInvoiceResource()
  const [values, setValues] = useState<ClaimInvoiceFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ClaimInvoice</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="claim_number">Claim Number</Label>
        <Input id="claim_number" type="text" value={values.claim_number ?? ''} onChange={(e) => setValues({ ...values, claim_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_id">Invoice *</Label>
        <Input id="invoice_id" type="number" value={values.invoice_id ?? ''} onChange={(e) => setValues({ ...values, invoice_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="guarantor_id">Guarantor</Label>
        <Input id="guarantor_id" type="number" value={values.guarantor_id ?? ''} onChange={(e) => setValues({ ...values, guarantor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="claim_amount">Claim Amount *</Label>
        <Input id="claim_amount" type="number" value={values.claim_amount ?? ''} onChange={(e) => setValues({ ...values, claim_amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
