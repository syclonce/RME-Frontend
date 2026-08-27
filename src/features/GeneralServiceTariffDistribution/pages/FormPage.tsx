import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useServiceTariffDistributionResource } from '../api'
import type { ServiceTariffDistributionFormValues } from '../types'

export function ServiceTariffDistributionFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useServiceTariffDistributionResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ServiceTariffDistributionFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ServiceTariffDistributionFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-service-tariff-distribution') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-service-tariff-distribution') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ServiceTariffDistribution</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="service_tariff_id">Service Tariff</Label>
        <Input id="service_tariff_id" type="number" value={values.service_tariff_id ?? ''} onChange={(e) => setValues({ ...values, service_tariff_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="component_id">Component</Label>
        <Input id="component_id" type="number" value={values.component_id ?? ''} onChange={(e) => setValues({ ...values, component_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="amount">Amount *</Label>
        <Input id="amount" type="number" value={values.amount ?? ''} onChange={(e) => setValues({ ...values, amount: e.target.value === '' ? null : Number(e.target.value) })} />
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
