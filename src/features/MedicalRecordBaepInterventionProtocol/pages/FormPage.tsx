import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useBaepInterventionProtocolResource } from '../api'
import type { BaepInterventionProtocolFormValues } from '../types'

export function BaepInterventionProtocolFormPage() {
  const navigate = useNavigate()
  const { create } = useBaepInterventionProtocolResource()
  const [values, setValues] = useState<BaepInterventionProtocolFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-baep-intervention-protocol') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BaepInterventionProtocol</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="performed_by">Performed By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.performed_by ?? null}
          onChange={(v) => setValues({ ...values, performed_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <AsyncCombobox
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="indication">Indication</Label>
        <Input id="indication" type="text" value={values.indication ?? ''} onChange={(e) => setValues({ ...values, indication: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="stimulation_ear">Stimulation Ear *</Label>
        <Select value={values.stimulation_ear ?? ''} onValueChange={(v) => setValues({ ...values, stimulation_ear: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="left" value="left">Left</SelectItem>
            <SelectItem key="right" value="right">Right</SelectItem>
            <SelectItem key="bilateral" value="bilateral">Bilateral</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="click_rate_hz">Click Rate Hz</Label>
        <Input id="click_rate_hz" type="number" value={values.click_rate_hz ?? ''} onChange={(e) => setValues({ ...values, click_rate_hz: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="stimulus_intensity_db">Stimulus Intensity Db</Label>
        <Input id="stimulus_intensity_db" type="number" value={values.stimulus_intensity_db ?? ''} onChange={(e) => setValues({ ...values, stimulus_intensity_db: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="wave_i_latency_ms">Wave I Latency Ms</Label>
        <Input id="wave_i_latency_ms" type="number" value={values.wave_i_latency_ms ?? ''} onChange={(e) => setValues({ ...values, wave_i_latency_ms: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="wave_iii_latency_ms">Wave Iii Latency Ms</Label>
        <Input id="wave_iii_latency_ms" type="number" value={values.wave_iii_latency_ms ?? ''} onChange={(e) => setValues({ ...values, wave_iii_latency_ms: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="wave_v_latency_ms">Wave V Latency Ms</Label>
        <Input id="wave_v_latency_ms" type="number" value={values.wave_v_latency_ms ?? ''} onChange={(e) => setValues({ ...values, wave_v_latency_ms: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="interpretation">Interpretation</Label>
        <Input id="interpretation" type="text" value={values.interpretation ?? ''} onChange={(e) => setValues({ ...values, interpretation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Select value={values.status ?? ''} onValueChange={(v) => setValues({ ...values, status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="in_progress" value="in_progress">In Progress</SelectItem>
            <SelectItem key="completed" value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="performed_at">Performed At</Label>
        <Input id="performed_at" type="date" value={values.performed_at ?? ''} onChange={(e) => setValues({ ...values, performed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
