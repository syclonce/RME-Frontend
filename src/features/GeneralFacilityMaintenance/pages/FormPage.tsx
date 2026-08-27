import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMaintenanceAssetResource } from '../api'
import type { MaintenanceAssetFormValues } from '../types'

export function MaintenanceAssetFormPage() {
  const { create } = useMaintenanceAssetResource()
  const [values, setValues] = useState<MaintenanceAssetFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah MaintenanceAsset</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="asset_code">Asset Code *</Label>
        <Input id="asset_code" type="text" value={values.asset_code ?? ''} onChange={(e) => setValues({ ...values, asset_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="asset_name">Asset Name *</Label>
        <Input id="asset_name" type="text" value={values.asset_name ?? ''} onChange={(e) => setValues({ ...values, asset_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="location">Location</Label>
        <Input id="location" type="text" value={values.location ?? ''} onChange={(e) => setValues({ ...values, location: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward</Label>
        <Input id="ward_id" type="number" value={values.ward_id ?? ''} onChange={(e) => setValues({ ...values, ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
