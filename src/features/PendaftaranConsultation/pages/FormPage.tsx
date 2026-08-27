import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useConsultationResource } from '../api'
import type { ConsultationFormValues } from '../types'

export function ConsultationFormPage() {
  const navigate = useNavigate()
  const { create } = useConsultationResource()
  const [values, setValues] = useState<ConsultationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-consultation') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Consultation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="requesting_department_id">Requesting Department *</Label>
        <Input id="requesting_department_id" type="number" value={values.requesting_department_id ?? ''} onChange={(e) => setValues({ ...values, requesting_department_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="consulted_department_id">Consulted Department *</Label>
        <Input id="consulted_department_id" type="number" value={values.consulted_department_id ?? ''} onChange={(e) => setValues({ ...values, consulted_department_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="requested_at">Requested At</Label>
        <Input id="requested_at" type="date" value={values.requested_at ?? ''} onChange={(e) => setValues({ ...values, requested_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="question">Question</Label>
        <Input id="question" type="text" value={values.question ?? ''} onChange={(e) => setValues({ ...values, question: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
