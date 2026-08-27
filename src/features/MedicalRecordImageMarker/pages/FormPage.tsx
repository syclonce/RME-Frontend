import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useImageMarkerResource } from '../api'
import type { ImageMarkerFormValues } from '../types'

export function ImageMarkerFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useImageMarkerResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ImageMarkerFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ImageMarkerFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-image-marker') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-image-marker') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ImageMarker</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="image_path">Image Path *</Label>
        <Input id="image_path" type="text" value={values.image_path ?? ''} onChange={(e) => setValues({ ...values, image_path: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="template_name">Template Name</Label>
        <Input id="template_name" type="text" value={values.template_name ?? ''} onChange={(e) => setValues({ ...values, template_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="marked_at">Marked At</Label>
        <Input id="marked_at" type="date" value={values.marked_at ?? ''} onChange={(e) => setValues({ ...values, marked_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
