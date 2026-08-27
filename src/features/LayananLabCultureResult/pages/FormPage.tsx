import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLabCultureResultResource } from '../api'
import type { LabCultureResultFormValues } from '../types'

export function LabCultureResultFormPage() {
  const { create } = useLabCultureResultResource()
  const [values, setValues] = useState<LabCultureResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah LabCultureResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_order_id">Lab Order *</Label>
        <Input id="lab_order_id" type="number" value={values.lab_order_id ?? ''} onChange={(e) => setValues({ ...values, lab_order_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="specimen_type">Specimen Type *</Label>
        <Input id="specimen_type" type="text" value={values.specimen_type ?? ''} onChange={(e) => setValues({ ...values, specimen_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="organism_found">Organism Found</Label>
        <Input id="organism_found" type="text" value={values.organism_found ?? ''} onChange={(e) => setValues({ ...values, organism_found: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="colony_count">Colony Count</Label>
        <Input id="colony_count" type="text" value={values.colony_count ?? ''} onChange={(e) => setValues({ ...values, colony_count: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At *</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="result_status">Result Status *</Label>
        <Input id="result_status" type="text" value={values.result_status ?? ''} onChange={(e) => setValues({ ...values, result_status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
