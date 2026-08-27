import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTransferResource } from '../api'
import type { TransferFormValues } from '../types'

export function TransferFormPage() {
  const { create } = useTransferResource()
  const [values, setValues] = useState<TransferFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Transfer</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="payment_id">Payment *</Label>
        <Input id="payment_id" type="number" value={values.payment_id ?? ''} onChange={(e) => setValues({ ...values, payment_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="transfer_reference_number">Transfer Reference Number *</Label>
        <Input id="transfer_reference_number" type="text" value={values.transfer_reference_number ?? ''} onChange={(e) => setValues({ ...values, transfer_reference_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="source_bank_name">Source Bank Name *</Label>
        <Input id="source_bank_name" type="text" value={values.source_bank_name ?? ''} onChange={(e) => setValues({ ...values, source_bank_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="destination_account_number">Destination Account Number *</Label>
        <Input id="destination_account_number" type="text" value={values.destination_account_number ?? ''} onChange={(e) => setValues({ ...values, destination_account_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="destination_account_name">Destination Account Name *</Label>
        <Input id="destination_account_name" type="text" value={values.destination_account_name ?? ''} onChange={(e) => setValues({ ...values, destination_account_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="amount">Amount *</Label>
        <Input id="amount" type="number" value={values.amount ?? ''} onChange={(e) => setValues({ ...values, amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="transferred_at">Transferred At</Label>
        <Input id="transferred_at" type="date" value={values.transferred_at ?? ''} onChange={(e) => setValues({ ...values, transferred_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="proof_file_path">Proof File Path</Label>
        <Input id="proof_file_path" type="text" value={values.proof_file_path ?? ''} onChange={(e) => setValues({ ...values, proof_file_path: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
