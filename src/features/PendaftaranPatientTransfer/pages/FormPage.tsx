import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { usePatientTransferResource } from '../api'
import type { PatientTransferFormValues } from '../types'

export function PatientTransferFormPage() {
  const navigate = useNavigate()
  const { create } = usePatientTransferResource()
  const [values, setValues] = useState<PatientTransferFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-patient-transfer') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PatientTransfer</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="from_ward_id">From Ward *</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.from_ward_id ?? null}
          onChange={(v) => setValues({ ...values, from_ward_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="to_ward_id">To Ward *</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.to_ward_id ?? null}
          onChange={(v) => setValues({ ...values, to_ward_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="transferred_at">Transferred At</Label>
        <Input id="transferred_at" type="date" value={values.transferred_at ?? ''} onChange={(e) => setValues({ ...values, transferred_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
