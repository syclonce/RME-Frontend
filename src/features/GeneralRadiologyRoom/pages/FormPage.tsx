import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGeneralRadiologyRoomResource } from '../api'
import type { GeneralRadiologyRoomFormValues } from '../types'

export function GeneralRadiologyRoomFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useGeneralRadiologyRoomResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<GeneralRadiologyRoomFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as GeneralRadiologyRoomFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-radiology-room') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-radiology-room') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} GeneralRadiologyRoom</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <Input id="ward_id" type="number" value={values.ward_id ?? ''} onChange={(e) => setValues({ ...values, ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="radiology_type">Radiology Type *</Label>
        <Input id="radiology_type" type="text" value={values.radiology_type ?? ''} onChange={(e) => setValues({ ...values, radiology_type: e.target.value })} />
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
