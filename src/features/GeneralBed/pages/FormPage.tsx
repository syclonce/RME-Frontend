import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBedResource } from '../api'
import type { BedFormValues } from '../types'

export function BedFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useBedResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<BedFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as BedFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-bed') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-bed') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Bed</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="room_id">Room *</Label>
        <Input id="room_id" type="number" value={values.room_id ?? ''} onChange={(e) => setValues({ ...values, room_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bed_number">Bed Number *</Label>
        <Input id="bed_number" type="text" value={values.bed_number ?? ''} onChange={(e) => setValues({ ...values, bed_number: e.target.value })} />
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
