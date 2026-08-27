import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBaepSensoryDetailResource } from '../api'
import type { BaepSensoryDetailFormValues } from '../types'

export function BaepSensoryDetailFormPage() {
  const navigate = useNavigate()
  const { create } = useBaepSensoryDetailResource()
  const [values, setValues] = useState<BaepSensoryDetailFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-baep-sensory-detail') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BaepSensoryDetail</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="baep_protocol_id">Baep Protocol *</Label>
        <Input id="baep_protocol_id" type="number" value={values.baep_protocol_id ?? ''} onChange={(e) => setValues({ ...values, baep_protocol_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sensory_modality">Sensory Modality *</Label>
        <Input id="sensory_modality" type="text" value={values.sensory_modality ?? ''} onChange={(e) => setValues({ ...values, sensory_modality: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sensory_score">Sensory Score</Label>
        <Input id="sensory_score" type="number" value={values.sensory_score ?? ''} onChange={(e) => setValues({ ...values, sensory_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="affected_region">Affected Region</Label>
        <Input id="affected_region" type="text" value={values.affected_region ?? ''} onChange={(e) => setValues({ ...values, affected_region: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
