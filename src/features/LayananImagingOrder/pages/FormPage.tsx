import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useImagingOrderResource } from '../api'
import type { ImagingOrderFormValues } from '../types'

export function ImagingOrderFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useImagingOrderResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ImagingOrderFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ImagingOrderFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-imaging-order') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-imaging-order') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ImagingOrder</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="modality">Modality *</Label>
        <Input id="modality" type="text" value={values.modality ?? ''} onChange={(e) => setValues({ ...values, modality: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="body_part">Body Part *</Label>
        <Input id="body_part" type="text" value={values.body_part ?? ''} onChange={(e) => setValues({ ...values, body_part: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ordered_by">Ordered By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.ordered_by ?? null}
          onChange={(v) => setValues({ ...values, ordered_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ordered_at">Ordered At *</Label>
        <Input id="ordered_at" type="date" value={values.ordered_at ?? ''} onChange={(e) => setValues({ ...values, ordered_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
