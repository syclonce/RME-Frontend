import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useAntimicrobialStewardshipApprovalResource } from '../api'
import type { AntimicrobialStewardshipApprovalFormValues } from '../types'

export function AntimicrobialStewardshipApprovalFormPage() {
  const navigate = useNavigate()
  const { create } = useAntimicrobialStewardshipApprovalResource()
  const [values, setValues] = useState<AntimicrobialStewardshipApprovalFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-antimicrobial-stewardship-approval') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AntimicrobialStewardshipApproval</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="antimicrobial_stewardship_form_id">Antimicrobial Stewardship Form *</Label>
        <RelationSelect
          endpoint="/antimicrobial-stewardship-forms"
          value={values.antimicrobial_stewardship_form_id ?? null}
          onChange={(v) => setValues({ ...values, antimicrobial_stewardship_form_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="approved_by">Approved By</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.approved_by ?? null}
          onChange={(v) => setValues({ ...values, approved_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="decision">Decision *</Label>
        <Input id="decision" type="text" value={values.decision ?? ''} onChange={(e) => setValues({ ...values, decision: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="decision_note">Decision Note</Label>
        <Input id="decision_note" type="text" value={values.decision_note ?? ''} onChange={(e) => setValues({ ...values, decision_note: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="decided_at">Decided At *</Label>
        <Input id="decided_at" type="date" value={values.decided_at ?? ''} onChange={(e) => setValues({ ...values, decided_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
