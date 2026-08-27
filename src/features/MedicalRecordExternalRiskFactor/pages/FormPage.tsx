import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useExternalRiskFactorResource } from '../api'
import type { ExternalRiskFactorFormValues } from '../types'

export function ExternalRiskFactorFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useExternalRiskFactorResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ExternalRiskFactorFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ExternalRiskFactorFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-external-risk-factor') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-external-risk-factor') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ExternalRiskFactor</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="factor_type">Factor Type *</Label>
        <Input id="factor_type" type="text" value={values.factor_type ?? ''} onChange={(e) => setValues({ ...values, factor_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input id="description" type="text" value={values.description ?? ''} onChange={(e) => setValues({ ...values, description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="impact_level">Impact Level</Label>
        <Input id="impact_level" type="text" value={values.impact_level ?? ''} onChange={(e) => setValues({ ...values, impact_level: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By *</Label>
        <Input id="recorded_by" type="number" value={values.recorded_by ?? ''} onChange={(e) => setValues({ ...values, recorded_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At *</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
