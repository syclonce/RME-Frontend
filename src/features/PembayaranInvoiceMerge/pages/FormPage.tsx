import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useInvoiceMergeResource } from '../api'
import type { InvoiceMergeFormValues } from '../types'

export function InvoiceMergeFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useInvoiceMergeResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<InvoiceMergeFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as InvoiceMergeFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pembayaran-invoice-merge') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-invoice-merge') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} InvoiceMerge</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="merge_number">Merge Number</Label>
        <Input id="merge_number" type="text" value={values.merge_number ?? ''} onChange={(e) => setValues({ ...values, merge_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="payment_id">Payment *</Label>
        <RelationSelect
          endpoint="/payments"
          value={values.payment_id ?? null}
          onChange={(v) => setValues({ ...values, payment_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_id">Invoice *</Label>
        <RelationSelect
          endpoint="/invoices"
          value={values.invoice_id ?? null}
          onChange={(v) => setValues({ ...values, invoice_id: v })}
        />
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
