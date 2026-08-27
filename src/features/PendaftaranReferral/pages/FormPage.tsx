import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useReferralResource } from '../api'
import type { ReferralFormValues } from '../types'

export function ReferralFormPage() {
  const { create } = useReferralResource()
  const [values, setValues] = useState<ReferralFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Referral</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="direction">Direction *</Label>
        <Input id="direction" type="text" value={values.direction ?? ''} onChange={(e) => setValues({ ...values, direction: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="facility_name">Facility Name *</Label>
        <Input id="facility_name" type="text" value={values.facility_name ?? ''} onChange={(e) => setValues({ ...values, facility_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="referred_at">Referred At</Label>
        <Input id="referred_at" type="date" value={values.referred_at ?? ''} onChange={(e) => setValues({ ...values, referred_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
