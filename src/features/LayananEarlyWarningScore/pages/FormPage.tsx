import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useVitalSignObservationResource } from '../api'
import type { VitalSignObservationFormValues } from '../types'

export function VitalSignObservationFormPage() {
  const navigate = useNavigate()
  const { create } = useVitalSignObservationResource()
  const [values, setValues] = useState<VitalSignObservationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-early-warning-score') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah VitalSignObservation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="respiratory_rate">Respiratory Rate *</Label>
        <Input id="respiratory_rate" type="number" value={values.respiratory_rate ?? ''} onChange={(e) => setValues({ ...values, respiratory_rate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="spo2">Spo2 *</Label>
        <Input id="spo2" type="number" value={values.spo2 ?? ''} onChange={(e) => setValues({ ...values, spo2: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="systolic_bp">Systolic Bp *</Label>
        <Input id="systolic_bp" type="number" value={values.systolic_bp ?? ''} onChange={(e) => setValues({ ...values, systolic_bp: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pulse_rate">Pulse Rate *</Label>
        <Input id="pulse_rate" type="number" value={values.pulse_rate ?? ''} onChange={(e) => setValues({ ...values, pulse_rate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="consciousness_level">Consciousness Level *</Label>
        <Input id="consciousness_level" type="text" value={values.consciousness_level ?? ''} onChange={(e) => setValues({ ...values, consciousness_level: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="temperature_celsius">Temperature Celsius *</Label>
        <Input id="temperature_celsius" type="number" value={values.temperature_celsius ?? ''} onChange={(e) => setValues({ ...values, temperature_celsius: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.recorded_by ?? null}
          onChange={(v) => setValues({ ...values, recorded_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
