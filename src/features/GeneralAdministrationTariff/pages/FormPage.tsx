import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAdministrationTariffResource } from '../api'
import type { AdministrationTariffFormValues } from '../types'

export function AdministrationTariffFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useAdministrationTariffResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<AdministrationTariffFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as AdministrationTariffFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-administration-tariff') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-administration-tariff') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} AdministrationTariff</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="administration_id">Administration</Label>
        <Input id="administration_id" type="number" value={values.administration_id ?? ''} onChange={(e) => setValues({ ...values, administration_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="room_class_id">Room Class</Label>
        <Input id="room_class_id" type="number" value={values.room_class_id ?? ''} onChange={(e) => setValues({ ...values, room_class_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="price">Price *</Label>
        <Input id="price" type="number" value={values.price ?? ''} onChange={(e) => setValues({ ...values, price: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="effective_date">Effective Date</Label>
        <Input id="effective_date" type="date" value={values.effective_date ?? ''} onChange={(e) => setValues({ ...values, effective_date: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
