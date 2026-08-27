import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useImmunizationVaccinationResource } from '../api'
import type { ImmunizationVaccinationFormValues } from '../types'

export function ImmunizationVaccinationFormPage() {
  const { create } = useImmunizationVaccinationResource()
  const [values, setValues] = useState<ImmunizationVaccinationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ImmunizationVaccination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="vaccine_name">Vaccine Name *</Label>
        <Input id="vaccine_name" type="text" value={values.vaccine_name ?? ''} onChange={(e) => setValues({ ...values, vaccine_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dose_number">Dose Number</Label>
        <Input id="dose_number" type="number" value={values.dose_number ?? ''} onChange={(e) => setValues({ ...values, dose_number: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="batch_number">Batch Number</Label>
        <Input id="batch_number" type="text" value={values.batch_number ?? ''} onChange={(e) => setValues({ ...values, batch_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="administered_at">Administered At *</Label>
        <Input id="administered_at" type="date" value={values.administered_at ?? ''} onChange={(e) => setValues({ ...values, administered_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="administered_by">Administered By *</Label>
        <Input id="administered_by" type="number" value={values.administered_by ?? ''} onChange={(e) => setValues({ ...values, administered_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="site">Site</Label>
        <Input id="site" type="text" value={values.site ?? ''} onChange={(e) => setValues({ ...values, site: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="route">Route</Label>
        <Input id="route" type="text" value={values.route ?? ''} onChange={(e) => setValues({ ...values, route: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="adverse_reaction">Adverse Reaction</Label>
        <Input id="adverse_reaction" type="text" value={values.adverse_reaction ?? ''} onChange={(e) => setValues({ ...values, adverse_reaction: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
