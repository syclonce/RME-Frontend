import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLipExaminationResource } from '../api'
import type { LipExaminationFormValues } from '../types'

export function LipExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useLipExaminationResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<LipExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as LipExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-lip-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-lip-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} LipExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="color">Color</Label>
        <Input id="color" type="text" value={values.color ?? ''} onChange={(e) => setValues({ ...values, color: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="symmetry">Symmetry</Label>
        <Input id="symmetry" type="text" value={values.symmetry ?? ''} onChange={(e) => setValues({ ...values, symmetry: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lesions">Lesions</Label>
        <Input id="lesions" type="text" value={values.lesions ?? ''} onChange={(e) => setValues({ ...values, lesions: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="moisture">Moisture</Label>
        <Input id="moisture" type="text" value={values.moisture ?? ''} onChange={(e) => setValues({ ...values, moisture: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
