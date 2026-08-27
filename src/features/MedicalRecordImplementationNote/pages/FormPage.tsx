import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useImplementationNoteResource } from '../api'
import type { ImplementationNoteFormValues } from '../types'

export function ImplementationNoteFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useImplementationNoteResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ImplementationNoteFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ImplementationNoteFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-implementation-note') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-implementation-note') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ImplementationNote</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="note_type">Note Type</Label>
        <Input id="note_type" type="text" value={values.note_type ?? ''} onChange={(e) => setValues({ ...values, note_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="content">Content</Label>
        <Input id="content" type="text" value={values.content ?? ''} onChange={(e) => setValues({ ...values, content: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By *</Label>
        <Input id="recorded_by" type="number" value={values.recorded_by ?? ''} onChange={(e) => setValues({ ...values, recorded_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At *</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
