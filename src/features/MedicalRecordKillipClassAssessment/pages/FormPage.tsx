import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useKillipClassAssessmentResource } from '../api'
import type { KillipClassAssessmentFormValues } from '../types'

export function KillipClassAssessmentFormPage() {
  const navigate = useNavigate()
  const { create } = useKillipClassAssessmentResource()
  const [values, setValues] = useState<KillipClassAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-killip-class-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah KillipClassAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_by">Assessed By *</Label>
        <Input id="assessed_by" type="number" value={values.assessed_by ?? ''} onChange={(e) => setValues({ ...values, assessed_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <Input id="created_by" type="number" value={values.created_by ?? ''} onChange={(e) => setValues({ ...values, created_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="killip_class">Killip Class *</Label>
        <Input id="killip_class" type="number" value={values.killip_class ?? ''} onChange={(e) => setValues({ ...values, killip_class: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="heart_rate">Heart Rate</Label>
        <Input id="heart_rate" type="number" value={values.heart_rate ?? ''} onChange={(e) => setValues({ ...values, heart_rate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="respiratory_rate">Respiratory Rate</Label>
        <Input id="respiratory_rate" type="number" value={values.respiratory_rate ?? ''} onChange={(e) => setValues({ ...values, respiratory_rate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="rales_present" checked={!!values.rales_present} onCheckedChange={(v) => setValues({ ...values, rales_present: !!v })} />
        <Label htmlFor="rales_present">Rales Present</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="s3_gallop_present" checked={!!values.s3_gallop_present} onCheckedChange={(v) => setValues({ ...values, s3_gallop_present: !!v })} />
        <Label htmlFor="s3_gallop_present">S3 Gallop Present</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_at">Assessed At</Label>
        <Input id="assessed_at" type="date" value={values.assessed_at ?? ''} onChange={(e) => setValues({ ...values, assessed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
