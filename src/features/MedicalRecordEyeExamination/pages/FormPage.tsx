import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEyeExaminationResource } from '../api'
import type { EyeExaminationFormValues } from '../types'

export function EyeExaminationFormPage() {
  const { create } = useEyeExaminationResource()
  const [values, setValues] = useState<EyeExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah EyeExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="side">Side</Label>
        <Input id="side" type="text" value={values.side ?? ''} onChange={(e) => setValues({ ...values, side: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visual_acuity">Visual Acuity</Label>
        <Input id="visual_acuity" type="text" value={values.visual_acuity ?? ''} onChange={(e) => setValues({ ...values, visual_acuity: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pupil_size_mm">Pupil Size Mm</Label>
        <Input id="pupil_size_mm" type="number" value={values.pupil_size_mm ?? ''} onChange={(e) => setValues({ ...values, pupil_size_mm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pupil_reflex">Pupil Reflex</Label>
        <Input id="pupil_reflex" type="text" value={values.pupil_reflex ?? ''} onChange={(e) => setValues({ ...values, pupil_reflex: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="conjunctiva">Conjunctiva</Label>
        <Input id="conjunctiva" type="text" value={values.conjunctiva ?? ''} onChange={(e) => setValues({ ...values, conjunctiva: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sclera">Sclera</Label>
        <Input id="sclera" type="text" value={values.sclera ?? ''} onChange={(e) => setValues({ ...values, sclera: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="findings">Findings</Label>
        <Input id="findings" type="text" value={values.findings ?? ''} onChange={(e) => setValues({ ...values, findings: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
