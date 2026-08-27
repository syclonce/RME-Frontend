import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFingerExaminationResource } from '../api'
import type { FingerExaminationFormValues } from '../types'

export function FingerExaminationFormPage() {
  const { create } = useFingerExaminationResource()
  const [values, setValues] = useState<FingerExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah FingerExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="hand_side">Hand Side</Label>
        <Input id="hand_side" type="text" value={values.hand_side ?? ''} onChange={(e) => setValues({ ...values, hand_side: e.target.value })} />
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
        <Label htmlFor="capillary_refill_seconds">Capillary Refill Seconds</Label>
        <Input id="capillary_refill_seconds" type="number" value={values.capillary_refill_seconds ?? ''} onChange={(e) => setValues({ ...values, capillary_refill_seconds: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="range_of_motion">Range Of Motion</Label>
        <Input id="range_of_motion" type="text" value={values.range_of_motion ?? ''} onChange={(e) => setValues({ ...values, range_of_motion: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
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
