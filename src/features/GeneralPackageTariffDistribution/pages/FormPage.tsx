import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePackageTariffDistributionResource } from '../api'
import type { PackageTariffDistributionFormValues } from '../types'

export function PackageTariffDistributionFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = usePackageTariffDistributionResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PackageTariffDistributionFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PackageTariffDistributionFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-package-tariff-distribution') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-package-tariff-distribution') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PackageTariffDistribution</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="package_id">Package *</Label>
        <Input id="package_id" type="number" value={values.package_id ?? ''} onChange={(e) => setValues({ ...values, package_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="component_name">Component Name *</Label>
        <Input id="component_name" type="text" value={values.component_name ?? ''} onChange={(e) => setValues({ ...values, component_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="percentage">Percentage</Label>
        <Input id="percentage" type="number" value={values.percentage ?? ''} onChange={(e) => setValues({ ...values, percentage: e.target.value === '' ? null : Number(e.target.value) })} />
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
