import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLabResultSummaryItemResource } from '../api'
import type { LabResultSummaryItemFormValues } from '../types'

export function LabResultSummaryItemFormPage() {
  const navigate = useNavigate()
  const { create } = useLabResultSummaryItemResource()
  const [values, setValues] = useState<LabResultSummaryItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-lab-result-summary-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah LabResultSummaryItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="summary_id">Summary *</Label>
        <Input id="summary_id" type="number" value={values.summary_id ?? ''} onChange={(e) => setValues({ ...values, summary_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_test_name">Lab Test Name *</Label>
        <Input id="lab_test_name" type="text" value={values.lab_test_name ?? ''} onChange={(e) => setValues({ ...values, lab_test_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="result_value">Result Value *</Label>
        <Input id="result_value" type="text" value={values.result_value ?? ''} onChange={(e) => setValues({ ...values, result_value: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="unit">Unit</Label>
        <Input id="unit" type="text" value={values.unit ?? ''} onChange={(e) => setValues({ ...values, unit: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reference_range">Reference Range</Label>
        <Input id="reference_range" type="text" value={values.reference_range ?? ''} onChange={(e) => setValues({ ...values, reference_range: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="flag">Flag</Label>
        <Input id="flag" type="text" value={values.flag ?? ''} onChange={(e) => setValues({ ...values, flag: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tested_at">Tested At</Label>
        <Input id="tested_at" type="date" value={values.tested_at ?? ''} onChange={(e) => setValues({ ...values, tested_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
