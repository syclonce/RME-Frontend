import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useProcedureConsentInformationGiverResource } from '../api'
import type { ProcedureConsentInformationGiverFormValues } from '../types'

export function ProcedureConsentInformationGiverFormPage() {
  const navigate = useNavigate()
  const { create } = useProcedureConsentInformationGiverResource()
  const [values, setValues] = useState<ProcedureConsentInformationGiverFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-procedure-consent-information-giver') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ProcedureConsentInformationGiver</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="consent_id">Consent *</Label>
        <RelationSelect
          endpoint="/doctor-procedure-consents"
          value={values.consent_id ?? null}
          onChange={(v) => setValues({ ...values, consent_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="giver_id">Giver *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.giver_id ?? null}
          onChange={(v) => setValues({ ...values, giver_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="giver_role">Giver Role</Label>
        <Input id="giver_role" type="text" value={values.giver_role ?? ''} onChange={(e) => setValues({ ...values, giver_role: e.target.value })} />
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
