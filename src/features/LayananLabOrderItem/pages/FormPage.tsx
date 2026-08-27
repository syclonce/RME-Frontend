import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useLabOrderItemResource } from '../api'
import type { LabOrderItemFormValues } from '../types'

export function LabOrderItemFormPage() {
  const navigate = useNavigate()
  const { create } = useLabOrderItemResource()
  const [values, setValues] = useState<LabOrderItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-lab-order-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah LabOrderItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_order_id">Lab Order *</Label>
        <AsyncCombobox
          endpoint="/lab-orders"
          value={values.lab_order_id ?? null}
          onChange={(v) => setValues({ ...values, lab_order_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examination_name">Examination Name *</Label>
        <Input id="examination_name" type="text" value={values.examination_name ?? ''} onChange={(e) => setValues({ ...values, examination_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id">Item</Label>
        <RelationSelect
          endpoint="/items"
          value={values.item_id ?? null}
          onChange={(v) => setValues({ ...values, item_id: v })}
        />
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
