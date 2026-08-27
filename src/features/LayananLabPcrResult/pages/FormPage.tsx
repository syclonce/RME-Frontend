import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLabPcrResultResource } from '../api'
import type { LabPcrResultFormValues } from '../types'

export function LabPcrResultFormPage() {
  const navigate = useNavigate()
  const { create } = useLabPcrResultResource()
  const [values, setValues] = useState<LabPcrResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-lab-pcr-result') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah LabPcrResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_order_id">Lab Order *</Label>
        <Input id="lab_order_id" type="number" value={values.lab_order_id ?? ''} onChange={(e) => setValues({ ...values, lab_order_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="target_gene">Target Gene *</Label>
        <Input id="target_gene" type="text" value={values.target_gene ?? ''} onChange={(e) => setValues({ ...values, target_gene: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="result">Result *</Label>
        <Input id="result" type="text" value={values.result ?? ''} onChange={(e) => setValues({ ...values, result: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ct_value">Ct Value</Label>
        <Input id="ct_value" type="number" value={values.ct_value ?? ''} onChange={(e) => setValues({ ...values, ct_value: e.target.value === '' ? null : Number(e.target.value) })} />
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
