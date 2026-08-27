import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBankAccountResource } from '../api'
import type { BankAccountFormValues } from '../types'

export function BankAccountFormPage() {
  const { create } = useBankAccountResource()
  const [values, setValues] = useState<BankAccountFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BankAccount</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="bank_name">Bank Name *</Label>
        <Input id="bank_name" type="text" value={values.bank_name ?? ''} onChange={(e) => setValues({ ...values, bank_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="account_number">Account Number *</Label>
        <Input id="account_number" type="text" value={values.account_number ?? ''} onChange={(e) => setValues({ ...values, account_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="account_holder">Account Holder *</Label>
        <Input id="account_holder" type="text" value={values.account_holder ?? ''} onChange={(e) => setValues({ ...values, account_holder: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="account_type">Account Type</Label>
        <Input id="account_type" type="text" value={values.account_type ?? ''} onChange={(e) => setValues({ ...values, account_type: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
