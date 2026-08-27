import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useThroatExaminationResource } from '../api'
import type { ThroatExaminationFormValues } from '../types'

export function ThroatExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useThroatExaminationResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ThroatExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ThroatExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-throat-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-throat-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ThroatExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pharynx">Pharynx</Label>
        <Input id="pharynx" type="text" value={values.pharynx ?? ''} onChange={(e) => setValues({ ...values, pharynx: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="uvula">Uvula</Label>
        <Input id="uvula" type="text" value={values.uvula ?? ''} onChange={(e) => setValues({ ...values, uvula: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mucosa">Mucosa</Label>
        <Input id="mucosa" type="text" value={values.mucosa ?? ''} onChange={(e) => setValues({ ...values, mucosa: e.target.value })} />
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
