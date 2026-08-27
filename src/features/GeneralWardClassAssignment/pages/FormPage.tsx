import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGeneralWardClassAssignmentResource } from '../api'
import type { GeneralWardClassAssignmentFormValues } from '../types'

export function GeneralWardClassAssignmentFormPage() {
  const { create } = useGeneralWardClassAssignmentResource()
  const [values, setValues] = useState<GeneralWardClassAssignmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah GeneralWardClassAssignment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <Input id="ward_id" type="number" value={values.ward_id ?? ''} onChange={(e) => setValues({ ...values, ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="room_class_id">Room Class *</Label>
        <Input id="room_class_id" type="number" value={values.room_class_id ?? ''} onChange={(e) => setValues({ ...values, room_class_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
