import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useCriticalLabValueResource } from '../api'
import type { CriticalLabValueFormValues } from '../types'

export function CriticalLabValueFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useCriticalLabValueResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<CriticalLabValueFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as CriticalLabValueFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-critical-lab-value') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-critical-lab-value') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} CriticalLabValue</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_order_id">Lab Order *</Label>
        <AsyncCombobox
          endpoint="/lab-orders"
          value={values.lab_order_id ?? null}
          onChange={(v) => setValues({ ...values, lab_order_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="parameter_name">Parameter Name *</Label>
        <Input id="parameter_name" type="text" value={values.parameter_name ?? ''} onChange={(e) => setValues({ ...values, parameter_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="critical_value">Critical Value *</Label>
        <Input id="critical_value" type="text" value={values.critical_value ?? ''} onChange={(e) => setValues({ ...values, critical_value: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notified_to">Notified To</Label>
        <Input id="notified_to" type="text" value={values.notified_to ?? ''} onChange={(e) => setValues({ ...values, notified_to: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notified_at">Notified At</Label>
        <Input id="notified_at" type="date" value={values.notified_at ?? ''} onChange={(e) => setValues({ ...values, notified_at: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="acknowledged" checked={!!values.acknowledged} onCheckedChange={(v) => setValues({ ...values, acknowledged: !!v })} />
        <Label htmlFor="acknowledged">Acknowledged</Label>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
