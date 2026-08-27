import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMedicationAdministrationHistoryResource } from '../api'
import type { MedicationAdministrationHistoryFormValues } from '../types'

export function MedicationAdministrationHistoryFormPage() {
  const navigate = useNavigate()
  const { create } = useMedicationAdministrationHistoryResource()
  const [values, setValues] = useState<MedicationAdministrationHistoryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-medication-administration-history') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah MedicationAdministrationHistory</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="administered_by">Administered By *</Label>
        <Input id="administered_by" type="number" value={values.administered_by ?? ''} onChange={(e) => setValues({ ...values, administered_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <Input id="created_by" type="number" value={values.created_by ?? ''} onChange={(e) => setValues({ ...values, created_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="drug_name">Drug Name *</Label>
        <Input id="drug_name" type="text" value={values.drug_name ?? ''} onChange={(e) => setValues({ ...values, drug_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dose">Dose</Label>
        <Input id="dose" type="text" value={values.dose ?? ''} onChange={(e) => setValues({ ...values, dose: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="route">Route</Label>
        <Input id="route" type="text" value={values.route ?? ''} onChange={(e) => setValues({ ...values, route: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="administered_at">Administered At</Label>
        <Input id="administered_at" type="date" value={values.administered_at ?? ''} onChange={(e) => setValues({ ...values, administered_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
