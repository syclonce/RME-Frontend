import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLabExaminationResultResource } from '../api'
import type { LabExaminationResultFormValues } from '../types'

export function LabExaminationResultFormPage() {
  const navigate = useNavigate()
  const { create } = useLabExaminationResultResource()
  const [values, setValues] = useState<LabExaminationResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-lab-examination-result') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah LabExaminationResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_order_id">Lab Order *</Label>
        <Input id="lab_order_id" type="number" value={values.lab_order_id ?? ''} onChange={(e) => setValues({ ...values, lab_order_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="parameter_name">Parameter Name *</Label>
        <Input id="parameter_name" type="text" value={values.parameter_name ?? ''} onChange={(e) => setValues({ ...values, parameter_name: e.target.value })} />
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
      <div className="flex items-center gap-2">
        <Checkbox id="is_abnormal" checked={!!values.is_abnormal} onCheckedChange={(v) => setValues({ ...values, is_abnormal: !!v })} />
        <Label htmlFor="is_abnormal">Is Abnormal</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At *</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
