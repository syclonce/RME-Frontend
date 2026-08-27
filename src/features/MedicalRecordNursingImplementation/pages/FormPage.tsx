import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useNursingImplementationResource } from '../api'
import type { NursingImplementationFormValues } from '../types'

export function NursingImplementationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useNursingImplementationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<NursingImplementationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as NursingImplementationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-nursing-implementation') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-nursing-implementation') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} NursingImplementation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="nursing_diagnosis_id">Nursing Diagnosis *</Label>
        <RelationSelect
          endpoint="/nursing-diagnoses"
          value={values.nursing_diagnosis_id ?? null}
          onChange={(v) => setValues({ ...values, nursing_diagnosis_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="action_taken">Action Taken</Label>
        <Input id="action_taken" type="text" value={values.action_taken ?? ''} onChange={(e) => setValues({ ...values, action_taken: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="performed_by">Performed By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.performed_by ?? null}
          onChange={(v) => setValues({ ...values, performed_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="performed_at">Performed At *</Label>
        <Input id="performed_at" type="date" value={values.performed_at ?? ''} onChange={(e) => setValues({ ...values, performed_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_response">Patient Response</Label>
        <Input id="patient_response" type="text" value={values.patient_response ?? ''} onChange={(e) => setValues({ ...values, patient_response: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
