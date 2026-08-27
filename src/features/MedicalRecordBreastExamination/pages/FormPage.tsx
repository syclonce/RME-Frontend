import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBreastExaminationResource } from '../api'
import type { BreastExaminationFormValues } from '../types'

export function BreastExaminationFormPage() {
  const { create } = useBreastExaminationResource()
  const [values, setValues] = useState<BreastExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BreastExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="side">Side</Label>
        <Input id="side" type="text" value={values.side ?? ''} onChange={(e) => setValues({ ...values, side: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="inspection">Inspection</Label>
        <Input id="inspection" type="text" value={values.inspection ?? ''} onChange={(e) => setValues({ ...values, inspection: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="palpation">Palpation</Label>
        <Input id="palpation" type="text" value={values.palpation ?? ''} onChange={(e) => setValues({ ...values, palpation: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="lump_present" checked={!!values.lump_present} onCheckedChange={(v) => setValues({ ...values, lump_present: !!v })} />
        <Label htmlFor="lump_present">Lump Present</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="nipple_discharge">Nipple Discharge</Label>
        <Input id="nipple_discharge" type="text" value={values.nipple_discharge ?? ''} onChange={(e) => setValues({ ...values, nipple_discharge: e.target.value })} />
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
