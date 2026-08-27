import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePrescriptionFulfillmentResource } from '../api'
import type { PrescriptionFulfillmentFormValues } from '../types'

export function PrescriptionFulfillmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePrescriptionFulfillmentResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PrescriptionFulfillmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PrescriptionFulfillmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-prescription-fulfillment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-prescription-fulfillment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PrescriptionFulfillment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_id">Prescription *</Label>
        <RelationSelect
          endpoint="/prescriptions"
          value={values.prescription_id ?? null}
          onChange={(v) => setValues({ ...values, prescription_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="served_by">Served By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.served_by ?? null}
          onChange={(v) => setValues({ ...values, served_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="served_at">Served At *</Label>
        <Input id="served_at" type="date" value={values.served_at ?? ''} onChange={(e) => setValues({ ...values, served_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
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
