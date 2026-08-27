import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePackageTariffDistributionItemResource } from '../api'
import type { PackageTariffDistributionItemFormValues } from '../types'

export function PackageTariffDistributionItemFormPage() {
  const { create } = usePackageTariffDistributionItemResource()
  const [values, setValues] = useState<PackageTariffDistributionItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PackageTariffDistributionItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="package_tariff_distribution_id">Package Tariff Distribution *</Label>
        <Input id="package_tariff_distribution_id" type="number" value={values.package_tariff_distribution_id ?? ''} onChange={(e) => setValues({ ...values, package_tariff_distribution_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recipient_type">Recipient Type *</Label>
        <Input id="recipient_type" type="text" value={values.recipient_type ?? ''} onChange={(e) => setValues({ ...values, recipient_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recipient_id">Recipient</Label>
        <Input id="recipient_id" type="number" value={values.recipient_id ?? ''} onChange={(e) => setValues({ ...values, recipient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="percentage">Percentage</Label>
        <Input id="percentage" type="number" value={values.percentage ?? ''} onChange={(e) => setValues({ ...values, percentage: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="amount">Amount *</Label>
        <Input id="amount" type="number" value={values.amount ?? ''} onChange={(e) => setValues({ ...values, amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
