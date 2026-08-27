import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useFluidFinalBalanceResource } from '../api'
import type { FluidFinalBalanceFormValues } from '../types'

export function FluidFinalBalanceFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useFluidFinalBalanceResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<FluidFinalBalanceFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as FluidFinalBalanceFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-fluid-final-balance') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-fluid-final-balance') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} FluidFinalBalance</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="period_date">Period Date *</Label>
        <Input id="period_date" type="date" value={values.period_date ?? ''} onChange={(e) => setValues({ ...values, period_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_intake_ml">Total Intake Ml *</Label>
        <Input id="total_intake_ml" type="number" value={values.total_intake_ml ?? ''} onChange={(e) => setValues({ ...values, total_intake_ml: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_output_ml">Total Output Ml *</Label>
        <Input id="total_output_ml" type="number" value={values.total_output_ml ?? ''} onChange={(e) => setValues({ ...values, total_output_ml: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="balance_ml">Balance Ml</Label>
        <Input id="balance_ml" type="number" value={values.balance_ml ?? ''} onChange={(e) => setValues({ ...values, balance_ml: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.recorded_by ?? null}
          onChange={(v) => setValues({ ...values, recorded_by: v })}
        />
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
