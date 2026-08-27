import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useNursingCarePlanResource } from '../api'
import type { NursingCarePlanFormValues } from '../types'

export function NursingCarePlanFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useNursingCarePlanResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<NursingCarePlanFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as NursingCarePlanFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-nursing-care-plan') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-nursing-care-plan') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} NursingCarePlan</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessment">Assessment</Label>
        <Input id="assessment" type="text" value={values.assessment ?? ''} onChange={(e) => setValues({ ...values, assessment: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="goal">Goal</Label>
        <Input id="goal" type="text" value={values.goal ?? ''} onChange={(e) => setValues({ ...values, goal: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="intervention_plan">Intervention Plan</Label>
        <Input id="intervention_plan" type="text" value={values.intervention_plan ?? ''} onChange={(e) => setValues({ ...values, intervention_plan: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="target_date">Target Date</Label>
        <Input id="target_date" type="date" value={values.target_date ?? ''} onChange={(e) => setValues({ ...values, target_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.recorded_by ?? null}
          onChange={(v) => setValues({ ...values, recorded_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At *</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
