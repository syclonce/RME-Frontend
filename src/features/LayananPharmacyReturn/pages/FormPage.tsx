import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePharmacyReturnResource } from '../api'
import type { PharmacyReturnFormValues } from '../types'

export function PharmacyReturnFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePharmacyReturnResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PharmacyReturnFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PharmacyReturnFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-pharmacy-return') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-pharmacy-return') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PharmacyReturn</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_item_id">Prescription Item *</Label>
        <RelationSelect
          endpoint="/prescription-items"
          value={values.prescription_item_id ?? null}
          onChange={(v) => setValues({ ...values, prescription_item_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantity_returned">Quantity Returned *</Label>
        <Input id="quantity_returned" type="number" value={values.quantity_returned ?? ''} onChange={(e) => setValues({ ...values, quantity_returned: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason *</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="returned_by">Returned By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.returned_by ?? null}
          onChange={(v) => setValues({ ...values, returned_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="returned_at">Returned At *</Label>
        <Input id="returned_at" type="date" value={values.returned_at ?? ''} onChange={(e) => setValues({ ...values, returned_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
