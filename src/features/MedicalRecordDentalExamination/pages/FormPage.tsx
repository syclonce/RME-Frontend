import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDentalExaminationResource } from '../api'
import type { DentalExaminationFormValues } from '../types'

export function DentalExaminationFormPage() {
  const { create } = useDentalExaminationResource()
  const [values, setValues] = useState<DentalExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah DentalExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="decayed_teeth_count">Decayed Teeth Count</Label>
        <Input id="decayed_teeth_count" type="number" value={values.decayed_teeth_count ?? ''} onChange={(e) => setValues({ ...values, decayed_teeth_count: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="missing_teeth_count">Missing Teeth Count</Label>
        <Input id="missing_teeth_count" type="number" value={values.missing_teeth_count ?? ''} onChange={(e) => setValues({ ...values, missing_teeth_count: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="filled_teeth_count">Filled Teeth Count</Label>
        <Input id="filled_teeth_count" type="number" value={values.filled_teeth_count ?? ''} onChange={(e) => setValues({ ...values, filled_teeth_count: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="odontogram_json">Odontogram Json</Label>
        <Input id="odontogram_json" type="text" value={values.odontogram_json ?? ''} onChange={(e) => setValues({ ...values, odontogram_json: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="occlusion_status">Occlusion Status</Label>
        <Input id="occlusion_status" type="text" value={values.occlusion_status ?? ''} onChange={(e) => setValues({ ...values, occlusion_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
