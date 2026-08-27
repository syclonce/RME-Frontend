import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSurgeryResource } from '../api'
import type { SurgeryFormValues } from '../types'

export function SurgeryFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useSurgeryResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<SurgeryFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as SurgeryFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-surgery') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-surgery') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Surgery</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis_id">Diagnosis</Label>
        <Input id="diagnosis_id" type="number" value={values.diagnosis_id ?? ''} onChange={(e) => setValues({ ...values, diagnosis_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="procedure_name">Procedure Name *</Label>
        <Input id="procedure_name" type="text" value={values.procedure_name ?? ''} onChange={(e) => setValues({ ...values, procedure_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="surgeon_id">Surgeon *</Label>
        <Input id="surgeon_id" type="number" value={values.surgeon_id ?? ''} onChange={(e) => setValues({ ...values, surgeon_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="anesthesia_type">Anesthesia Type</Label>
        <Input id="anesthesia_type" type="text" value={values.anesthesia_type ?? ''} onChange={(e) => setValues({ ...values, anesthesia_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="started_at">Started At</Label>
        <Input id="started_at" type="date" value={values.started_at ?? ''} onChange={(e) => setValues({ ...values, started_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ended_at">Ended At</Label>
        <Input id="ended_at" type="date" value={values.ended_at ?? ''} onChange={(e) => setValues({ ...values, ended_at: e.target.value })} />
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
