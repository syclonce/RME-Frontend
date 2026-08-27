import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBloodTransfusionDetailResource } from '../api'
import type { BloodTransfusionDetailFormValues } from '../types'

export function BloodTransfusionDetailFormPage() {
  const { create } = useBloodTransfusionDetailResource()
  const [values, setValues] = useState<BloodTransfusionDetailFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BloodTransfusionDetail</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="transfusion_id">Transfusion *</Label>
        <Input id="transfusion_id" type="number" value={values.transfusion_id ?? ''} onChange={(e) => setValues({ ...values, transfusion_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_bag_number">Blood Bag Number *</Label>
        <Input id="blood_bag_number" type="text" value={values.blood_bag_number ?? ''} onChange={(e) => setValues({ ...values, blood_bag_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_type">Blood Type</Label>
        <Input id="blood_type" type="text" value={values.blood_type ?? ''} onChange={(e) => setValues({ ...values, blood_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="volume_ml">Volume Ml *</Label>
        <Input id="volume_ml" type="number" value={values.volume_ml ?? ''} onChange={(e) => setValues({ ...values, volume_ml: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="start_time">Start Time</Label>
        <Input id="start_time" type="date" value={values.start_time ?? ''} onChange={(e) => setValues({ ...values, start_time: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="end_time">End Time</Label>
        <Input id="end_time" type="date" value={values.end_time ?? ''} onChange={(e) => setValues({ ...values, end_time: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reaction_observed">Reaction Observed</Label>
        <Input id="reaction_observed" type="text" value={values.reaction_observed ?? ''} onChange={(e) => setValues({ ...values, reaction_observed: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
