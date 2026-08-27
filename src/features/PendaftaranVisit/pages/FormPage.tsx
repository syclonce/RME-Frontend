import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useVisitResource } from '../api'
import type { VisitFormValues } from '../types'

export function VisitFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useVisitResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<VisitFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as VisitFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pendaftaran-visit') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-visit') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Visit</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_number">Visit Number</Label>
        <Input id="visit_number" type="text" value={values.visit_number ?? ''} onChange={(e) => setValues({ ...values, visit_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="registration_id">Registration *</Label>
        <Input id="registration_id" type="number" value={values.registration_id ?? ''} onChange={(e) => setValues({ ...values, registration_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="attending_physician_id">Attending Physician</Label>
        <Input id="attending_physician_id" type="number" value={values.attending_physician_id ?? ''} onChange={(e) => setValues({ ...values, attending_physician_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward</Label>
        <Input id="ward_id" type="number" value={values.ward_id ?? ''} onChange={(e) => setValues({ ...values, ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bed_id">Bed</Label>
        <Input id="bed_id" type="number" value={values.bed_id ?? ''} onChange={(e) => setValues({ ...values, bed_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="admitted_at">Admitted At</Label>
        <Input id="admitted_at" type="date" value={values.admitted_at ?? ''} onChange={(e) => setValues({ ...values, admitted_at: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_new_visit" checked={!!values.is_new_visit} onCheckedChange={(v) => setValues({ ...values, is_new_visit: !!v })} />
        <Label htmlFor="is_new_visit">Is New Visit</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_deposit" checked={!!values.is_deposit} onCheckedChange={(v) => setValues({ ...values, is_deposit: !!v })} />
        <Label htmlFor="is_deposit">Is Deposit</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="deposit_class_id">Deposit Class</Label>
        <Input id="deposit_class_id" type="number" value={values.deposit_class_id ?? ''} onChange={(e) => setValues({ ...values, deposit_class_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
