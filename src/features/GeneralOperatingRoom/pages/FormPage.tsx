import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useGeneralOperatingRoomResource } from '../api'
import type { GeneralOperatingRoomFormValues } from '../types'

export function GeneralOperatingRoomFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useGeneralOperatingRoomResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<GeneralOperatingRoomFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as GeneralOperatingRoomFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-operating-room') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-operating-room') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} GeneralOperatingRoom</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.ward_id ?? null}
          onChange={(v) => setValues({ ...values, ward_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="room_number">Room Number *</Label>
        <Input id="room_number" type="text" value={values.room_number ?? ''} onChange={(e) => setValues({ ...values, room_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="equipment_notes">Equipment Notes</Label>
        <Input id="equipment_notes" type="text" value={values.equipment_notes ?? ''} onChange={(e) => setValues({ ...values, equipment_notes: e.target.value })} />
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
