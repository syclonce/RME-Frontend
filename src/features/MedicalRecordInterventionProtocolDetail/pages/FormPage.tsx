import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInterventionProtocolDetailResource } from '../api'
import type { InterventionProtocolDetailFormValues } from '../types'

export function InterventionProtocolDetailFormPage() {
  const navigate = useNavigate()
  const { create } = useInterventionProtocolDetailResource()
  const [values, setValues] = useState<InterventionProtocolDetailFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-intervention-protocol-detail') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InterventionProtocolDetail</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="protocol_id">Protocol *</Label>
        <Input id="protocol_id" type="number" value={values.protocol_id ?? ''} onChange={(e) => setValues({ ...values, protocol_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="performed_by">Performed By *</Label>
        <Input id="performed_by" type="number" value={values.performed_by ?? ''} onChange={(e) => setValues({ ...values, performed_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="step_number">Step Number *</Label>
        <Input id="step_number" type="number" value={values.step_number ?? ''} onChange={(e) => setValues({ ...values, step_number: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="step_description">Step Description *</Label>
        <Input id="step_description" type="text" value={values.step_description ?? ''} onChange={(e) => setValues({ ...values, step_description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="result_notes">Result Notes</Label>
        <Input id="result_notes" type="text" value={values.result_notes ?? ''} onChange={(e) => setValues({ ...values, result_notes: e.target.value })} />
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
