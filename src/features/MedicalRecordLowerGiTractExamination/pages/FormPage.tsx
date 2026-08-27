import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLowerGiTractExaminationResource } from '../api'
import type { LowerGiTractExaminationFormValues } from '../types'

export function LowerGiTractExaminationFormPage() {
  const { create } = useLowerGiTractExaminationResource()
  const [values, setValues] = useState<LowerGiTractExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah LowerGiTractExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="procedure_type">Procedure Type</Label>
        <Input id="procedure_type" type="text" value={values.procedure_type ?? ''} onChange={(e) => setValues({ ...values, procedure_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="colon_findings">Colon Findings</Label>
        <Input id="colon_findings" type="text" value={values.colon_findings ?? ''} onChange={(e) => setValues({ ...values, colon_findings: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="rectum_findings">Rectum Findings</Label>
        <Input id="rectum_findings" type="text" value={values.rectum_findings ?? ''} onChange={(e) => setValues({ ...values, rectum_findings: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="polyps_found" checked={!!values.polyps_found} onCheckedChange={(v) => setValues({ ...values, polyps_found: !!v })} />
        <Label htmlFor="polyps_found">Polyps Found</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="biopsy_taken" checked={!!values.biopsy_taken} onCheckedChange={(v) => setValues({ ...values, biopsy_taken: !!v })} />
        <Label htmlFor="biopsy_taken">Biopsy Taken</Label>
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
