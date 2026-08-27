import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFluidBalanceAssessmentResource } from '../api'
import type { FluidBalanceAssessmentFormValues } from '../types'

export function FluidBalanceAssessmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useFluidBalanceAssessmentResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<FluidBalanceAssessmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as FluidBalanceAssessmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-fluid-balance-assessment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-fluid-balance-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} FluidBalanceAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="shift">Shift</Label>
        <Input id="shift" type="text" value={values.shift ?? ''} onChange={(e) => setValues({ ...values, shift: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_at">Assessed At *</Label>
        <Input id="assessed_at" type="date" value={values.assessed_at ?? ''} onChange={(e) => setValues({ ...values, assessed_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_intake_ml">Total Intake Ml</Label>
        <Input id="total_intake_ml" type="number" value={values.total_intake_ml ?? ''} onChange={(e) => setValues({ ...values, total_intake_ml: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_output_ml">Total Output Ml</Label>
        <Input id="total_output_ml" type="number" value={values.total_output_ml ?? ''} onChange={(e) => setValues({ ...values, total_output_ml: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="balance_ml">Balance Ml</Label>
        <Input id="balance_ml" type="number" value={values.balance_ml ?? ''} onChange={(e) => setValues({ ...values, balance_ml: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
