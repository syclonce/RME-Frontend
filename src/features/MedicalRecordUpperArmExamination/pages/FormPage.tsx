import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useUpperArmExaminationResource } from '../api'
import type { UpperArmExaminationFormValues } from '../types'

export function UpperArmExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useUpperArmExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<UpperArmExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as UpperArmExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-upper-arm-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-upper-arm-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} UpperArmExamination</h1>
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
        <Input id="side" type="text" value={values.side ?? ''} onChange={(e) => setValues({ ...values, side: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="muscle_strength">Muscle Strength</Label>
        <Input id="muscle_strength" type="text" value={values.muscle_strength ?? ''} onChange={(e) => setValues({ ...values, muscle_strength: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="range_of_motion">Range Of Motion</Label>
        <Input id="range_of_motion" type="text" value={values.range_of_motion ?? ''} onChange={(e) => setValues({ ...values, range_of_motion: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="deformity" checked={!!values.deformity} onCheckedChange={(v) => setValues({ ...values, deformity: !!v })} />
        <Label htmlFor="deformity">Deformity</Label>
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
