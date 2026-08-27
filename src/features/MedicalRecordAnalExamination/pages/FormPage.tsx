import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAnalExaminationResource } from '../api'
import type { AnalExaminationFormValues } from '../types'

export function AnalExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useAnalExaminationResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<AnalExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as AnalExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-anal-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-anal-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} AnalExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="inspection">Inspection</Label>
        <Input id="inspection" type="text" value={values.inspection ?? ''} onChange={(e) => setValues({ ...values, inspection: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="palpation">Palpation</Label>
        <Input id="palpation" type="text" value={values.palpation ?? ''} onChange={(e) => setValues({ ...values, palpation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sphincter_tone">Sphincter Tone</Label>
        <Input id="sphincter_tone" type="text" value={values.sphincter_tone ?? ''} onChange={(e) => setValues({ ...values, sphincter_tone: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="rectal_toucher_findings">Rectal Toucher Findings</Label>
        <Input id="rectal_toucher_findings" type="text" value={values.rectal_toucher_findings ?? ''} onChange={(e) => setValues({ ...values, rectal_toucher_findings: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ampulla_recti">Ampulla Recti</Label>
        <Input id="ampulla_recti" type="text" value={values.ampulla_recti ?? ''} onChange={(e) => setValues({ ...values, ampulla_recti: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="findings">Findings</Label>
        <Input id="findings" type="text" value={values.findings ?? ''} onChange={(e) => setValues({ ...values, findings: e.target.value })} />
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
