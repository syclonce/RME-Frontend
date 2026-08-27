import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useHairExaminationResource } from '../api'
import type { HairExaminationFormValues } from '../types'

export function HairExaminationFormPage() {
  const { create } = useHairExaminationResource()
  const [values, setValues] = useState<HairExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah HairExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="distribution">Distribution</Label>
        <Input id="distribution" type="text" value={values.distribution ?? ''} onChange={(e) => setValues({ ...values, distribution: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="texture">Texture</Label>
        <Input id="texture" type="text" value={values.texture ?? ''} onChange={(e) => setValues({ ...values, texture: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="color">Color</Label>
        <Input id="color" type="text" value={values.color ?? ''} onChange={(e) => setValues({ ...values, color: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="hair_loss" checked={!!values.hair_loss} onCheckedChange={(v) => setValues({ ...values, hair_loss: !!v })} />
        <Label htmlFor="hair_loss">Hair Loss</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="scalp_condition">Scalp Condition</Label>
        <Input id="scalp_condition" type="text" value={values.scalp_condition ?? ''} onChange={(e) => setValues({ ...values, scalp_condition: e.target.value })} />
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
