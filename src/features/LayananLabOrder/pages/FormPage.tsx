import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useLabOrderResource } from '../api'
import type { LabOrderFormValues } from '../types'

export function LabOrderFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useLabOrderResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<LabOrderFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as LabOrderFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-lab-order') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-lab-order') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} LabOrder</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="order_number">Order Number</Label>
        <Input id="order_number" type="text" value={values.order_number ?? ''} onChange={(e) => setValues({ ...values, order_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ordered_by">Ordered By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.ordered_by ?? null}
          onChange={(v) => setValues({ ...values, ordered_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ordered_at">Ordered At</Label>
        <Input id="ordered_at" type="date" value={values.ordered_at ?? ''} onChange={(e) => setValues({ ...values, ordered_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="destination">Destination</Label>
        <Input id="destination" type="text" value={values.destination ?? ''} onChange={(e) => setValues({ ...values, destination: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_emergency" checked={!!values.is_emergency} onCheckedChange={(v) => setValues({ ...values, is_emergency: !!v })} />
        <Label htmlFor="is_emergency">Is Emergency</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
