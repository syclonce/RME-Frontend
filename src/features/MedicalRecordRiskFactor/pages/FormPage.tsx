import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRiskFactorResource } from '../api'
import type { RiskFactorFormValues } from '../types'

export function RiskFactorFormPage() {
  const { create } = useRiskFactorResource()
  const [values, setValues] = useState<RiskFactorFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah RiskFactor</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
        <Input id="identified_by" type="number" value={values.identified_by ?? ''} onChange={(e) => setValues({ ...values, identified_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="identified_at">Identified At *</Label>
        <Input id="identified_at" type="date" value={values.identified_at ?? ''} onChange={(e) => setValues({ ...values, identified_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mitigation_plan">Mitigation Plan</Label>
        <Input id="mitigation_plan" type="text" value={values.mitigation_plan ?? ''} onChange={(e) => setValues({ ...values, mitigation_plan: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
