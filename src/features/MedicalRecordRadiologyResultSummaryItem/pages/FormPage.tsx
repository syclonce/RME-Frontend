import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRadiologyResultSummaryItemResource } from '../api'
import type { RadiologyResultSummaryItemFormValues } from '../types'

export function RadiologyResultSummaryItemFormPage() {
  const { create } = useRadiologyResultSummaryItemResource()
  const [values, setValues] = useState<RadiologyResultSummaryItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah RadiologyResultSummaryItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="summary_id">Summary *</Label>
        <Input id="summary_id" type="number" value={values.summary_id ?? ''} onChange={(e) => setValues({ ...values, summary_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="exam_name">Exam Name *</Label>
        <Input id="exam_name" type="text" value={values.exam_name ?? ''} onChange={(e) => setValues({ ...values, exam_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="finding">Finding</Label>
        <Input id="finding" type="text" value={values.finding ?? ''} onChange={(e) => setValues({ ...values, finding: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="impression">Impression</Label>
        <Input id="impression" type="text" value={values.impression ?? ''} onChange={(e) => setValues({ ...values, impression: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="performed_at">Performed At</Label>
        <Input id="performed_at" type="date" value={values.performed_at ?? ''} onChange={(e) => setValues({ ...values, performed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
