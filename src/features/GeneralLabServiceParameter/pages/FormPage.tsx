import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLabServiceParameterResource } from '../api'
import type { LabServiceParameterFormValues } from '../types'

export function LabServiceParameterFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useLabServiceParameterResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<LabServiceParameterFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as LabServiceParameterFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-lab-service-parameter') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-lab-service-parameter') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} LabServiceParameter</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_service_group_id">Lab Service Group</Label>
        <Input id="lab_service_group_id" type="number" value={values.lab_service_group_id ?? ''} onChange={(e) => setValues({ ...values, lab_service_group_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="code">Code</Label>
        <Input id="code" type="text" value={values.code ?? ''} onChange={(e) => setValues({ ...values, code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="unit">Unit</Label>
        <Input id="unit" type="text" value={values.unit ?? ''} onChange={(e) => setValues({ ...values, unit: e.target.value })} />
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
