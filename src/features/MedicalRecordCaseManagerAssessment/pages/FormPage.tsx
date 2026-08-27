import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useCaseManagerAssessmentResource } from '../api'
import type { CaseManagerAssessmentFormValues } from '../types'

export function CaseManagerAssessmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useCaseManagerAssessmentResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<CaseManagerAssessmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as CaseManagerAssessmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-case-manager-assessment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-case-manager-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} CaseManagerAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
