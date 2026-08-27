import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePackageItemResource } from '../api'
import type { PackageItemFormValues } from '../types'

export function PackageItemFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePackageItemResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PackageItemFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PackageItemFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-package-item') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-package-item') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PackageItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="package_id">Package</Label>
        <RelationSelect
          endpoint="/packages"
          value={values.package_id ?? null}
          onChange={(v) => setValues({ ...values, package_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id">Item</Label>
        <RelationSelect
          endpoint="/items"
          value={values.item_id ?? null}
          onChange={(v) => setValues({ ...values, item_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantity">Quantity *</Label>
        <Input id="quantity" type="number" value={values.quantity ?? ''} onChange={(e) => setValues({ ...values, quantity: e.target.value === '' ? null : Number(e.target.value) })} />
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
