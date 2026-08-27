import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBackExaminationResource } from '../api'
import type { BackExaminationFormValues } from '../types'

export function BackExaminationFormPage() {
  const { create } = useBackExaminationResource()
  const [values, setValues] = useState<BackExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BackExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="spine_alignment">Spine Alignment</Label>
        <Input id="spine_alignment" type="text" value={values.spine_alignment ?? ''} onChange={(e) => setValues({ ...values, spine_alignment: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="scoliosis" checked={!!values.scoliosis} onCheckedChange={(v) => setValues({ ...values, scoliosis: !!v })} />
        <Label htmlFor="scoliosis">Scoliosis</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="kyphosis" checked={!!values.kyphosis} onCheckedChange={(v) => setValues({ ...values, kyphosis: !!v })} />
        <Label htmlFor="kyphosis">Kyphosis</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="lordosis" checked={!!values.lordosis} onCheckedChange={(v) => setValues({ ...values, lordosis: !!v })} />
        <Label htmlFor="lordosis">Lordosis</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="tenderness" checked={!!values.tenderness} onCheckedChange={(v) => setValues({ ...values, tenderness: !!v })} />
        <Label htmlFor="tenderness">Tenderness</Label>
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
