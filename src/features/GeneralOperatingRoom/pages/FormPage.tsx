import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGeneralOperatingRoomResource } from '../api'
import type { GeneralOperatingRoomFormValues } from '../types'

export function GeneralOperatingRoomFormPage() {
  const { create } = useGeneralOperatingRoomResource()
  const [values, setValues] = useState<GeneralOperatingRoomFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah GeneralOperatingRoom</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <Input id="ward_id" type="number" value={values.ward_id ?? ''} onChange={(e) => setValues({ ...values, ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
