import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAnamnesisSourceResource } from '../api'
import type { AnamnesisSourceFormValues } from '../types'

export function AnamnesisSourceFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useAnamnesisSourceResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<AnamnesisSourceFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as AnamnesisSourceFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-anamnesis-source') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-anamnesis-source') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} AnamnesisSource</h1>
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
