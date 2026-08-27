import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePrescriptionFulfillmentItemResource } from '../api'
import type { PrescriptionFulfillmentItemFormValues } from '../types'

export function PrescriptionFulfillmentItemFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePrescriptionFulfillmentItemResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PrescriptionFulfillmentItemFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PrescriptionFulfillmentItemFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-prescription-fulfillment-item') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-prescription-fulfillment-item') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PrescriptionFulfillmentItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_fulfillment_id">Prescription Fulfillment *</Label>
        <RelationSelect
          endpoint="/prescription-fulfillments"
          value={values.prescription_fulfillment_id ?? null}
          onChange={(v) => setValues({ ...values, prescription_fulfillment_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_item_id">Prescription Item *</Label>
        <RelationSelect
          endpoint="/prescription-items"
          value={values.prescription_item_id ?? null}
          onChange={(v) => setValues({ ...values, prescription_item_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantity_served">Quantity Served *</Label>
        <Input id="quantity_served" type="number" value={values.quantity_served ?? ''} onChange={(e) => setValues({ ...values, quantity_served: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_substituted" checked={!!values.is_substituted} onCheckedChange={(v) => setValues({ ...values, is_substituted: !!v })} />
        <Label htmlFor="is_substituted">Is Substituted</Label>
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
