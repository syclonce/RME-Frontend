import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePharmacyTariffByRoomClassResource } from '../api'
import type { PharmacyTariffByRoomClassFormValues } from '../types'

export function PharmacyTariffByRoomClassFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePharmacyTariffByRoomClassResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PharmacyTariffByRoomClassFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PharmacyTariffByRoomClassFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-pharmacy-tariff-by-room-class') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-pharmacy-tariff-by-room-class') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PharmacyTariffByRoomClass</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id">Item</Label>
        <RelationSelect
          endpoint="/items"
          value={values.item_id ?? null}
          onChange={(v) => setValues({ ...values, item_id: v })}
        />
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
