import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCaseManagerAssessmentResource } from '../api'
import type { CaseManagerAssessmentFormValues } from '../types'

export function CaseManagerAssessmentFormPage() {
  const { create } = useCaseManagerAssessmentResource()
  const [values, setValues] = useState<CaseManagerAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah CaseManagerAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="case_manager_id">Case Manager</Label>
        <Input id="case_manager_id" type="number" value={values.case_manager_id ?? ''} onChange={(e) => setValues({ ...values, case_manager_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="screening_criteria">Screening Criteria</Label>
        <Input id="screening_criteria" type="text" value={values.screening_criteria ?? ''} onChange={(e) => setValues({ ...values, screening_criteria: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="risk_level">Risk Level</Label>
        <Input id="risk_level" type="text" value={values.risk_level ?? ''} onChange={(e) => setValues({ ...values, risk_level: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="care_plan">Care Plan</Label>
        <Input id="care_plan" type="text" value={values.care_plan ?? ''} onChange={(e) => setValues({ ...values, care_plan: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="follow_up_needed" checked={!!values.follow_up_needed} onCheckedChange={(v) => setValues({ ...values, follow_up_needed: !!v })} />
        <Label htmlFor="follow_up_needed">Follow Up Needed</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_at">Assessed At</Label>
        <Input id="assessed_at" type="date" value={values.assessed_at ?? ''} onChange={(e) => setValues({ ...values, assessed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
