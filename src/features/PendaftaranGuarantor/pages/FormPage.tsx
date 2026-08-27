import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGuarantorResource } from '../api'
import type { GuarantorFormValues } from '../types'

export function GuarantorFormPage() {
  const { create } = useGuarantorResource()
  const [values, setValues] = useState<GuarantorFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Guarantor</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="registration_id">Registration *</Label>
        <Input id="registration_id" type="number" value={values.registration_id ?? ''} onChange={(e) => setValues({ ...values, registration_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
        <Input id="room_class_id" type="number" value={values.room_class_id ?? ''} onChange={(e) => setValues({ ...values, room_class_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reference_letter_number">Reference Letter Number</Label>
        <Input id="reference_letter_number" type="text" value={values.reference_letter_number ?? ''} onChange={(e) => setValues({ ...values, reference_letter_number: e.target.value })} />
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
