import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useBloodTransfusionResource } from '../api'
import type { BloodTransfusionFormValues } from '../types'

export function BloodTransfusionFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useBloodTransfusionResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<BloodTransfusionFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as BloodTransfusionFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-blood-transfusion') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-blood-transfusion') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} BloodTransfusion</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_type_id">Blood Type *</Label>
        <RelationSelect
          endpoint="/blood_types"
          value={values.blood_type_id ?? null}
          onChange={(v) => setValues({ ...values, blood_type_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="volume_ml">Volume Ml</Label>
        <Input id="volume_ml" type="number" value={values.volume_ml ?? ''} onChange={(e) => setValues({ ...values, volume_ml: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="started_at">Started At</Label>
        <Input id="started_at" type="date" value={values.started_at ?? ''} onChange={(e) => setValues({ ...values, started_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="administered_by">Administered By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.administered_by ?? null}
          onChange={(v) => setValues({ ...values, administered_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reaction_notes">Reaction Notes</Label>
        <Input id="reaction_notes" type="text" value={values.reaction_notes ?? ''} onChange={(e) => setValues({ ...values, reaction_notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
