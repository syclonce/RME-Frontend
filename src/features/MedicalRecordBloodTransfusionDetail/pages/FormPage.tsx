import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useBloodTransfusionDetailResource } from '../api'
import type { BloodTransfusionDetailFormValues } from '../types'

export function BloodTransfusionDetailFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useBloodTransfusionDetailResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<BloodTransfusionDetailFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as BloodTransfusionDetailFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-blood-transfusion-detail') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-blood-transfusion-detail') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} BloodTransfusionDetail</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="transfusion_id">Transfusion *</Label>
        <RelationSelect
          endpoint="/blood-transfusions"
          value={values.transfusion_id ?? null}
          onChange={(v) => setValues({ ...values, transfusion_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_bag_number">Blood Bag Number *</Label>
        <Input id="blood_bag_number" type="text" value={values.blood_bag_number ?? ''} onChange={(e) => setValues({ ...values, blood_bag_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_type">Blood Type</Label>
        <Input id="blood_type" type="text" value={values.blood_type ?? ''} onChange={(e) => setValues({ ...values, blood_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="volume_ml">Volume Ml *</Label>
        <Input id="volume_ml" type="number" value={values.volume_ml ?? ''} onChange={(e) => setValues({ ...values, volume_ml: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="start_time">Start Time</Label>
        <Input id="start_time" type="date" value={values.start_time ?? ''} onChange={(e) => setValues({ ...values, start_time: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="end_time">End Time</Label>
        <Input id="end_time" type="date" value={values.end_time ?? ''} onChange={(e) => setValues({ ...values, end_time: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reaction_observed">Reaction Observed</Label>
        <Input id="reaction_observed" type="text" value={values.reaction_observed ?? ''} onChange={(e) => setValues({ ...values, reaction_observed: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
