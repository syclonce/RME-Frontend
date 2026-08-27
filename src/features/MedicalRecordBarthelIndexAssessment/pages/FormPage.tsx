import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBarthelIndexAssessmentResource } from '../api'
import type { BarthelIndexAssessmentFormValues } from '../types'

export function BarthelIndexAssessmentFormPage() {
  const { create } = useBarthelIndexAssessmentResource()
  const [values, setValues] = useState<BarthelIndexAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BarthelIndexAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="feeding">Feeding</Label>
        <Input id="feeding" type="number" value={values.feeding ?? ''} onChange={(e) => setValues({ ...values, feeding: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bathing">Bathing</Label>
        <Input id="bathing" type="number" value={values.bathing ?? ''} onChange={(e) => setValues({ ...values, bathing: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="grooming">Grooming</Label>
        <Input id="grooming" type="number" value={values.grooming ?? ''} onChange={(e) => setValues({ ...values, grooming: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dressing">Dressing</Label>
        <Input id="dressing" type="number" value={values.dressing ?? ''} onChange={(e) => setValues({ ...values, dressing: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bowel_control">Bowel Control</Label>
        <Input id="bowel_control" type="number" value={values.bowel_control ?? ''} onChange={(e) => setValues({ ...values, bowel_control: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bladder_control">Bladder Control</Label>
        <Input id="bladder_control" type="number" value={values.bladder_control ?? ''} onChange={(e) => setValues({ ...values, bladder_control: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="toilet_use">Toilet Use</Label>
        <Input id="toilet_use" type="number" value={values.toilet_use ?? ''} onChange={(e) => setValues({ ...values, toilet_use: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="transfers">Transfers</Label>
        <Input id="transfers" type="number" value={values.transfers ?? ''} onChange={(e) => setValues({ ...values, transfers: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mobility">Mobility</Label>
        <Input id="mobility" type="number" value={values.mobility ?? ''} onChange={(e) => setValues({ ...values, mobility: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="stairs">Stairs</Label>
        <Input id="stairs" type="number" value={values.stairs ?? ''} onChange={(e) => setValues({ ...values, stairs: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_score">Total Score</Label>
        <Input id="total_score" type="number" value={values.total_score ?? ''} onChange={(e) => setValues({ ...values, total_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="interpretation">Interpretation</Label>
        <Input id="interpretation" type="text" value={values.interpretation ?? ''} onChange={(e) => setValues({ ...values, interpretation: e.target.value })} />
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
