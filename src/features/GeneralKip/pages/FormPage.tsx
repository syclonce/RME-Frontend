import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useKipResource } from '../api'
import type { KipFormValues } from '../types'

export function KipFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useKipResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<KipFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as KipFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-kip') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-kip') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Kip</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_norm">Patient Norm *</Label>
        <Input id="patient_norm" type="text" value={values.patient_norm ?? ''} onChange={(e) => setValues({ ...values, patient_norm: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="card_type">Card Type *</Label>
        <Input id="card_type" type="text" value={values.card_type ?? ''} onChange={(e) => setValues({ ...values, card_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="card_number">Card Number *</Label>
        <Input id="card_number" type="text" value={values.card_number ?? ''} onChange={(e) => setValues({ ...values, card_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="address">Address</Label>
        <Input id="address" type="text" value={values.address ?? ''} onChange={(e) => setValues({ ...values, address: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="rt">Rt</Label>
        <Input id="rt" type="text" value={values.rt ?? ''} onChange={(e) => setValues({ ...values, rt: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="rw">Rw</Label>
        <Input id="rw" type="text" value={values.rw ?? ''} onChange={(e) => setValues({ ...values, rw: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="postal_code">Postal Code</Label>
        <Input id="postal_code" type="text" value={values.postal_code ?? ''} onChange={(e) => setValues({ ...values, postal_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="region_code">Region Code</Label>
        <Input id="region_code" type="text" value={values.region_code ?? ''} onChange={(e) => setValues({ ...values, region_code: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
