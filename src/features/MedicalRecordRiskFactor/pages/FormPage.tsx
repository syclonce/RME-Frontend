import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useRiskFactorResource } from '../api'
import type { RiskFactorFormValues } from '../types'

export function RiskFactorFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useRiskFactorResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<RiskFactorFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as RiskFactorFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-risk-factor') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-risk-factor') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} RiskFactor</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="risk_category">Risk Category *</Label>
        <Input id="risk_category" type="text" value={values.risk_category ?? ''} onChange={(e) => setValues({ ...values, risk_category: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input id="description" type="text" value={values.description ?? ''} onChange={(e) => setValues({ ...values, description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="risk_level">Risk Level</Label>
        <Input id="risk_level" type="text" value={values.risk_level ?? ''} onChange={(e) => setValues({ ...values, risk_level: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="identified_by">Identified By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.identified_by ?? null}
          onChange={(v) => setValues({ ...values, identified_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="identified_at">Identified At *</Label>
        <Input id="identified_at" type="date" value={values.identified_at ?? ''} onChange={(e) => setValues({ ...values, identified_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mitigation_plan">Mitigation Plan</Label>
        <Input id="mitigation_plan" type="text" value={values.mitigation_plan ?? ''} onChange={(e) => setValues({ ...values, mitigation_plan: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
