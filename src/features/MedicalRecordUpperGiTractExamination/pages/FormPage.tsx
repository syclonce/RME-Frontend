import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useUpperGiTractExaminationResource } from '../api'
import type { UpperGiTractExaminationFormValues } from '../types'

export function UpperGiTractExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useUpperGiTractExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<UpperGiTractExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as UpperGiTractExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-upper-gi-tract-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-upper-gi-tract-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} UpperGiTractExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="procedure_type">Procedure Type</Label>
        <Input id="procedure_type" type="text" value={values.procedure_type ?? ''} onChange={(e) => setValues({ ...values, procedure_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="esophagus_findings">Esophagus Findings</Label>
        <Input id="esophagus_findings" type="text" value={values.esophagus_findings ?? ''} onChange={(e) => setValues({ ...values, esophagus_findings: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="stomach_findings">Stomach Findings</Label>
        <Input id="stomach_findings" type="text" value={values.stomach_findings ?? ''} onChange={(e) => setValues({ ...values, stomach_findings: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="duodenum_findings">Duodenum Findings</Label>
        <Input id="duodenum_findings" type="text" value={values.duodenum_findings ?? ''} onChange={(e) => setValues({ ...values, duodenum_findings: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="hpylori_result">Hpylori Result</Label>
        <Input id="hpylori_result" type="text" value={values.hpylori_result ?? ''} onChange={(e) => setValues({ ...values, hpylori_result: e.target.value })} />
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
