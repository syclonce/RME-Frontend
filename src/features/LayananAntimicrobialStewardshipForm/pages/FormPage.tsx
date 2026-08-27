import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAntimicrobialStewardshipFormResource } from '../api'
import type { AntimicrobialStewardshipFormFormValues } from '../types'

export function AntimicrobialStewardshipFormFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useAntimicrobialStewardshipFormResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<AntimicrobialStewardshipFormFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as AntimicrobialStewardshipFormFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-antimicrobial-stewardship-form') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-antimicrobial-stewardship-form') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} AntimicrobialStewardshipForm</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="requesting_doctor_id">Requesting Doctor</Label>
        <Input id="requesting_doctor_id" type="number" value={values.requesting_doctor_id ?? ''} onChange={(e) => setValues({ ...values, requesting_doctor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="antibiotic_restriction_id">Antibiotic Restriction</Label>
        <Input id="antibiotic_restriction_id" type="number" value={values.antibiotic_restriction_id ?? ''} onChange={(e) => setValues({ ...values, antibiotic_restriction_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="indication">Indication *</Label>
        <Input id="indication" type="text" value={values.indication ?? ''} onChange={(e) => setValues({ ...values, indication: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status *</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="submitted_at">Submitted At</Label>
        <Input id="submitted_at" type="date" value={values.submitted_at ?? ''} onChange={(e) => setValues({ ...values, submitted_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
