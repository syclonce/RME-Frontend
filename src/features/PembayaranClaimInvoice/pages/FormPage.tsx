import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useClaimInvoiceResource } from '../api'
import type { ClaimInvoiceFormValues } from '../types'

export function ClaimInvoiceFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useClaimInvoiceResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ClaimInvoiceFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ClaimInvoiceFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pembayaran-claim-invoice') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-claim-invoice') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ClaimInvoice</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="claim_number">Claim Number</Label>
        <Input id="claim_number" type="text" value={values.claim_number ?? ''} onChange={(e) => setValues({ ...values, claim_number: e.target.value })} />
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
        <Label htmlFor="guarantor_id">Guarantor</Label>
        <RelationSelect
          endpoint="/guarantors"
          value={values.guarantor_id ?? null}
          onChange={(v) => setValues({ ...values, guarantor_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="claim_amount">Claim Amount *</Label>
        <Input id="claim_amount" type="number" value={values.claim_amount ?? ''} onChange={(e) => setValues({ ...values, claim_amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
