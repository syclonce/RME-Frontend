import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useChestExaminationResource } from '../api'
import type { ChestExaminationFormValues } from '../types'

export function ChestExaminationFormPage() {
  const { create } = useChestExaminationResource()
  const [values, setValues] = useState<ChestExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ChestExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="inspection">Inspection</Label>
        <Input id="inspection" type="text" value={values.inspection ?? ''} onChange={(e) => setValues({ ...values, inspection: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="palpation">Palpation</Label>
        <Input id="palpation" type="text" value={values.palpation ?? ''} onChange={(e) => setValues({ ...values, palpation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="percussion">Percussion</Label>
        <Input id="percussion" type="text" value={values.percussion ?? ''} onChange={(e) => setValues({ ...values, percussion: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="auscultation_breath_sounds">Auscultation Breath Sounds</Label>
        <Input id="auscultation_breath_sounds" type="text" value={values.auscultation_breath_sounds ?? ''} onChange={(e) => setValues({ ...values, auscultation_breath_sounds: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="auscultation_heart_sounds">Auscultation Heart Sounds</Label>
        <Input id="auscultation_heart_sounds" type="text" value={values.auscultation_heart_sounds ?? ''} onChange={(e) => setValues({ ...values, auscultation_heart_sounds: e.target.value })} />
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
