import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useOxygenUsageResource } from '../api'
import type { OxygenUsageFormValues } from '../types'

export function OxygenUsageFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useOxygenUsageResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<OxygenUsageFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as OxygenUsageFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-oxygen-usage') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-oxygen-usage') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} OxygenUsage</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="flow_rate_lpm">Flow Rate Lpm *</Label>
        <Input id="flow_rate_lpm" type="number" value={values.flow_rate_lpm ?? ''} onChange={(e) => setValues({ ...values, flow_rate_lpm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="method">Method *</Label>
        <Input id="method" type="text" value={values.method ?? ''} onChange={(e) => setValues({ ...values, method: e.target.value })} />
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
        <Label htmlFor="recorded_by">Recorded By</Label>
        <RelationSelect
          endpoint="/users"
          value={values.recorded_by ?? null}
          onChange={(v) => setValues({ ...values, recorded_by: v })}
        />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
