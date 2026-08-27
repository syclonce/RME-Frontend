import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBloodTransfusionObservationResource } from '../api'
import type { BloodTransfusionObservationFormValues } from '../types'

export function BloodTransfusionObservationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useBloodTransfusionObservationResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<BloodTransfusionObservationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as BloodTransfusionObservationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-blood-transfusion-observation') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-blood-transfusion-observation') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} BloodTransfusionObservation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_transfusion_id">Blood Transfusion *</Label>
        <Input id="blood_transfusion_id" type="number" value={values.blood_transfusion_id ?? ''} onChange={(e) => setValues({ ...values, blood_transfusion_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="observed_at">Observed At *</Label>
        <Input id="observed_at" type="date" value={values.observed_at ?? ''} onChange={(e) => setValues({ ...values, observed_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="temperature_c">Temperature C</Label>
        <Input id="temperature_c" type="number" value={values.temperature_c ?? ''} onChange={(e) => setValues({ ...values, temperature_c: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pulse_rate">Pulse Rate</Label>
        <Input id="pulse_rate" type="number" value={values.pulse_rate ?? ''} onChange={(e) => setValues({ ...values, pulse_rate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_pressure">Blood Pressure</Label>
        <Input id="blood_pressure" type="text" value={values.blood_pressure ?? ''} onChange={(e) => setValues({ ...values, blood_pressure: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reaction_signs">Reaction Signs</Label>
        <Input id="reaction_signs" type="text" value={values.reaction_signs ?? ''} onChange={(e) => setValues({ ...values, reaction_signs: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="volume_transfused_ml">Volume Transfused Ml</Label>
        <Input id="volume_transfused_ml" type="number" value={values.volume_transfused_ml ?? ''} onChange={(e) => setValues({ ...values, volume_transfused_ml: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
