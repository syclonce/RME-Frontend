import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useProcedureConsentInformationResource } from '../api'
import type { ProcedureConsentInformationFormValues } from '../types'

export function ProcedureConsentInformationFormPage() {
  const navigate = useNavigate()
  const { create } = useProcedureConsentInformationResource()
  const [values, setValues] = useState<ProcedureConsentInformationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-procedure-consent-information') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ProcedureConsentInformation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="consent_id">Consent *</Label>
        <RelationSelect
          endpoint="/doctor-procedure-consents"
          value={values.consent_id ?? null}
          onChange={(v) => setValues({ ...values, consent_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="explained_by">Explained By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.explained_by ?? null}
          onChange={(v) => setValues({ ...values, explained_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis_explanation">Diagnosis Explanation</Label>
        <Input id="diagnosis_explanation" type="text" value={values.diagnosis_explanation ?? ''} onChange={(e) => setValues({ ...values, diagnosis_explanation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="procedure_explanation">Procedure Explanation</Label>
        <Input id="procedure_explanation" type="text" value={values.procedure_explanation ?? ''} onChange={(e) => setValues({ ...values, procedure_explanation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="purpose">Purpose</Label>
        <Input id="purpose" type="text" value={values.purpose ?? ''} onChange={(e) => setValues({ ...values, purpose: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="risks_and_complications">Risks And Complications</Label>
        <Input id="risks_and_complications" type="text" value={values.risks_and_complications ?? ''} onChange={(e) => setValues({ ...values, risks_and_complications: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="alternative_procedures">Alternative Procedures</Label>
        <Input id="alternative_procedures" type="text" value={values.alternative_procedures ?? ''} onChange={(e) => setValues({ ...values, alternative_procedures: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="prognosis">Prognosis</Label>
        <Input id="prognosis" type="text" value={values.prognosis ?? ''} onChange={(e) => setValues({ ...values, prognosis: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="explained_at">Explained At</Label>
        <Input id="explained_at" type="date" value={values.explained_at ?? ''} onChange={(e) => setValues({ ...values, explained_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
