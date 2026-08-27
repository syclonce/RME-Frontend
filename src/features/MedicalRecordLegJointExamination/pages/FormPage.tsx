import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useLegJointExaminationResource } from '../api'
import type { LegJointExaminationFormValues } from '../types'

export function LegJointExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useLegJointExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<LegJointExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as LegJointExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-leg-joint-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-leg-joint-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} LegJointExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="joint">Joint</Label>
        <Select value={values.joint ?? ''} onValueChange={(v) => setValues({ ...values, joint: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="hip" value="hip">Hip</SelectItem>
            <SelectItem key="knee" value="knee">Knee</SelectItem>
            <SelectItem key="ankle" value="ankle">Ankle</SelectItem>
            <SelectItem key="toe" value="toe">Toe</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="range_of_motion">Range Of Motion</Label>
        <Input id="range_of_motion" type="text" value={values.range_of_motion ?? ''} onChange={(e) => setValues({ ...values, range_of_motion: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="swelling" checked={!!values.swelling} onCheckedChange={(v) => setValues({ ...values, swelling: !!v })} />
        <Label htmlFor="swelling">Swelling</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="tenderness" checked={!!values.tenderness} onCheckedChange={(v) => setValues({ ...values, tenderness: !!v })} />
        <Label htmlFor="tenderness">Tenderness</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="deformity">Deformity</Label>
        <Input id="deformity" type="text" value={values.deformity ?? ''} onChange={(e) => setValues({ ...values, deformity: e.target.value })} />
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
