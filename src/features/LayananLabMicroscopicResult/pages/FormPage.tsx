import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLabMicroscopicResultResource } from '../api'
import type { LabMicroscopicResultFormValues } from '../types'

export function LabMicroscopicResultFormPage() {
  const { create } = useLabMicroscopicResultResource()
  const [values, setValues] = useState<LabMicroscopicResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah LabMicroscopicResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_order_id">Lab Order *</Label>
        <Input id="lab_order_id" type="number" value={values.lab_order_id ?? ''} onChange={(e) => setValues({ ...values, lab_order_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="specimen_type">Specimen Type *</Label>
        <Input id="specimen_type" type="text" value={values.specimen_type ?? ''} onChange={(e) => setValues({ ...values, specimen_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="findings">Findings *</Label>
        <Input id="findings" type="text" value={values.findings ?? ''} onChange={(e) => setValues({ ...values, findings: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_by">Examined By</Label>
        <Input id="examined_by" type="number" value={values.examined_by ?? ''} onChange={(e) => setValues({ ...values, examined_by: e.target.value === '' ? null : Number(e.target.value) })} />
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
