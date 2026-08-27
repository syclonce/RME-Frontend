import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useProviderServiceResource } from '../api'
import type { ProviderServiceFormValues } from '../types'

export function ProviderServiceFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useProviderServiceResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ProviderServiceFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ProviderServiceFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pembayaran-provider-service') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-provider-service') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ProviderService</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="payment_provider_id">Payment Provider *</Label>
        <Input id="payment_provider_id" type="number" value={values.payment_provider_id ?? ''} onChange={(e) => setValues({ ...values, payment_provider_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="service_code">Service Code</Label>
        <Input id="service_code" type="text" value={values.service_code ?? ''} onChange={(e) => setValues({ ...values, service_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="service_name">Service Name *</Label>
        <Input id="service_name" type="text" value={values.service_name ?? ''} onChange={(e) => setValues({ ...values, service_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="service_type">Service Type</Label>
        <Input id="service_type" type="text" value={values.service_type ?? ''} onChange={(e) => setValues({ ...values, service_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="admin_fee_type">Admin Fee Type</Label>
        <Input id="admin_fee_type" type="text" value={values.admin_fee_type ?? ''} onChange={(e) => setValues({ ...values, admin_fee_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="admin_fee_amount">Admin Fee Amount</Label>
        <Input id="admin_fee_amount" type="number" value={values.admin_fee_amount ?? ''} onChange={(e) => setValues({ ...values, admin_fee_amount: e.target.value === '' ? null : Number(e.target.value) })} />
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
