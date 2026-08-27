import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePalateExaminationResource } from '../api'
import type { PalateExaminationFormValues } from '../types'

export function PalateExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = usePalateExaminationResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PalateExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PalateExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-palate-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-palate-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PalateExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="hard_palate">Hard Palate</Label>
        <Input id="hard_palate" type="text" value={values.hard_palate ?? ''} onChange={(e) => setValues({ ...values, hard_palate: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="soft_palate">Soft Palate</Label>
        <Input id="soft_palate" type="text" value={values.soft_palate ?? ''} onChange={(e) => setValues({ ...values, soft_palate: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="uvula_position">Uvula Position</Label>
        <Input id="uvula_position" type="text" value={values.uvula_position ?? ''} onChange={(e) => setValues({ ...values, uvula_position: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cleft_palate" checked={!!values.cleft_palate} onCheckedChange={(v) => setValues({ ...values, cleft_palate: !!v })} />
        <Label htmlFor="cleft_palate">Cleft Palate</Label>
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
