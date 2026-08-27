import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useWardResource } from '../api'
import type { WardFormValues } from '../types'

export function WardFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useWardResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<WardFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as WardFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-ward') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-ward') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Ward</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="type_id">Type</Label>
        <Input id="type_id" type="number" value={values.type_id ?? ''} onChange={(e) => setValues({ ...values, type_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_type_id">Visit Type</Label>
        <Input id="visit_type_id" type="number" value={values.visit_type_id ?? ''} onChange={(e) => setValues({ ...values, visit_type_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="allows_request" checked={!!values.allows_request} onCheckedChange={(v) => setValues({ ...values, allows_request: !!v })} />
        <Label htmlFor="allows_request">Allows Request</Label>
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
