import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMedicalCheckupResultResource } from '../api'
import type { MedicalCheckupResultFormValues } from '../types'

export function MedicalCheckupResultFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useMedicalCheckupResultResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<MedicalCheckupResultFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as MedicalCheckupResultFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-medical-checkup-result') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-medical-checkup-result') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} MedicalCheckupResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="checkup_date">Checkup Date *</Label>
        <Input id="checkup_date" type="date" value={values.checkup_date ?? ''} onChange={(e) => setValues({ ...values, checkup_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="category">Category</Label>
        <Input id="category" type="text" value={values.category ?? ''} onChange={(e) => setValues({ ...values, category: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="summary">Summary</Label>
        <Input id="summary" type="text" value={values.summary ?? ''} onChange={(e) => setValues({ ...values, summary: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recommendation">Recommendation</Label>
        <Input id="recommendation" type="text" value={values.recommendation ?? ''} onChange={(e) => setValues({ ...values, recommendation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_by">Examined By *</Label>
        <Input id="examined_by" type="number" value={values.examined_by ?? ''} onChange={(e) => setValues({ ...values, examined_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
