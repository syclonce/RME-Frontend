import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePharynxExaminationResource } from '../api'
import type { PharynxExaminationFormValues } from '../types'

export function PharynxExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = usePharynxExaminationResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PharynxExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PharynxExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-pharynx-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-pharynx-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PharynxExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mucosa_color">Mucosa Color</Label>
        <Input id="mucosa_color" type="text" value={values.mucosa_color ?? ''} onChange={(e) => setValues({ ...values, mucosa_color: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="exudate" checked={!!values.exudate} onCheckedChange={(v) => setValues({ ...values, exudate: !!v })} />
        <Label htmlFor="exudate">Exudate</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="post_nasal_drip" checked={!!values.post_nasal_drip} onCheckedChange={(v) => setValues({ ...values, post_nasal_drip: !!v })} />
        <Label htmlFor="post_nasal_drip">Post Nasal Drip</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="posterior_wall_condition">Posterior Wall Condition</Label>
        <Input id="posterior_wall_condition" type="text" value={values.posterior_wall_condition ?? ''} onChange={(e) => setValues({ ...values, posterior_wall_condition: e.target.value })} />
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
