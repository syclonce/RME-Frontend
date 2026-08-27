import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useClinicalNoteCoManagementResource } from '../api'
import type { ClinicalNoteCoManagementFormValues } from '../types'

export function ClinicalNoteCoManagementFormPage() {
  const { create } = useClinicalNoteCoManagementResource()
  const [values, setValues] = useState<ClinicalNoteCoManagementFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ClinicalNoteCoManagement</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="clinical_note_id">Clinical Note *</Label>
        <Input id="clinical_note_id" type="number" value={values.clinical_note_id ?? ''} onChange={(e) => setValues({ ...values, clinical_note_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="medical_department_id">Medical Department *</Label>
        <Input id="medical_department_id" type="number" value={values.medical_department_id ?? ''} onChange={(e) => setValues({ ...values, medical_department_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="author_id">Author *</Label>
        <Input id="author_id" type="number" value={values.author_id ?? ''} onChange={(e) => setValues({ ...values, author_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At *</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
