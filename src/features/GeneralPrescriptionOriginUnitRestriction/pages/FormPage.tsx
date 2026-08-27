import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePrescriptionOriginUnitRestrictionResource } from '../api'
import type { PrescriptionOriginUnitRestrictionFormValues } from '../types'

export function PrescriptionOriginUnitRestrictionFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePrescriptionOriginUnitRestrictionResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PrescriptionOriginUnitRestrictionFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PrescriptionOriginUnitRestrictionFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-prescription-origin-unit-restriction') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-prescription-origin-unit-restriction') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PrescriptionOriginUnitRestriction</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.ward_id ?? null}
          onChange={(v) => setValues({ ...values, ward_id: v })}
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
      <div className="flex items-center gap-2">
        <Checkbox id="is_allowed" checked={!!values.is_allowed} onCheckedChange={(v) => setValues({ ...values, is_allowed: !!v })} />
        <Label htmlFor="is_allowed">Is Allowed</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="note">Note</Label>
        <Input id="note" type="text" value={values.note ?? ''} onChange={(e) => setValues({ ...values, note: e.target.value })} />
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
