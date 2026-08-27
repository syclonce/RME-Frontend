import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useSurgicalSafetyEvaluationResultResource } from '../api'
import type { SurgicalSafetyEvaluationResultFormValues } from '../types'

export function SurgicalSafetyEvaluationResultFormPage() {
  const navigate = useNavigate()
  const { create } = useSurgicalSafetyEvaluationResultResource()
  const [values, setValues] = useState<SurgicalSafetyEvaluationResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-surgical-safety-evaluation-result') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah SurgicalSafetyEvaluationResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="operating_room_id">Operating Room</Label>
        <RelationSelect
          endpoint="/operating-rooms"
          value={values.operating_room_id ?? null}
          onChange={(v) => setValues({ ...values, operating_room_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="evaluator_id">Evaluator</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.evaluator_id ?? null}
          onChange={(v) => setValues({ ...values, evaluator_id: v })}
        />
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
