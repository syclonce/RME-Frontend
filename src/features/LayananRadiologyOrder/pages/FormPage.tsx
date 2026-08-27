import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRadiologyOrderResource } from '../api'
import type { RadiologyOrderFormValues } from '../types'

export function RadiologyOrderFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useRadiologyOrderResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<RadiologyOrderFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as RadiologyOrderFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-radiology-order') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-radiology-order') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} RadiologyOrder</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ordering_doctor_id">Ordering Doctor</Label>
        <Input id="ordering_doctor_id" type="number" value={values.ordering_doctor_id ?? ''} onChange={(e) => setValues({ ...values, ordering_doctor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ordered_at">Ordered At *</Label>
        <Input id="ordered_at" type="date" value={values.ordered_at ?? ''} onChange={(e) => setValues({ ...values, ordered_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="clinical_notes">Clinical Notes</Label>
        <Input id="clinical_notes" type="text" value={values.clinical_notes ?? ''} onChange={(e) => setValues({ ...values, clinical_notes: e.target.value })} />
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
