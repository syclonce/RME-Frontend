import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSurgicalSafetyEvaluationResultResource } from '../api'
import type { SurgicalSafetyEvaluationResultFormValues } from '../types'

export function SurgicalSafetyEvaluationResultFormPage() {
  const { create } = useSurgicalSafetyEvaluationResultResource()
  const [values, setValues] = useState<SurgicalSafetyEvaluationResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah SurgicalSafetyEvaluationResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="operating_room_id">Operating Room</Label>
        <Input id="operating_room_id" type="number" value={values.operating_room_id ?? ''} onChange={(e) => setValues({ ...values, operating_room_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="evaluator_id">Evaluator</Label>
        <Input id="evaluator_id" type="number" value={values.evaluator_id ?? ''} onChange={(e) => setValues({ ...values, evaluator_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="checklist_score">Checklist Score *</Label>
        <Input id="checklist_score" type="number" value={values.checklist_score ?? ''} onChange={(e) => setValues({ ...values, checklist_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="compliant" checked={!!values.compliant} onCheckedChange={(v) => setValues({ ...values, compliant: !!v })} />
        <Label htmlFor="compliant">Compliant</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="evaluated_at">Evaluated At *</Label>
        <Input id="evaluated_at" type="date" value={values.evaluated_at ?? ''} onChange={(e) => setValues({ ...values, evaluated_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
