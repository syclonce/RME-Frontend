import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useGuarantorResource } from '../api'
import type { GuarantorFormValues } from '../types'

export function GuarantorFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useGuarantorResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<GuarantorFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as GuarantorFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pendaftaran-guarantor') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-guarantor') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Guarantor</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="registration_id">Registration *</Label>
        <RelationSelect
          endpoint="/registrations"
          value={values.registration_id ?? null}
          onChange={(v) => setValues({ ...values, registration_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="payer_type">Payer Type *</Label>
        <Input id="payer_type" type="text" value={values.payer_type ?? ''} onChange={(e) => setValues({ ...values, payer_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="member_number">Member Number</Label>
        <Input id="member_number" type="text" value={values.member_number ?? ''} onChange={(e) => setValues({ ...values, member_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="room_class_id">Room Class</Label>
        <RelationSelect
          endpoint="/room-classes"
          value={values.room_class_id ?? null}
          onChange={(v) => setValues({ ...values, room_class_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reference_letter_number">Reference Letter Number</Label>
        <Input id="reference_letter_number" type="text" value={values.reference_letter_number ?? ''} onChange={(e) => setValues({ ...values, reference_letter_number: e.target.value })} />
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
