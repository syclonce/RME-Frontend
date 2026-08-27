import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useWardServiceResource } from '../api'
import type { WardServiceFormValues } from '../types'

export function WardServiceFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useWardServiceResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<WardServiceFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as WardServiceFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-ward-service') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-ward-service') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} WardService</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.ward_id ?? null}
          onChange={(v) => setValues({ ...values, ward_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="service_id">Service *</Label>
        <AsyncCombobox
          endpoint="/services"
          value={values.service_id ?? null}
          onChange={(v) => setValues({ ...values, service_id: v })}
        />
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
