import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { usePatientDischargeRecordResource } from '../api'
import type { PatientDischargeRecordFormValues } from '../types'

export function PatientDischargeRecordFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePatientDischargeRecordResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PatientDischargeRecordFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PatientDischargeRecordFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-patient-discharge-record') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-patient-discharge-record') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PatientDischargeRecord</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
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
        <Label htmlFor="discharged_at">Discharged At *</Label>
        <Input id="discharged_at" type="date" value={values.discharged_at ?? ''} onChange={(e) => setValues({ ...values, discharged_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="discharge_method">Discharge Method *</Label>
        <Input id="discharge_method" type="text" value={values.discharge_method ?? ''} onChange={(e) => setValues({ ...values, discharge_method: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="discharged_by">Discharged By</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.discharged_by ?? null}
          onChange={(v) => setValues({ ...values, discharged_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="follow_up_notes">Follow Up Notes</Label>
        <Input id="follow_up_notes" type="text" value={values.follow_up_notes ?? ''} onChange={(e) => setValues({ ...values, follow_up_notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
