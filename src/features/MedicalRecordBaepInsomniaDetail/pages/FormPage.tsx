import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBaepInsomniaDetailResource } from '../api'
import type { BaepInsomniaDetailFormValues } from '../types'

export function BaepInsomniaDetailFormPage() {
  const navigate = useNavigate()
  const { create } = useBaepInsomniaDetailResource()
  const [values, setValues] = useState<BaepInsomniaDetailFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-baep-insomnia-detail') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BaepInsomniaDetail</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="baep_protocol_id">Baep Protocol *</Label>
        <Input id="baep_protocol_id" type="number" value={values.baep_protocol_id ?? ''} onChange={(e) => setValues({ ...values, baep_protocol_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="scale_used">Scale Used</Label>
        <Input id="scale_used" type="text" value={values.scale_used ?? ''} onChange={(e) => setValues({ ...values, scale_used: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="score">Score *</Label>
        <Input id="score" type="number" value={values.score ?? ''} onChange={(e) => setValues({ ...values, score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sleep_onset_latency_minutes">Sleep Onset Latency Minutes</Label>
        <Input id="sleep_onset_latency_minutes" type="number" value={values.sleep_onset_latency_minutes ?? ''} onChange={(e) => setValues({ ...values, sleep_onset_latency_minutes: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sleep_efficiency_percent">Sleep Efficiency Percent</Label>
        <Input id="sleep_efficiency_percent" type="number" value={values.sleep_efficiency_percent ?? ''} onChange={(e) => setValues({ ...values, sleep_efficiency_percent: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
