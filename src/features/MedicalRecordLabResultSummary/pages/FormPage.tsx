import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLabResultSummaryResource } from '../api'
import type { LabResultSummaryFormValues } from '../types'

export function LabResultSummaryFormPage() {
  const { create } = useLabResultSummaryResource()
  const [values, setValues] = useState<LabResultSummaryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah LabResultSummary</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="summarized_by">Summarized By *</Label>
        <Input id="summarized_by" type="number" value={values.summarized_by ?? ''} onChange={(e) => setValues({ ...values, summarized_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <Input id="created_by" type="number" value={values.created_by ?? ''} onChange={(e) => setValues({ ...values, created_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="overall_impression">Overall Impression</Label>
        <Input id="overall_impression" type="text" value={values.overall_impression ?? ''} onChange={(e) => setValues({ ...values, overall_impression: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="summarized_at">Summarized At</Label>
        <Input id="summarized_at" type="date" value={values.summarized_at ?? ''} onChange={(e) => setValues({ ...values, summarized_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
