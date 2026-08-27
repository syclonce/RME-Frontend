import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useParentalHealthHistoryScreeningResource } from '../api'
import type { ParentalHealthHistoryScreeningFormValues } from '../types'

export function ParentalHealthHistoryScreeningFormPage() {
  const navigate = useNavigate()
  const { create } = useParentalHealthHistoryScreeningResource()
  const [values, setValues] = useState<ParentalHealthHistoryScreeningFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-parental-health-history-screening') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ParentalHealthHistoryScreening</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="screened_by">Screened By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.screened_by ?? null}
          onChange={(v) => setValues({ ...values, screened_by: v })}
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
        <Label htmlFor="father_health_conditions">Father Health Conditions</Label>
        <Input id="father_health_conditions" type="text" value={values.father_health_conditions ?? ''} onChange={(e) => setValues({ ...values, father_health_conditions: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mother_health_conditions">Mother Health Conditions</Label>
        <Input id="mother_health_conditions" type="text" value={values.mother_health_conditions ?? ''} onChange={(e) => setValues({ ...values, mother_health_conditions: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="consanguinity" checked={!!values.consanguinity} onCheckedChange={(v) => setValues({ ...values, consanguinity: !!v })} />
        <Label htmlFor="consanguinity">Consanguinity</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="genetic_disorder_history">Genetic Disorder History</Label>
        <Input id="genetic_disorder_history" type="text" value={values.genetic_disorder_history ?? ''} onChange={(e) => setValues({ ...values, genetic_disorder_history: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="screened_at">Screened At</Label>
        <Input id="screened_at" type="date" value={values.screened_at ?? ''} onChange={(e) => setValues({ ...values, screened_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
