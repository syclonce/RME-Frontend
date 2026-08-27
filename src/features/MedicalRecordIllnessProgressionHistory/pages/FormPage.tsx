import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useIllnessProgressionHistoryResource } from '../api'
import type { IllnessProgressionHistoryFormValues } from '../types'

export function IllnessProgressionHistoryFormPage() {
  const navigate = useNavigate()
  const { create } = useIllnessProgressionHistoryResource()
  const [values, setValues] = useState<IllnessProgressionHistoryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-illness-progression-history') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah IllnessProgressionHistory</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
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
        <Label htmlFor="symptom_onset_date">Symptom Onset Date</Label>
        <Input id="symptom_onset_date" type="date" value={values.symptom_onset_date ?? ''} onChange={(e) => setValues({ ...values, symptom_onset_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="progression_description">Progression Description *</Label>
        <Input id="progression_description" type="text" value={values.progression_description ?? ''} onChange={(e) => setValues({ ...values, progression_description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="prior_treatment">Prior Treatment</Label>
        <Input id="prior_treatment" type="text" value={values.prior_treatment ?? ''} onChange={(e) => setValues({ ...values, prior_treatment: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
