import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useClinicalNoteResource } from '../api'
import type { ClinicalNoteFormValues } from '../types'

export function ClinicalNoteFormPage() {
  const navigate = useNavigate()
  const { create } = useClinicalNoteResource()
  const [values, setValues] = useState<ClinicalNoteFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-clinical-note') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ClinicalNote</h1>
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
        <Label htmlFor="subjective">Subjective</Label>
        <Input id="subjective" type="text" value={values.subjective ?? ''} onChange={(e) => setValues({ ...values, subjective: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="objective">Objective</Label>
        <Input id="objective" type="text" value={values.objective ?? ''} onChange={(e) => setValues({ ...values, objective: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessment">Assessment</Label>
        <Input id="assessment" type="text" value={values.assessment ?? ''} onChange={(e) => setValues({ ...values, assessment: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="planning">Planning</Label>
        <Input id="planning" type="text" value={values.planning ?? ''} onChange={(e) => setValues({ ...values, planning: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="instructions">Instructions</Label>
        <Input id="instructions" type="text" value={values.instructions ?? ''} onChange={(e) => setValues({ ...values, instructions: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="note_type">Note Type</Label>
        <Input id="note_type" type="text" value={values.note_type ?? ''} onChange={(e) => setValues({ ...values, note_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="author_id">Author *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.author_id ?? null}
          onChange={(v) => setValues({ ...values, author_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sub_division">Sub Division</Label>
        <Input id="sub_division" type="text" value={values.sub_division ?? ''} onChange={(e) => setValues({ ...values, sub_division: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="has_discharge_plan" checked={!!values.has_discharge_plan} onCheckedChange={(v) => setValues({ ...values, has_discharge_plan: !!v })} />
        <Label htmlFor="has_discharge_plan">Has Discharge Plan</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="discharge_plan_date">Discharge Plan Date</Label>
        <Input id="discharge_plan_date" type="date" value={values.discharge_plan_date ?? ''} onChange={(e) => setValues({ ...values, discharge_plan_date: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
