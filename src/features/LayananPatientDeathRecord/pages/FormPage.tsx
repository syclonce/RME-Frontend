import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePatientDeathRecordResource } from '../api'
import type { PatientDeathRecordFormValues } from '../types'

export function PatientDeathRecordFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePatientDeathRecordResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PatientDeathRecordFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PatientDeathRecordFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-patient-death-record') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-patient-death-record') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PatientDeathRecord</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
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
        <Label htmlFor="died_at">Died At *</Label>
        <Input id="died_at" type="date" value={values.died_at ?? ''} onChange={(e) => setValues({ ...values, died_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="cause_of_death">Cause Of Death</Label>
        <Input id="cause_of_death" type="text" value={values.cause_of_death ?? ''} onChange={(e) => setValues({ ...values, cause_of_death: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="declared_by">Declared By</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.declared_by ?? null}
          onChange={(v) => setValues({ ...values, declared_by: v })}
        />
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
