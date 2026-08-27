import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePaymentProviderResource } from '../api'
import type { PaymentProviderFormValues } from '../types'

export function PaymentProviderFormPage() {
  const { create } = usePaymentProviderResource()
  const [values, setValues] = useState<PaymentProviderFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PaymentProvider</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="provider_code">Provider Code</Label>
        <Input id="provider_code" type="text" value={values.provider_code ?? ''} onChange={(e) => setValues({ ...values, provider_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="provider_name">Provider Name *</Label>
        <Input id="provider_name" type="text" value={values.provider_name ?? ''} onChange={(e) => setValues({ ...values, provider_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="provider_type">Provider Type</Label>
        <Input id="provider_type" type="text" value={values.provider_type ?? ''} onChange={(e) => setValues({ ...values, provider_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="merchant_id">Merchant</Label>
        <Input id="merchant_id" type="text" value={values.merchant_id ?? ''} onChange={(e) => setValues({ ...values, merchant_id: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="api_base_url">Api Base Url</Label>
        <Input id="api_base_url" type="text" value={values.api_base_url ?? ''} onChange={(e) => setValues({ ...values, api_base_url: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="contact_person">Contact Person</Label>
        <Input id="contact_person" type="text" value={values.contact_person ?? ''} onChange={(e) => setValues({ ...values, contact_person: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="contact_phone">Contact Phone</Label>
        <Input id="contact_phone" type="text" value={values.contact_phone ?? ''} onChange={(e) => setValues({ ...values, contact_phone: e.target.value })} />
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
