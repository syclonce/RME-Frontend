import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useProcedureConsentPatientAcknowledgementResource } from '../api'
import type { ProcedureConsentPatientAcknowledgementFormValues } from '../types'

export function ProcedureConsentPatientAcknowledgementFormPage() {
  const navigate = useNavigate()
  const { create } = useProcedureConsentPatientAcknowledgementResource()
  const [values, setValues] = useState<ProcedureConsentPatientAcknowledgementFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-procedure-consent-patient-acknowledgement') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ProcedureConsentPatientAcknowledgement</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="consent_id">Consent *</Label>
        <RelationSelect
          endpoint="/doctor-procedure-consents"
          value={values.consent_id ?? null}
          onChange={(v) => setValues({ ...values, consent_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="acknowledger_name">Acknowledger Name *</Label>
        <Input id="acknowledger_name" type="text" value={values.acknowledger_name ?? ''} onChange={(e) => setValues({ ...values, acknowledger_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="relationship_to_patient">Relationship To Patient</Label>
        <Input id="relationship_to_patient" type="text" value={values.relationship_to_patient ?? ''} onChange={(e) => setValues({ ...values, relationship_to_patient: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="decision">Decision *</Label>
        <Input id="decision" type="text" value={values.decision ?? ''} onChange={(e) => setValues({ ...values, decision: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="signed_at">Signed At</Label>
        <Input id="signed_at" type="date" value={values.signed_at ?? ''} onChange={(e) => setValues({ ...values, signed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
