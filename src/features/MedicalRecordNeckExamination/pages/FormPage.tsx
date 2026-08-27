import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNeckExaminationResource } from '../api'
import type { NeckExaminationFormValues } from '../types'

export function NeckExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useNeckExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<NeckExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as NeckExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-neck-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-neck-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} NeckExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lymph_nodes">Lymph Nodes</Label>
        <Input id="lymph_nodes" type="text" value={values.lymph_nodes ?? ''} onChange={(e) => setValues({ ...values, lymph_nodes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="thyroid">Thyroid</Label>
        <Input id="thyroid" type="text" value={values.thyroid ?? ''} onChange={(e) => setValues({ ...values, thyroid: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="jugular_venous_pressure">Jugular Venous Pressure</Label>
        <Input id="jugular_venous_pressure" type="text" value={values.jugular_venous_pressure ?? ''} onChange={(e) => setValues({ ...values, jugular_venous_pressure: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="trachea_position">Trachea Position</Label>
        <Input id="trachea_position" type="text" value={values.trachea_position ?? ''} onChange={(e) => setValues({ ...values, trachea_position: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="mass" checked={!!values.mass} onCheckedChange={(v) => setValues({ ...values, mass: !!v })} />
        <Label htmlFor="mass">Mass</Label>
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
