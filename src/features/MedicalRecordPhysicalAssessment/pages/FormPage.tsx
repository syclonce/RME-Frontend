import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePhysicalAssessmentResource } from '../api'
import type { PhysicalAssessmentFormValues } from '../types'

export function PhysicalAssessmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePhysicalAssessmentResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PhysicalAssessmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PhysicalAssessmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-physical-assessment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-physical-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PhysicalAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mobility_status">Mobility Status</Label>
        <Input id="mobility_status" type="text" value={values.mobility_status ?? ''} onChange={(e) => setValues({ ...values, mobility_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="adl_status">Adl Status</Label>
        <Input id="adl_status" type="text" value={values.adl_status ?? ''} onChange={(e) => setValues({ ...values, adl_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="cognitive_status">Cognitive Status</Label>
        <Input id="cognitive_status" type="text" value={values.cognitive_status ?? ''} onChange={(e) => setValues({ ...values, cognitive_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="nutritional_risk">Nutritional Risk</Label>
        <Input id="nutritional_risk" type="text" value={values.nutritional_risk ?? ''} onChange={(e) => setValues({ ...values, nutritional_risk: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pain_level">Pain Level</Label>
        <Input id="pain_level" type="number" value={values.pain_level ?? ''} onChange={(e) => setValues({ ...values, pain_level: e.target.value === '' ? null : Number(e.target.value) })} />
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
