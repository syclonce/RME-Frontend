import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToenailExaminationResource } from '../api'
import type { ToenailExaminationFormValues } from '../types'

export function ToenailExaminationFormPage() {
  const { create } = useToenailExaminationResource()
  const [values, setValues] = useState<ToenailExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ToenailExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="color">Color</Label>
        <Input id="color" type="text" value={values.color ?? ''} onChange={(e) => setValues({ ...values, color: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="capillary_refill_seconds">Capillary Refill Seconds</Label>
        <Input id="capillary_refill_seconds" type="number" value={values.capillary_refill_seconds ?? ''} onChange={(e) => setValues({ ...values, capillary_refill_seconds: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="clubbing" checked={!!values.clubbing} onCheckedChange={(v) => setValues({ ...values, clubbing: !!v })} />
        <Label htmlFor="clubbing">Clubbing</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cyanosis" checked={!!values.cyanosis} onCheckedChange={(v) => setValues({ ...values, cyanosis: !!v })} />
        <Label htmlFor="cyanosis">Cyanosis</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lesions">Lesions</Label>
        <Input id="lesions" type="text" value={values.lesions ?? ''} onChange={(e) => setValues({ ...values, lesions: e.target.value })} />
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
