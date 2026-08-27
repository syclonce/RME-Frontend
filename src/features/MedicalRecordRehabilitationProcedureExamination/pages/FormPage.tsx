import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useRehabilitationProcedureExaminationResource } from '../api'
import type { RehabilitationProcedureExaminationFormValues } from '../types'

export function RehabilitationProcedureExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useRehabilitationProcedureExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<RehabilitationProcedureExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as RehabilitationProcedureExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-rehabilitation-procedure-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-rehabilitation-procedure-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} RehabilitationProcedureExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="procedure_name">Procedure Name *</Label>
        <Input id="procedure_name" type="text" value={values.procedure_name ?? ''} onChange={(e) => setValues({ ...values, procedure_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="therapist_id">Therapist</Label>
        <Input id="therapist_id" type="number" value={values.therapist_id ?? ''} onChange={(e) => setValues({ ...values, therapist_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis_summary">Diagnosis Summary</Label>
        <Input id="diagnosis_summary" type="text" value={values.diagnosis_summary ?? ''} onChange={(e) => setValues({ ...values, diagnosis_summary: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="functional_goal">Functional Goal</Label>
        <Input id="functional_goal" type="text" value={values.functional_goal ?? ''} onChange={(e) => setValues({ ...values, functional_goal: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
