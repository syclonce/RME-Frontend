import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useReferralLetterResource } from '../api'
import type { ReferralLetterFormValues } from '../types'

export function ReferralLetterFormPage() {
  const navigate = useNavigate()
  const { create } = useReferralLetterResource()
  const [values, setValues] = useState<ReferralLetterFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-referral-letter') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ReferralLetter</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="from_department_id">From Department *</Label>
        <RelationSelect
          endpoint="/medical-departments"
          value={values.from_department_id ?? null}
          onChange={(v) => setValues({ ...values, from_department_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="to_department_id">To Department *</Label>
        <RelationSelect
          endpoint="/medical-departments"
          value={values.to_department_id ?? null}
          onChange={(v) => setValues({ ...values, to_department_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="issued_at">Issued At</Label>
        <Input id="issued_at" type="date" value={values.issued_at ?? ''} onChange={(e) => setValues({ ...values, issued_at: e.target.value })} />
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
