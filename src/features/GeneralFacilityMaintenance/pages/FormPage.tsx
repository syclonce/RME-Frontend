import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useMaintenanceAssetResource } from '../api'
import type { MaintenanceAssetFormValues } from '../types'

export function MaintenanceAssetFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useMaintenanceAssetResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<MaintenanceAssetFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as MaintenanceAssetFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-facility-maintenance') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-facility-maintenance') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} MaintenanceAsset</h1>
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
        <RelationSelect
          endpoint="/wards"
          value={values.ward_id ?? null}
          onChange={(v) => setValues({ ...values, ward_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
