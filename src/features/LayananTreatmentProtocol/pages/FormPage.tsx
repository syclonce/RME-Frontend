import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useTreatmentProtocolResource } from '../api'
import type { TreatmentProtocolFormValues } from '../types'

export function TreatmentProtocolFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useTreatmentProtocolResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<TreatmentProtocolFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as TreatmentProtocolFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-treatment-protocol') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-treatment-protocol') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} TreatmentProtocol</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="protocol_name">Protocol Name *</Label>
        <Input id="protocol_name" type="text" value={values.protocol_name ?? ''} onChange={(e) => setValues({ ...values, protocol_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="prescribed_by">Prescribed By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.prescribed_by ?? null}
          onChange={(v) => setValues({ ...values, prescribed_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="started_at">Started At *</Label>
        <Input id="started_at" type="date" value={values.started_at ?? ''} onChange={(e) => setValues({ ...values, started_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ended_at">Ended At</Label>
        <Input id="ended_at" type="date" value={values.ended_at ?? ''} onChange={(e) => setValues({ ...values, ended_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <AsyncCombobox
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
