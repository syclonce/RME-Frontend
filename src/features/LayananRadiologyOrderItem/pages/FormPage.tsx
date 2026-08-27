import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useRadiologyOrderItemResource } from '../api'
import type { RadiologyOrderItemFormValues } from '../types'

export function RadiologyOrderItemFormPage() {
  const navigate = useNavigate()
  const { create } = useRadiologyOrderItemResource()
  const [values, setValues] = useState<RadiologyOrderItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-radiology-order-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah RadiologyOrderItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="radiology_order_id">Radiology Order *</Label>
        <AsyncCombobox
          endpoint="/radiology-orders"
          value={values.radiology_order_id ?? null}
          onChange={(v) => setValues({ ...values, radiology_order_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examination_name">Examination Name *</Label>
        <Input id="examination_name" type="text" value={values.examination_name ?? ''} onChange={(e) => setValues({ ...values, examination_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="body_part">Body Part</Label>
        <Input id="body_part" type="text" value={values.body_part ?? ''} onChange={(e) => setValues({ ...values, body_part: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="price">Price</Label>
        <Input id="price" type="number" value={values.price ?? ''} onChange={(e) => setValues({ ...values, price: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
