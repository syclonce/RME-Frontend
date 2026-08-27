import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePlanAndTherapyResource } from '../api'
import type { PlanAndTherapyFormValues } from '../types'

export function PlanAndTherapyFormPage() {
  const navigate = useNavigate()
  const { create } = usePlanAndTherapyResource()
  const [values, setValues] = useState<PlanAndTherapyFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-plan-and-therapy') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PlanAndTherapy</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ordered_by">Ordered By *</Label>
        <RelationSelect
          endpoint="/doctors"
          value={values.ordered_by ?? null}
          onChange={(v) => setValues({ ...values, ordered_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <RelationSelect
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessment_summary">Assessment Summary</Label>
        <Input id="assessment_summary" type="text" value={values.assessment_summary ?? ''} onChange={(e) => setValues({ ...values, assessment_summary: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="plan_description">Plan Description *</Label>
        <Input id="plan_description" type="text" value={values.plan_description ?? ''} onChange={(e) => setValues({ ...values, plan_description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="therapy_type">Therapy Type</Label>
        <Input id="therapy_type" type="text" value={values.therapy_type ?? ''} onChange={(e) => setValues({ ...values, therapy_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="target_date">Target Date</Label>
        <Input id="target_date" type="date" value={values.target_date ?? ''} onChange={(e) => setValues({ ...values, target_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Select value={values.status ?? ''} onValueChange={(v) => setValues({ ...values, status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="active" value="active">Active</SelectItem>
            <SelectItem key="completed" value="completed">Completed</SelectItem>
            <SelectItem key="revised" value="revised">Revised</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ordered_at">Ordered At</Label>
        <Input id="ordered_at" type="date" value={values.ordered_at ?? ''} onChange={(e) => setValues({ ...values, ordered_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
