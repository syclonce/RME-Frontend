import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTonsilExaminationResource } from '../api'
import type { TonsilExaminationFormValues } from '../types'

export function TonsilExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useTonsilExaminationResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<TonsilExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as TonsilExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-tonsil-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-tonsil-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} TonsilExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="side">Side</Label>
        <Input id="side" type="text" value={values.side ?? ''} onChange={(e) => setValues({ ...values, side: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="grade">Grade</Label>
        <Input id="grade" type="number" value={values.grade ?? ''} onChange={(e) => setValues({ ...values, grade: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="color">Color</Label>
        <Input id="color" type="text" value={values.color ?? ''} onChange={(e) => setValues({ ...values, color: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="exudate" checked={!!values.exudate} onCheckedChange={(v) => setValues({ ...values, exudate: !!v })} />
        <Label htmlFor="exudate">Exudate</Label>
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
