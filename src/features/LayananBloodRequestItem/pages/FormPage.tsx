import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBloodRequestItemResource } from '../api'
import type { BloodRequestItemFormValues } from '../types'

export function BloodRequestItemFormPage() {
  const { create } = useBloodRequestItemResource()
  const [values, setValues] = useState<BloodRequestItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BloodRequestItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_transfusion_id">Blood Transfusion *</Label>
        <Input id="blood_transfusion_id" type="number" value={values.blood_transfusion_id ?? ''} onChange={(e) => setValues({ ...values, blood_transfusion_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_component">Blood Component *</Label>
        <Input id="blood_component" type="text" value={values.blood_component ?? ''} onChange={(e) => setValues({ ...values, blood_component: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_type">Blood Type</Label>
        <Input id="blood_type" type="text" value={values.blood_type ?? ''} onChange={(e) => setValues({ ...values, blood_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bag_quantity">Bag Quantity *</Label>
        <Input id="bag_quantity" type="number" value={values.bag_quantity ?? ''} onChange={(e) => setValues({ ...values, bag_quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="cross_match_result">Cross Match Result</Label>
        <Input id="cross_match_result" type="text" value={values.cross_match_result ?? ''} onChange={(e) => setValues({ ...values, cross_match_result: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
