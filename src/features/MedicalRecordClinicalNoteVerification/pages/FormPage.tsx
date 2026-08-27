import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useClinicalNoteVerificationResource } from '../api'
import type { ClinicalNoteVerificationFormValues } from '../types'

export function ClinicalNoteVerificationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useClinicalNoteVerificationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ClinicalNoteVerificationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ClinicalNoteVerificationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-clinical-note-verification') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-clinical-note-verification') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ClinicalNoteVerification</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="clinical_note_id">Clinical Note *</Label>
        <RelationSelect
          endpoint="/clinical-notes"
          value={values.clinical_note_id ?? null}
          onChange={(v) => setValues({ ...values, clinical_note_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="verifier_doctor_id">Verifier Doctor *</Label>
        <RelationSelect
          endpoint="/doctors"
          value={values.verifier_doctor_id ?? null}
          onChange={(v) => setValues({ ...values, verifier_doctor_id: v })}
        />
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
