import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEdcResource } from '../api'
import type { EdcFormValues } from '../types'

export function EdcFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useEdcResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<EdcFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as EdcFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pembayaran-edc') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-edc') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Edc</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="payment_id">Payment *</Label>
        <Input id="payment_id" type="number" value={values.payment_id ?? ''} onChange={(e) => setValues({ ...values, payment_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="edc_reference_number">Edc Reference Number *</Label>
        <Input id="edc_reference_number" type="text" value={values.edc_reference_number ?? ''} onChange={(e) => setValues({ ...values, edc_reference_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bank_name">Bank Name *</Label>
        <Input id="bank_name" type="text" value={values.bank_name ?? ''} onChange={(e) => setValues({ ...values, bank_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="card_type">Card Type *</Label>
        <Input id="card_type" type="text" value={values.card_type ?? ''} onChange={(e) => setValues({ ...values, card_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="card_last_four">Card Last Four</Label>
        <Input id="card_last_four" type="text" value={values.card_last_four ?? ''} onChange={(e) => setValues({ ...values, card_last_four: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="approval_code">Approval Code</Label>
        <Input id="approval_code" type="text" value={values.approval_code ?? ''} onChange={(e) => setValues({ ...values, approval_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="amount">Amount *</Label>
        <Input id="amount" type="number" value={values.amount ?? ''} onChange={(e) => setValues({ ...values, amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="transaction_at">Transaction At</Label>
        <Input id="transaction_at" type="date" value={values.transaction_at ?? ''} onChange={(e) => setValues({ ...values, transaction_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
