import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useImageMarkerPointResource } from '../api'
import type { ImageMarkerPointFormValues } from '../types'

export function ImageMarkerPointFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useImageMarkerPointResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ImageMarkerPointFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ImageMarkerPointFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-image-marker-point') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-image-marker-point') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ImageMarkerPoint</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="image_marker_id">Image Marker *</Label>
        <Input id="image_marker_id" type="number" value={values.image_marker_id ?? ''} onChange={(e) => setValues({ ...values, image_marker_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="x_coordinate">X Coordinate *</Label>
        <Input id="x_coordinate" type="number" value={values.x_coordinate ?? ''} onChange={(e) => setValues({ ...values, x_coordinate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="y_coordinate">Y Coordinate *</Label>
        <Input id="y_coordinate" type="number" value={values.y_coordinate ?? ''} onChange={(e) => setValues({ ...values, y_coordinate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="label">Label</Label>
        <Input id="label" type="text" value={values.label ?? ''} onChange={(e) => setValues({ ...values, label: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input id="description" type="text" value={values.description ?? ''} onChange={(e) => setValues({ ...values, description: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
