import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useTreatmentHistoryResource } from '../api'
import type { TreatmentHistoryFormValues } from '../types'

export function TreatmentHistoryFormPage() {
  const navigate = useNavigate()
  const { create } = useTreatmentHistoryResource()
  const [values, setValues] = useState<TreatmentHistoryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-treatment-history') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah TreatmentHistory</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <AsyncCombobox
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="treatment_description">Treatment Description *</Label>
        <Input id="treatment_description" type="text" value={values.treatment_description ?? ''} onChange={(e) => setValues({ ...values, treatment_description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="facility_name">Facility Name</Label>
        <Input id="facility_name" type="text" value={values.facility_name ?? ''} onChange={(e) => setValues({ ...values, facility_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="treatment_date">Treatment Date</Label>
        <Input id="treatment_date" type="date" value={values.treatment_date ?? ''} onChange={(e) => setValues({ ...values, treatment_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="outcome">Outcome</Label>
        <Input id="outcome" type="text" value={values.outcome ?? ''} onChange={(e) => setValues({ ...values, outcome: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
