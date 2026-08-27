import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useImagingOrderResource } from '../api'
import type { ImagingOrderFormValues } from '../types'

export function ImagingOrderFormPage() {
  const { create } = useImagingOrderResource()
  const [values, setValues] = useState<ImagingOrderFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ImagingOrder</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
        <Input id="ordered_by" type="number" value={values.ordered_by ?? ''} onChange={(e) => setValues({ ...values, ordered_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ordered_at">Ordered At *</Label>
        <Input id="ordered_at" type="date" value={values.ordered_at ?? ''} onChange={(e) => setValues({ ...values, ordered_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
