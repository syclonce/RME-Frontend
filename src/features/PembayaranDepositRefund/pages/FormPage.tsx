import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDepositRefundResource } from '../api'
import type { DepositRefundFormValues } from '../types'

export function DepositRefundFormPage() {
  const { create } = useDepositRefundResource()
  const [values, setValues] = useState<DepositRefundFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah DepositRefund</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="deposit_id">Deposit *</Label>
        <Input id="deposit_id" type="number" value={values.deposit_id ?? ''} onChange={(e) => setValues({ ...values, deposit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="refunded_amount">Refunded Amount *</Label>
        <Input id="refunded_amount" type="number" value={values.refunded_amount ?? ''} onChange={(e) => setValues({ ...values, refunded_amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
