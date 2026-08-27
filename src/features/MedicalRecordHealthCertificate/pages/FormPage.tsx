import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useHealthCertificateResource } from '../api'
import type { HealthCertificateFormValues } from '../types'

export function HealthCertificateFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useHealthCertificateResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<HealthCertificateFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as HealthCertificateFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-health-certificate') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-health-certificate') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} HealthCertificate</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="letter_number">Letter Number *</Label>
        <Input id="letter_number" type="text" value={values.letter_number ?? ''} onChange={(e) => setValues({ ...values, letter_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <AsyncCombobox
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="doctor_id">Doctor *</Label>
        <RelationSelect
          endpoint="/doctors"
          value={values.doctor_id ?? null}
          onChange={(v) => setValues({ ...values, doctor_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="issue_date">Issue Date *</Label>
        <Input id="issue_date" type="date" value={values.issue_date ?? ''} onChange={(e) => setValues({ ...values, issue_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="physical_fitness_status">Physical Fitness Status</Label>
        <Input id="physical_fitness_status" type="text" value={values.physical_fitness_status ?? ''} onChange={(e) => setValues({ ...values, physical_fitness_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="purpose">Purpose</Label>
        <Input id="purpose" type="text" value={values.purpose ?? ''} onChange={(e) => setValues({ ...values, purpose: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_pressure">Blood Pressure</Label>
        <Input id="blood_pressure" type="text" value={values.blood_pressure ?? ''} onChange={(e) => setValues({ ...values, blood_pressure: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="height_cm">Height Cm</Label>
        <Input id="height_cm" type="number" value={values.height_cm ?? ''} onChange={(e) => setValues({ ...values, height_cm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="weight_kg">Weight Kg</Label>
        <Input id="weight_kg" type="number" value={values.weight_kg ?? ''} onChange={(e) => setValues({ ...values, weight_kg: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="remarks">Remarks</Label>
        <Input id="remarks" type="text" value={values.remarks ?? ''} onChange={(e) => setValues({ ...values, remarks: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
