import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useApplicantResource } from '../api'
import type { ApplicantFormValues } from '../types'

export function ApplicantFormPage() {
  const { create } = useApplicantResource()
  const [values, setValues] = useState<ApplicantFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Applicant</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="registration_id">Registration *</Label>
        <Input id="registration_id" type="number" value={values.registration_id ?? ''} onChange={(e) => setValues({ ...values, registration_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="full_name">Full Name *</Label>
        <Input id="full_name" type="text" value={values.full_name ?? ''} onChange={(e) => setValues({ ...values, full_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="relationship_to_patient">Relationship To Patient *</Label>
        <Input id="relationship_to_patient" type="text" value={values.relationship_to_patient ?? ''} onChange={(e) => setValues({ ...values, relationship_to_patient: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="identity_number">Identity Number</Label>
        <Input id="identity_number" type="text" value={values.identity_number ?? ''} onChange={(e) => setValues({ ...values, identity_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input id="phone_number" type="text" value={values.phone_number ?? ''} onChange={(e) => setValues({ ...values, phone_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="address">Address</Label>
        <Input id="address" type="text" value={values.address ?? ''} onChange={(e) => setValues({ ...values, address: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="application_type">Application Type *</Label>
        <Input id="application_type" type="text" value={values.application_type ?? ''} onChange={(e) => setValues({ ...values, application_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="application_date">Application Date</Label>
        <Input id="application_date" type="date" value={values.application_date ?? ''} onChange={(e) => setValues({ ...values, application_date: e.target.value })} />
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
