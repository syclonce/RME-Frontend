import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBaepDepressionDetailResource } from '../api'
import type { BaepDepressionDetailFormValues } from '../types'

export function BaepDepressionDetailFormPage() {
  const navigate = useNavigate()
  const { create } = useBaepDepressionDetailResource()
  const [values, setValues] = useState<BaepDepressionDetailFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-baep-depression-detail') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BaepDepressionDetail</h1>
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
        <Label htmlFor="severity_level">Severity Level</Label>
        <Input id="severity_level" type="text" value={values.severity_level ?? ''} onChange={(e) => setValues({ ...values, severity_level: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="symptoms_observed">Symptoms Observed</Label>
        <Input id="symptoms_observed" type="text" value={values.symptoms_observed ?? ''} onChange={(e) => setValues({ ...values, symptoms_observed: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
