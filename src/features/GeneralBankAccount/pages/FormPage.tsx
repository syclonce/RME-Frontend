import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBankAccountResource } from '../api'
import type { BankAccountFormValues } from '../types'

export function BankAccountFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useBankAccountResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<BankAccountFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as BankAccountFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-bank-account') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-bank-account') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} BankAccount</h1>
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
