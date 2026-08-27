import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useHospitalizationCertificateResource } from '../api'
import type { HospitalizationCertificateFormValues } from '../types'

export function HospitalizationCertificateFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useHospitalizationCertificateResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<HospitalizationCertificateFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as HospitalizationCertificateFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-hospitalization-certificate') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-hospitalization-certificate') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} HospitalizationCertificate</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="letter_number">Letter Number *</Label>
        <Input id="letter_number" type="text" value={values.letter_number ?? ''} onChange={(e) => setValues({ ...values, letter_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <RelationSelect
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
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
        <Label htmlFor="admission_date">Admission Date</Label>
        <Input id="admission_date" type="date" value={values.admission_date ?? ''} onChange={(e) => setValues({ ...values, admission_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="estimated_duration_days">Estimated Duration Days</Label>
        <Input id="estimated_duration_days" type="number" value={values.estimated_duration_days ?? ''} onChange={(e) => setValues({ ...values, estimated_duration_days: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_name">Ward Name</Label>
        <Input id="ward_name" type="text" value={values.ward_name ?? ''} onChange={(e) => setValues({ ...values, ward_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis">Diagnosis</Label>
        <Input id="diagnosis" type="text" value={values.diagnosis ?? ''} onChange={(e) => setValues({ ...values, diagnosis: e.target.value })} />
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
