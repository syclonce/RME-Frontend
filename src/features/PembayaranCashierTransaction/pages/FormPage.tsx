import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useCashierTransactionResource } from '../api'
import type { CashierTransactionFormValues } from '../types'

export function CashierTransactionFormPage() {
  const navigate = useNavigate()
  const { create } = useCashierTransactionResource()
  const [values, setValues] = useState<CashierTransactionFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-cashier-transaction') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah CashierTransaction</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="cashier_id">Cashier *</Label>
        <RelationSelect
          endpoint="/cashiers"
          value={values.cashier_id ?? null}
          onChange={(v) => setValues({ ...values, cashier_id: v })}
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
        <Label htmlFor="amount">Amount *</Label>
        <Input id="amount" type="number" value={values.amount ?? ''} onChange={(e) => setValues({ ...values, amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="transaction_type">Transaction Type *</Label>
        <Input id="transaction_type" type="text" value={values.transaction_type ?? ''} onChange={(e) => setValues({ ...values, transaction_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="transacted_at">Transacted At</Label>
        <Input id="transacted_at" type="date" value={values.transacted_at ?? ''} onChange={(e) => setValues({ ...values, transacted_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
