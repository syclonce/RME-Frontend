import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useRadiologyResultSummaryResource } from '../api'
import type { RadiologyResultSummaryFormValues } from '../types'

export function RadiologyResultSummaryFormPage() {
  const navigate = useNavigate()
  const { create } = useRadiologyResultSummaryResource()
  const [values, setValues] = useState<RadiologyResultSummaryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-radiology-result-summary') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah RadiologyResultSummary</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="summarized_by">Summarized By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.summarized_by ?? null}
          onChange={(v) => setValues({ ...values, summarized_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <AsyncCombobox
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
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
