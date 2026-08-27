import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useDischargePlanningScreeningResource } from '../api'
import type { DischargePlanningScreeningFormValues } from '../types'

export function DischargePlanningScreeningFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useDischargePlanningScreeningResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<DischargePlanningScreeningFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as DischargePlanningScreeningFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-discharge-planning-screening') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-discharge-planning-screening') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} DischargePlanningScreening</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="screening_criteria">Screening Criteria</Label>
        <Input id="screening_criteria" type="text" value={values.screening_criteria ?? ''} onChange={(e) => setValues({ ...values, screening_criteria: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_score">Total Score</Label>
        <Input id="total_score" type="number" value={values.total_score ?? ''} onChange={(e) => setValues({ ...values, total_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="requires_planning" checked={!!values.requires_planning} onCheckedChange={(v) => setValues({ ...values, requires_planning: !!v })} />
        <Label htmlFor="requires_planning">Requires Planning</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="screened_by">Screened By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.screened_by ?? null}
          onChange={(v) => setValues({ ...values, screened_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="screened_at">Screened At *</Label>
        <Input id="screened_at" type="date" value={values.screened_at ?? ''} onChange={(e) => setValues({ ...values, screened_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
