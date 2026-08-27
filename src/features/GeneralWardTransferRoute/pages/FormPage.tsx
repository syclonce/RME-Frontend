import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useWardTransferRouteResource } from '../api'
import type { WardTransferRouteFormValues } from '../types'

export function WardTransferRouteFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useWardTransferRouteResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<WardTransferRouteFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as WardTransferRouteFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-ward-transfer-route') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-ward-transfer-route') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} WardTransferRoute</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="from_ward_id">From Ward *</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.from_ward_id ?? null}
          onChange={(v) => setValues({ ...values, from_ward_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="to_ward_id">To Ward *</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.to_ward_id ?? null}
          onChange={(v) => setValues({ ...values, to_ward_id: v })}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="requires_approval" checked={!!values.requires_approval} onCheckedChange={(v) => setValues({ ...values, requires_approval: !!v })} />
        <Label htmlFor="requires_approval">Requires Approval</Label>
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
