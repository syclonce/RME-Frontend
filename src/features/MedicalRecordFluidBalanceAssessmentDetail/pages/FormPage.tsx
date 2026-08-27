import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFluidBalanceAssessmentDetailResource } from '../api'
import type { FluidBalanceAssessmentDetailFormValues } from '../types'

export function FluidBalanceAssessmentDetailFormPage() {
  const { create } = useFluidBalanceAssessmentDetailResource()
  const [values, setValues] = useState<FluidBalanceAssessmentDetailFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah FluidBalanceAssessmentDetail</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="fluid_balance_assessment_id">Fluid Balance Assessment *</Label>
        <Input id="fluid_balance_assessment_id" type="number" value={values.fluid_balance_assessment_id ?? ''} onChange={(e) => setValues({ ...values, fluid_balance_assessment_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="type">Type *</Label>
        <Input id="type" type="text" value={values.type ?? ''} onChange={(e) => setValues({ ...values, type: e.target.value })} />
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
