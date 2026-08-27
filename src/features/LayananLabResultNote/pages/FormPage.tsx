import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLabResultNoteResource } from '../api'
import type { LabResultNoteFormValues } from '../types'

export function LabResultNoteFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useLabResultNoteResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<LabResultNoteFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as LabResultNoteFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-lab-result-note') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-lab-result-note') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} LabResultNote</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_result_id">Lab Result *</Label>
        <Input id="lab_result_id" type="number" value={values.lab_result_id ?? ''} onChange={(e) => setValues({ ...values, lab_result_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="note">Note *</Label>
        <Input id="note" type="text" value={values.note ?? ''} onChange={(e) => setValues({ ...values, note: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <Input id="created_by" type="number" value={values.created_by ?? ''} onChange={(e) => setValues({ ...values, created_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
