import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBaepStimulationProtocolDetailResource } from '../api'
import type { BaepStimulationProtocolDetailFormValues } from '../types'

export function BaepStimulationProtocolDetailFormPage() {
  const navigate = useNavigate()
  const { create } = useBaepStimulationProtocolDetailResource()
  const [values, setValues] = useState<BaepStimulationProtocolDetailFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-baep-stimulation-protocol-detail') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BaepStimulationProtocolDetail</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="baep_protocol_id">Baep Protocol *</Label>
        <Input id="baep_protocol_id" type="number" value={values.baep_protocol_id ?? ''} onChange={(e) => setValues({ ...values, baep_protocol_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="stimulation_site">Stimulation Site *</Label>
        <Input id="stimulation_site" type="text" value={values.stimulation_site ?? ''} onChange={(e) => setValues({ ...values, stimulation_site: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="stimulation_frequency_hz">Stimulation Frequency Hz</Label>
        <Input id="stimulation_frequency_hz" type="number" value={values.stimulation_frequency_hz ?? ''} onChange={(e) => setValues({ ...values, stimulation_frequency_hz: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="stimulation_duration_minutes">Stimulation Duration Minutes</Label>
        <Input id="stimulation_duration_minutes" type="number" value={values.stimulation_duration_minutes ?? ''} onChange={(e) => setValues({ ...values, stimulation_duration_minutes: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="intensity_ma">Intensity Ma</Label>
        <Input id="intensity_ma" type="number" value={values.intensity_ma ?? ''} onChange={(e) => setValues({ ...values, intensity_ma: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="number_of_sessions">Number Of Sessions</Label>
        <Input id="number_of_sessions" type="number" value={values.number_of_sessions ?? ''} onChange={(e) => setValues({ ...values, number_of_sessions: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
