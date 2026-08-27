import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useGetUpAndGoTestAssessmentResource } from '../api'
import type { GetUpAndGoTestAssessmentFormValues } from '../types'

export function GetUpAndGoTestAssessmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useGetUpAndGoTestAssessmentResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<GetUpAndGoTestAssessmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as GetUpAndGoTestAssessmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-get-up-and-go-test-assessment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-get-up-and-go-test-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} GetUpAndGoTestAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="time_seconds">Time Seconds *</Label>
        <Input id="time_seconds" type="number" value={values.time_seconds ?? ''} onChange={(e) => setValues({ ...values, time_seconds: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assistive_device">Assistive Device</Label>
        <Input id="assistive_device" type="text" value={values.assistive_device ?? ''} onChange={(e) => setValues({ ...values, assistive_device: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fall_risk">Fall Risk</Label>
        <Input id="fall_risk" type="text" value={values.fall_risk ?? ''} onChange={(e) => setValues({ ...values, fall_risk: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
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
