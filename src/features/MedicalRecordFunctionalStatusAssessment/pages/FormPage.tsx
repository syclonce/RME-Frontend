import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useFunctionalStatusAssessmentResource } from '../api'
import type { FunctionalStatusAssessmentFormValues } from '../types'

export function FunctionalStatusAssessmentFormPage() {
  const navigate = useNavigate()
  const { create } = useFunctionalStatusAssessmentResource()
  const [values, setValues] = useState<FunctionalStatusAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-functional-status-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah FunctionalStatusAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_by">Assessed By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.assessed_by ?? null}
          onChange={(v) => setValues({ ...values, assessed_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <RelationSelect
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bathing_status">Bathing Status</Label>
        <Input id="bathing_status" type="text" value={values.bathing_status ?? ''} onChange={(e) => setValues({ ...values, bathing_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dressing_status">Dressing Status</Label>
        <Input id="dressing_status" type="text" value={values.dressing_status ?? ''} onChange={(e) => setValues({ ...values, dressing_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="toileting_status">Toileting Status</Label>
        <Input id="toileting_status" type="text" value={values.toileting_status ?? ''} onChange={(e) => setValues({ ...values, toileting_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="transferring_status">Transferring Status</Label>
        <Input id="transferring_status" type="text" value={values.transferring_status ?? ''} onChange={(e) => setValues({ ...values, transferring_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="feeding_status">Feeding Status</Label>
        <Input id="feeding_status" type="text" value={values.feeding_status ?? ''} onChange={(e) => setValues({ ...values, feeding_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_score">Total Score</Label>
        <Input id="total_score" type="number" value={values.total_score ?? ''} onChange={(e) => setValues({ ...values, total_score: e.target.value === '' ? null : Number(e.target.value) })} />
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
