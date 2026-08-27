import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useWardQueueResource } from '../api'
import type { WardQueueFormValues } from '../types'

export function WardQueueFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useWardQueueResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<WardQueueFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as WardQueueFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pendaftaran-ward-queue') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-ward-queue') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} WardQueue</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.ward_id ?? null}
          onChange={(v) => setValues({ ...values, ward_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="queue_number">Queue Number *</Label>
        <Input id="queue_number" type="number" value={values.queue_number ?? ''} onChange={(e) => setValues({ ...values, queue_number: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
