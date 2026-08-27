import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInvoiceGuarantorResource } from '../api'
import type { InvoiceGuarantorFormValues } from '../types'

export function InvoiceGuarantorFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useInvoiceGuarantorResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<InvoiceGuarantorFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as InvoiceGuarantorFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pembayaran-invoice-guarantor') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-invoice-guarantor') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} InvoiceGuarantor</h1>
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
