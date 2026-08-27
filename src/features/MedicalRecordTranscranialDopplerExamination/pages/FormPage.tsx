import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranscranialDopplerExaminationResource } from '../api'
import type { TranscranialDopplerExaminationFormValues } from '../types'

export function TranscranialDopplerExaminationFormPage() {
  const { create } = useTranscranialDopplerExaminationResource()
  const [values, setValues] = useState<TranscranialDopplerExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah TranscranialDopplerExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="indication">Indication</Label>
        <Input id="indication" type="text" value={values.indication ?? ''} onChange={(e) => setValues({ ...values, indication: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="vessel">Vessel</Label>
        <Input id="vessel" type="text" value={values.vessel ?? ''} onChange={(e) => setValues({ ...values, vessel: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mean_velocity_cm_s">Mean Velocity Cm S</Label>
        <Input id="mean_velocity_cm_s" type="number" value={values.mean_velocity_cm_s ?? ''} onChange={(e) => setValues({ ...values, mean_velocity_cm_s: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pulsatility_index">Pulsatility Index</Label>
        <Input id="pulsatility_index" type="number" value={values.pulsatility_index ?? ''} onChange={(e) => setValues({ ...values, pulsatility_index: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="findings">Findings</Label>
        <Input id="findings" type="text" value={values.findings ?? ''} onChange={(e) => setValues({ ...values, findings: e.target.value })} />
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
