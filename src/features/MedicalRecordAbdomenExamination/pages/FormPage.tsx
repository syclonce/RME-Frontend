import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAbdomenExaminationResource } from '../api'
import type { AbdomenExaminationFormValues } from '../types'

export function AbdomenExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useAbdomenExaminationResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<AbdomenExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as AbdomenExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-abdomen-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-abdomen-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} AbdomenExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="inspection">Inspection</Label>
        <Input id="inspection" type="text" value={values.inspection ?? ''} onChange={(e) => setValues({ ...values, inspection: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="auscultation_bowel_sounds">Auscultation Bowel Sounds</Label>
        <Input id="auscultation_bowel_sounds" type="text" value={values.auscultation_bowel_sounds ?? ''} onChange={(e) => setValues({ ...values, auscultation_bowel_sounds: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="palpation">Palpation</Label>
        <Input id="palpation" type="text" value={values.palpation ?? ''} onChange={(e) => setValues({ ...values, palpation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="percussion">Percussion</Label>
        <Input id="percussion" type="text" value={values.percussion ?? ''} onChange={(e) => setValues({ ...values, percussion: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="tenderness" checked={!!values.tenderness} onCheckedChange={(v) => setValues({ ...values, tenderness: !!v })} />
        <Label htmlFor="tenderness">Tenderness</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="distension" checked={!!values.distension} onCheckedChange={(v) => setValues({ ...values, distension: !!v })} />
        <Label htmlFor="distension">Distension</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="liver_span_cm">Liver Span Cm</Label>
        <Input id="liver_span_cm" type="number" value={values.liver_span_cm ?? ''} onChange={(e) => setValues({ ...values, liver_span_cm: e.target.value === '' ? null : Number(e.target.value) })} />
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
