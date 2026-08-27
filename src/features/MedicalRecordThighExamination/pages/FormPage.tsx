import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useThighExaminationResource } from '../api'
import type { ThighExaminationFormValues } from '../types'

export function ThighExaminationFormPage() {
  const { create } = useThighExaminationResource()
  const [values, setValues] = useState<ThighExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ThighExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
        <Label htmlFor="circumference_cm">Circumference Cm</Label>
        <Input id="circumference_cm" type="number" value={values.circumference_cm ?? ''} onChange={(e) => setValues({ ...values, circumference_cm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="swelling" checked={!!values.swelling} onCheckedChange={(v) => setValues({ ...values, swelling: !!v })} />
        <Label htmlFor="swelling">Swelling</Label>
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
