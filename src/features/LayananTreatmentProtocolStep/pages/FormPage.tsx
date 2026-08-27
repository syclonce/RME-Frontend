import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTreatmentProtocolStepResource } from '../api'
import type { TreatmentProtocolStepFormValues } from '../types'

export function TreatmentProtocolStepFormPage() {
  const { create } = useTreatmentProtocolStepResource()
  const [values, setValues] = useState<TreatmentProtocolStepFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah TreatmentProtocolStep</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="treatment_protocol_id">Treatment Protocol *</Label>
        <Input id="treatment_protocol_id" type="number" value={values.treatment_protocol_id ?? ''} onChange={(e) => setValues({ ...values, treatment_protocol_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sequence">Sequence *</Label>
        <Input id="sequence" type="number" value={values.sequence ?? ''} onChange={(e) => setValues({ ...values, sequence: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="instruction">Instruction *</Label>
        <Input id="instruction" type="text" value={values.instruction ?? ''} onChange={(e) => setValues({ ...values, instruction: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="scheduled_at">Scheduled At</Label>
        <Input id="scheduled_at" type="date" value={values.scheduled_at ?? ''} onChange={(e) => setValues({ ...values, scheduled_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
