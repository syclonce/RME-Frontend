import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useFibroscanResultResource } from '../api'
import type { FibroscanResultFormValues } from '../types'

export function FibroscanResultFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useFibroscanResultResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<FibroscanResultFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as FibroscanResultFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-fibroscan-result') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-fibroscan-result') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} FibroscanResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examination_date">Examination Date *</Label>
        <Input id="examination_date" type="date" value={values.examination_date ?? ''} onChange={(e) => setValues({ ...values, examination_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="liver_stiffness_kpa">Liver Stiffness Kpa</Label>
        <Input id="liver_stiffness_kpa" type="number" value={values.liver_stiffness_kpa ?? ''} onChange={(e) => setValues({ ...values, liver_stiffness_kpa: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="cap_score">Cap Score</Label>
        <Input id="cap_score" type="number" value={values.cap_score ?? ''} onChange={(e) => setValues({ ...values, cap_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fibrosis_stage">Fibrosis Stage</Label>
        <Input id="fibrosis_stage" type="text" value={values.fibrosis_stage ?? ''} onChange={(e) => setValues({ ...values, fibrosis_stage: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_by">Examined By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.examined_by ?? null}
          onChange={(v) => setValues({ ...values, examined_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
