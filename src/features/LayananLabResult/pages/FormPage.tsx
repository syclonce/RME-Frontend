import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useLabResultResource } from '../api'
import type { LabResultFormValues } from '../types'

export function LabResultFormPage() {
  const navigate = useNavigate()
  const { create } = useLabResultResource()
  const [values, setValues] = useState<LabResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-lab-result') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah LabResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_order_id">Lab Order *</Label>
        <RelationSelect
          endpoint="/lab-orders"
          value={values.lab_order_id ?? null}
          onChange={(v) => setValues({ ...values, lab_order_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="test_name">Test Name *</Label>
        <Input id="test_name" type="text" value={values.test_name ?? ''} onChange={(e) => setValues({ ...values, test_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="result_value">Result Value *</Label>
        <Input id="result_value" type="text" value={values.result_value ?? ''} onChange={(e) => setValues({ ...values, result_value: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="normal_range">Normal Range</Label>
        <Input id="normal_range" type="text" value={values.normal_range ?? ''} onChange={(e) => setValues({ ...values, normal_range: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="unit">Unit</Label>
        <Input id="unit" type="text" value={values.unit ?? ''} onChange={(e) => setValues({ ...values, unit: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_abnormal" checked={!!values.is_abnormal} onCheckedChange={(v) => setValues({ ...values, is_abnormal: !!v })} />
        <Label htmlFor="is_abnormal">Is Abnormal</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
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
