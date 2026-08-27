import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useFluidBalanceAssessmentDetailResource } from '../api'
import type { FluidBalanceAssessmentDetailFormValues } from '../types'

export function FluidBalanceAssessmentDetailFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useFluidBalanceAssessmentDetailResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<FluidBalanceAssessmentDetailFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as FluidBalanceAssessmentDetailFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-fluid-balance-assessment-detail') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-fluid-balance-assessment-detail') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} FluidBalanceAssessmentDetail</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="fluid_balance_assessment_id">Fluid Balance Assessment *</Label>
        <RelationSelect
          endpoint="/fluid-balance-assessments"
          value={values.fluid_balance_assessment_id ?? null}
          onChange={(v) => setValues({ ...values, fluid_balance_assessment_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="type">Type *</Label>
        <Select value={values.type ?? ''} onValueChange={(v) => setValues({ ...values, type: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="intake" value="intake">Intake</SelectItem>
            <SelectItem key="output" value="output">Output</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="category">Category *</Label>
        <Input id="category" type="text" value={values.category ?? ''} onChange={(e) => setValues({ ...values, category: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="amount_ml">Amount Ml *</Label>
        <Input id="amount_ml" type="number" value={values.amount_ml ?? ''} onChange={(e) => setValues({ ...values, amount_ml: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
