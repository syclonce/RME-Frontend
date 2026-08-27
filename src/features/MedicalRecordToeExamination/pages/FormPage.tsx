import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToeExaminationResource } from '../api'
import type { ToeExaminationFormValues } from '../types'

export function ToeExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useToeExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ToeExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ToeExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-toe-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-toe-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ToeExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="foot_side">Foot Side</Label>
        <Input id="foot_side" type="text" value={values.foot_side ?? ''} onChange={(e) => setValues({ ...values, foot_side: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="deformity">Deformity</Label>
        <Input id="deformity" type="text" value={values.deformity ?? ''} onChange={(e) => setValues({ ...values, deformity: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="ulceration" checked={!!values.ulceration} onCheckedChange={(v) => setValues({ ...values, ulceration: !!v })} />
        <Label htmlFor="ulceration">Ulceration</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="capillary_refill_seconds">Capillary Refill Seconds</Label>
        <Input id="capillary_refill_seconds" type="number" value={values.capillary_refill_seconds ?? ''} onChange={(e) => setValues({ ...values, capillary_refill_seconds: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sensation_monofilament">Sensation Monofilament</Label>
        <Input id="sensation_monofilament" type="text" value={values.sensation_monofilament ?? ''} onChange={(e) => setValues({ ...values, sensation_monofilament: e.target.value })} />
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
