import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useReferralResource } from '../api'
import type { ReferralFormValues } from '../types'

export function ReferralFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useReferralResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ReferralFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ReferralFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pendaftaran-referral') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-referral') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Referral</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <RelationSelect
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="direction">Direction *</Label>
        <Input id="direction" type="text" value={values.direction ?? ''} onChange={(e) => setValues({ ...values, direction: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="facility_name">Facility Name *</Label>
        <Input id="facility_name" type="text" value={values.facility_name ?? ''} onChange={(e) => setValues({ ...values, facility_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="referred_at">Referred At</Label>
        <Input id="referred_at" type="date" value={values.referred_at ?? ''} onChange={(e) => setValues({ ...values, referred_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
