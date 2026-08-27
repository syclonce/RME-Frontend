import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePathologyAnatomyResultResource } from '../api'
import type { PathologyAnatomyResultFormValues } from '../types'

export function PathologyAnatomyResultFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = usePathologyAnatomyResultResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PathologyAnatomyResultFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PathologyAnatomyResultFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-pathology-anatomy-result') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-pathology-anatomy-result') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PathologyAnatomyResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="specimen_description">Specimen Description *</Label>
        <Input id="specimen_description" type="text" value={values.specimen_description ?? ''} onChange={(e) => setValues({ ...values, specimen_description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="macroscopic_finding">Macroscopic Finding</Label>
        <Input id="macroscopic_finding" type="text" value={values.macroscopic_finding ?? ''} onChange={(e) => setValues({ ...values, macroscopic_finding: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="microscopic_finding">Microscopic Finding</Label>
        <Input id="microscopic_finding" type="text" value={values.microscopic_finding ?? ''} onChange={(e) => setValues({ ...values, microscopic_finding: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis">Diagnosis</Label>
        <Input id="diagnosis" type="text" value={values.diagnosis ?? ''} onChange={(e) => setValues({ ...values, diagnosis: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_by">Examined By</Label>
        <Input id="examined_by" type="number" value={values.examined_by ?? ''} onChange={(e) => setValues({ ...values, examined_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At *</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status *</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
