import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInterventionRecommendationResource } from '../api'
import type { InterventionRecommendationFormValues } from '../types'

export function InterventionRecommendationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useInterventionRecommendationResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<InterventionRecommendationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as InterventionRecommendationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-intervention-recommendation') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-intervention-recommendation') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} InterventionRecommendation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="source">Source</Label>
        <Input id="source" type="text" value={values.source ?? ''} onChange={(e) => setValues({ ...values, source: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recommendation">Recommendation</Label>
        <Input id="recommendation" type="text" value={values.recommendation ?? ''} onChange={(e) => setValues({ ...values, recommendation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="priority">Priority</Label>
        <Input id="priority" type="text" value={values.priority ?? ''} onChange={(e) => setValues({ ...values, priority: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recommended_by">Recommended By *</Label>
        <Input id="recommended_by" type="number" value={values.recommended_by ?? ''} onChange={(e) => setValues({ ...values, recommended_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recommended_at">Recommended At *</Label>
        <Input id="recommended_at" type="date" value={values.recommended_at ?? ''} onChange={(e) => setValues({ ...values, recommended_at: e.target.value })} />
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
