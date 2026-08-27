import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useQualityIndicatorResource } from '../api'
import type { QualityIndicatorFormValues } from '../types'

export function QualityIndicatorFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useQualityIndicatorResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<QualityIndicatorFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as QualityIndicatorFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/audit-quality-indicator') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/audit-quality-indicator') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} QualityIndicator</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="indicator_id">Indicator *</Label>
        <RelationSelect
          endpoint="/quality-indicators"
          value={values.indicator_id ?? null}
          onChange={(v) => setValues({ ...values, indicator_id: v })}
        />
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
        <AsyncCombobox
          endpoint="/employees"
          value={values.recorded_by ?? null}
          onChange={(v) => setValues({ ...values, recorded_by: v })}
        />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
