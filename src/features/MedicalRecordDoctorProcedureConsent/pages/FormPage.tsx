import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useDoctorProcedureConsentResource } from '../api'
import type { DoctorProcedureConsentFormValues } from '../types'

export function DoctorProcedureConsentFormPage() {
  const navigate = useNavigate()
  const { create } = useDoctorProcedureConsentResource()
  const [values, setValues] = useState<DoctorProcedureConsentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-doctor-procedure-consent') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah DoctorProcedureConsent</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="doctor_id">Doctor *</Label>
        <RelationSelect
          endpoint="/doctors"
          value={values.doctor_id ?? null}
          onChange={(v) => setValues({ ...values, doctor_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <AsyncCombobox
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="procedure_name">Procedure Name *</Label>
        <Input id="procedure_name" type="text" value={values.procedure_name ?? ''} onChange={(e) => setValues({ ...values, procedure_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="indication">Indication</Label>
        <Input id="indication" type="text" value={values.indication ?? ''} onChange={(e) => setValues({ ...values, indication: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="consent_decision">Consent Decision</Label>
        <Select value={values.consent_decision ?? ''} onValueChange={(v) => setValues({ ...values, consent_decision: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="pending" value="pending">Pending</SelectItem>
            <SelectItem key="agree" value="agree">Agree</SelectItem>
            <SelectItem key="refuse" value="refuse">Refuse</SelectItem>
          </SelectContent>
        </Select>
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
