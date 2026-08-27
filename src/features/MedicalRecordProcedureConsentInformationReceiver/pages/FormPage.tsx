import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useProcedureConsentInformationReceiverResource } from '../api'
import type { ProcedureConsentInformationReceiverFormValues } from '../types'

export function ProcedureConsentInformationReceiverFormPage() {
  const navigate = useNavigate()
  const { create } = useProcedureConsentInformationReceiverResource()
  const [values, setValues] = useState<ProcedureConsentInformationReceiverFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-procedure-consent-information-receiver') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ProcedureConsentInformationReceiver</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="consent_id">Consent *</Label>
        <RelationSelect
          endpoint="/doctor-procedure-consents"
          value={values.consent_id ?? null}
          onChange={(v) => setValues({ ...values, consent_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="receiver_name">Receiver Name *</Label>
        <Input id="receiver_name" type="text" value={values.receiver_name ?? ''} onChange={(e) => setValues({ ...values, receiver_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="receiver_relationship">Receiver Relationship</Label>
        <Input id="receiver_relationship" type="text" value={values.receiver_relationship ?? ''} onChange={(e) => setValues({ ...values, receiver_relationship: e.target.value })} />
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
