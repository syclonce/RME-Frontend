import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePaymentResource } from '../api'
import type { PaymentFormValues } from '../types'

export function PaymentFormPage() {
  const navigate = useNavigate()
  const { create } = usePaymentResource()
  const [values, setValues] = useState<PaymentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-payment') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Payment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="payment_number">Payment Number</Label>
        <Input id="payment_number" type="text" value={values.payment_number ?? ''} onChange={(e) => setValues({ ...values, payment_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_id">Invoice *</Label>
        <Input id="invoice_id" type="number" value={values.invoice_id ?? ''} onChange={(e) => setValues({ ...values, invoice_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="payment_method">Payment Method *</Label>
        <Input id="payment_method" type="text" value={values.payment_method ?? ''} onChange={(e) => setValues({ ...values, payment_method: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="amount">Amount *</Label>
        <Input id="amount" type="number" value={values.amount ?? ''} onChange={(e) => setValues({ ...values, amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="admin_fee">Admin Fee</Label>
        <Input id="admin_fee" type="number" value={values.admin_fee ?? ''} onChange={(e) => setValues({ ...values, admin_fee: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="paid_at">Paid At</Label>
        <Input id="paid_at" type="date" value={values.paid_at ?? ''} onChange={(e) => setValues({ ...values, paid_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
