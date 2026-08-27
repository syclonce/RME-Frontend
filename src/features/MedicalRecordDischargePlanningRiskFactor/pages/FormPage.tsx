import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useDischargePlanningRiskFactorResource } from '../api'
import type { DischargePlanningRiskFactorFormValues } from '../types'

export function DischargePlanningRiskFactorFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useDischargePlanningRiskFactorResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<DischargePlanningRiskFactorFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as DischargePlanningRiskFactorFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-discharge-planning-risk-factor') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-discharge-planning-risk-factor') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} DischargePlanningRiskFactor</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="risk_factor">Risk Factor *</Label>
        <Input id="risk_factor" type="text" value={values.risk_factor ?? ''} onChange={(e) => setValues({ ...values, risk_factor: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="score">Score</Label>
        <Input id="score" type="number" value={values.score ?? ''} onChange={(e) => setValues({ ...values, score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_by">Assessed By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.assessed_by ?? null}
          onChange={(v) => setValues({ ...values, assessed_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_at">Assessed At *</Label>
        <Input id="assessed_at" type="date" value={values.assessed_at ?? ''} onChange={(e) => setValues({ ...values, assessed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
