import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePackageTariffDistributionResource } from '../api'
import type { PackageTariffDistributionFormValues } from '../types'

export function PackageTariffDistributionFormPage() {
  const { create } = usePackageTariffDistributionResource()
  const [values, setValues] = useState<PackageTariffDistributionFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PackageTariffDistribution</h1>
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
