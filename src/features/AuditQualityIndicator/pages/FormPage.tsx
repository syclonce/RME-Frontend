import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useQualityIndicatorResource } from '../api'
import type { QualityIndicatorFormValues } from '../types'

export function QualityIndicatorFormPage() {
  const { create } = useQualityIndicatorResource()
  const [values, setValues] = useState<QualityIndicatorFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah QualityIndicator</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="indicator_id">Indicator *</Label>
        <Input id="indicator_id" type="number" value={values.indicator_id ?? ''} onChange={(e) => setValues({ ...values, indicator_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="period_month">Period Month *</Label>
        <Input id="period_month" type="number" value={values.period_month ?? ''} onChange={(e) => setValues({ ...values, period_month: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="period_year">Period Year *</Label>
        <Input id="period_year" type="number" value={values.period_year ?? ''} onChange={(e) => setValues({ ...values, period_year: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="numerator">Numerator *</Label>
        <Input id="numerator" type="number" value={values.numerator ?? ''} onChange={(e) => setValues({ ...values, numerator: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="denominator">Denominator *</Label>
        <Input id="denominator" type="number" value={values.denominator ?? ''} onChange={(e) => setValues({ ...values, denominator: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By</Label>
        <Input id="recorded_by" type="number" value={values.recorded_by ?? ''} onChange={(e) => setValues({ ...values, recorded_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
