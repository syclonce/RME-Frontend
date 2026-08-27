import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAnamnesisSourceResource } from '../api'
import type { AnamnesisSourceFormValues } from '../types'

export function AnamnesisSourceFormPage() {
  const { create } = useAnamnesisSourceResource()
  const [values, setValues] = useState<AnamnesisSourceFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AnamnesisSource</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="anamnesis_id">Anamnesis *</Label>
        <Input id="anamnesis_id" type="number" value={values.anamnesis_id ?? ''} onChange={(e) => setValues({ ...values, anamnesis_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="source_type">Source Type *</Label>
        <Input id="source_type" type="text" value={values.source_type ?? ''} onChange={(e) => setValues({ ...values, source_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="source_name">Source Name</Label>
        <Input id="source_name" type="text" value={values.source_name ?? ''} onChange={(e) => setValues({ ...values, source_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="relationship">Relationship</Label>
        <Input id="relationship" type="text" value={values.relationship ?? ''} onChange={(e) => setValues({ ...values, relationship: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
