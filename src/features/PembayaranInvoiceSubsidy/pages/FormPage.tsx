import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useInvoiceSubsidyResource } from '../api'
import type { InvoiceSubsidyFormValues } from '../types'

export function InvoiceSubsidyFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useInvoiceSubsidyResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<InvoiceSubsidyFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as InvoiceSubsidyFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pembayaran-invoice-subsidy') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-invoice-subsidy') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} InvoiceSubsidy</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_id">Invoice *</Label>
        <RelationSelect
          endpoint="/invoices"
          value={values.invoice_id ?? null}
          onChange={(v) => setValues({ ...values, invoice_id: v })}
        />
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
