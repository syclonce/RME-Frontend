import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useHeadExaminationResource } from '../api'
import type { HeadExaminationFormValues } from '../types'

export function HeadExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useHeadExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<HeadExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as HeadExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-head-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-head-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} HeadExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="skull_shape">Skull Shape</Label>
        <Input id="skull_shape" type="text" value={values.skull_shape ?? ''} onChange={(e) => setValues({ ...values, skull_shape: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="hair_distribution">Hair Distribution</Label>
        <Input id="hair_distribution" type="text" value={values.hair_distribution ?? ''} onChange={(e) => setValues({ ...values, hair_distribution: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="facial_symmetry">Facial Symmetry</Label>
        <Input id="facial_symmetry" type="text" value={values.facial_symmetry ?? ''} onChange={(e) => setValues({ ...values, facial_symmetry: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="tenderness" checked={!!values.tenderness} onCheckedChange={(v) => setValues({ ...values, tenderness: !!v })} />
        <Label htmlFor="tenderness">Tenderness</Label>
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
