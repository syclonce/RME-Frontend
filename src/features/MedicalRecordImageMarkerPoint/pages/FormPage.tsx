import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useImageMarkerPointResource } from '../api'
import type { ImageMarkerPointFormValues } from '../types'

export function ImageMarkerPointFormPage() {
  const { create } = useImageMarkerPointResource()
  const [values, setValues] = useState<ImageMarkerPointFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ImageMarkerPoint</h1>
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
