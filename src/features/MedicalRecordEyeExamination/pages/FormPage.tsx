import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useEyeExaminationResource } from '../api'
import type { EyeExaminationFormValues } from '../types'

export function EyeExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useEyeExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<EyeExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as EyeExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-eye-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-eye-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} EyeExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="side">Side</Label>
        <Select value={values.side ?? ''} onValueChange={(v) => setValues({ ...values, side: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="left" value="left">Left</SelectItem>
            <SelectItem key="right" value="right">Right</SelectItem>
            <SelectItem key="bilateral" value="bilateral">Bilateral</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visual_acuity">Visual Acuity</Label>
        <Input id="visual_acuity" type="text" value={values.visual_acuity ?? ''} onChange={(e) => setValues({ ...values, visual_acuity: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pupil_size_mm">Pupil Size Mm</Label>
        <Input id="pupil_size_mm" type="number" value={values.pupil_size_mm ?? ''} onChange={(e) => setValues({ ...values, pupil_size_mm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pupil_reflex">Pupil Reflex</Label>
        <Input id="pupil_reflex" type="text" value={values.pupil_reflex ?? ''} onChange={(e) => setValues({ ...values, pupil_reflex: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="conjunctiva">Conjunctiva</Label>
        <Input id="conjunctiva" type="text" value={values.conjunctiva ?? ''} onChange={(e) => setValues({ ...values, conjunctiva: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sclera">Sclera</Label>
        <Input id="sclera" type="text" value={values.sclera ?? ''} onChange={(e) => setValues({ ...values, sclera: e.target.value })} />
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
