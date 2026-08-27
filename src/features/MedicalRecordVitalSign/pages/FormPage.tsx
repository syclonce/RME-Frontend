import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useVitalSignResource } from '../api'
import type { VitalSignFormValues } from '../types'

export function VitalSignFormPage() {
  const navigate = useNavigate()
  const { create } = useVitalSignResource()
  const [values, setValues] = useState<VitalSignFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-vital-sign') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah VitalSign</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="temperature">Temperature</Label>
        <Input id="temperature" type="number" value={values.temperature ?? ''} onChange={(e) => setValues({ ...values, temperature: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pulse">Pulse</Label>
        <Input id="pulse" type="number" value={values.pulse ?? ''} onChange={(e) => setValues({ ...values, pulse: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="respiratory_rate">Respiratory Rate</Label>
        <Input id="respiratory_rate" type="number" value={values.respiratory_rate ?? ''} onChange={(e) => setValues({ ...values, respiratory_rate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="systolic">Systolic</Label>
        <Input id="systolic" type="number" value={values.systolic ?? ''} onChange={(e) => setValues({ ...values, systolic: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diastolic">Diastolic</Label>
        <Input id="diastolic" type="number" value={values.diastolic ?? ''} onChange={(e) => setValues({ ...values, diastolic: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="oxygen_saturation">Oxygen Saturation</Label>
        <Input id="oxygen_saturation" type="number" value={values.oxygen_saturation ?? ''} onChange={(e) => setValues({ ...values, oxygen_saturation: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pain_scale">Pain Scale</Label>
        <Input id="pain_scale" type="number" value={values.pain_scale ?? ''} onChange={(e) => setValues({ ...values, pain_scale: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.recorded_by ?? null}
          onChange={(v) => setValues({ ...values, recorded_by: v })}
        />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
