import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useNursingDiagnosisResource } from '../api'
import type { NursingDiagnosisFormValues } from '../types'

export function NursingDiagnosisFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useNursingDiagnosisResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<NursingDiagnosisFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as NursingDiagnosisFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-nursing-diagnosis') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-nursing-diagnosis') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} NursingDiagnosis</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis_label">Diagnosis Label *</Label>
        <Input id="diagnosis_label" type="text" value={values.diagnosis_label ?? ''} onChange={(e) => setValues({ ...values, diagnosis_label: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="related_factors">Related Factors</Label>
        <Input id="related_factors" type="text" value={values.related_factors ?? ''} onChange={(e) => setValues({ ...values, related_factors: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="defining_characteristics">Defining Characteristics</Label>
        <Input id="defining_characteristics" type="text" value={values.defining_characteristics ?? ''} onChange={(e) => setValues({ ...values, defining_characteristics: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="priority">Priority</Label>
        <Input id="priority" type="text" value={values.priority ?? ''} onChange={(e) => setValues({ ...values, priority: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.recorded_by ?? null}
          onChange={(v) => setValues({ ...values, recorded_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At *</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
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
