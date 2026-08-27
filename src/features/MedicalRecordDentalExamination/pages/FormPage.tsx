import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useDentalExaminationResource } from '../api'
import type { DentalExaminationFormValues } from '../types'

export function DentalExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useDentalExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<DentalExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as DentalExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-dental-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-dental-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} DentalExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
