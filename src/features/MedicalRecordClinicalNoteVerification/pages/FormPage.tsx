import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useClinicalNoteVerificationResource } from '../api'
import type { ClinicalNoteVerificationFormValues } from '../types'

export function ClinicalNoteVerificationFormPage() {
  const { create } = useClinicalNoteVerificationResource()
  const [values, setValues] = useState<ClinicalNoteVerificationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ClinicalNoteVerification</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="clinical_note_id">Clinical Note *</Label>
        <Input id="clinical_note_id" type="number" value={values.clinical_note_id ?? ''} onChange={(e) => setValues({ ...values, clinical_note_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="verifier_doctor_id">Verifier Doctor *</Label>
        <Input id="verifier_doctor_id" type="number" value={values.verifier_doctor_id ?? ''} onChange={(e) => setValues({ ...values, verifier_doctor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="verification_status">Verification Status</Label>
        <Input id="verification_status" type="text" value={values.verification_status ?? ''} onChange={(e) => setValues({ ...values, verification_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="verified_at">Verified At *</Label>
        <Input id="verified_at" type="date" value={values.verified_at ?? ''} onChange={(e) => setValues({ ...values, verified_at: e.target.value })} />
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
