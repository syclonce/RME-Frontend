import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePharmacyClaimResource } from '../api'
import type { PharmacyClaimFormValues } from '../types'

export function PharmacyClaimFormPage() {
  const { create } = usePharmacyClaimResource()
  const [values, setValues] = useState<PharmacyClaimFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PharmacyClaim</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="claim_file_id">Claim File *</Label>
        <Input id="claim_file_id" type="number" value={values.claim_file_id ?? ''} onChange={(e) => setValues({ ...values, claim_file_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_id">Prescription</Label>
        <Input id="prescription_id" type="number" value={values.prescription_id ?? ''} onChange={(e) => setValues({ ...values, prescription_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="submitted_at">Submitted At</Label>
        <Input id="submitted_at" type="date" value={values.submitted_at ?? ''} onChange={(e) => setValues({ ...values, submitted_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
