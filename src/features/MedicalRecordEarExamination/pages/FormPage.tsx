import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEarExaminationResource } from '../api'
import type { EarExaminationFormValues } from '../types'

export function EarExaminationFormPage() {
  const { create } = useEarExaminationResource()
  const [values, setValues] = useState<EarExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah EarExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="side">Side</Label>
        <Input id="side" type="text" value={values.side ?? ''} onChange={(e) => setValues({ ...values, side: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="otoscopy">Otoscopy</Label>
        <Input id="otoscopy" type="text" value={values.otoscopy ?? ''} onChange={(e) => setValues({ ...values, otoscopy: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tympanic_membrane">Tympanic Membrane</Label>
        <Input id="tympanic_membrane" type="text" value={values.tympanic_membrane ?? ''} onChange={(e) => setValues({ ...values, tympanic_membrane: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="hearing_test_result">Hearing Test Result</Label>
        <Input id="hearing_test_result" type="text" value={values.hearing_test_result ?? ''} onChange={(e) => setValues({ ...values, hearing_test_result: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="discharge" checked={!!values.discharge} onCheckedChange={(v) => setValues({ ...values, discharge: !!v })} />
        <Label htmlFor="discharge">Discharge</Label>
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
