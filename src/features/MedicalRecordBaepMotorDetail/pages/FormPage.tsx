import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBaepMotorDetailResource } from '../api'
import type { BaepMotorDetailFormValues } from '../types'

export function BaepMotorDetailFormPage() {
  const { create } = useBaepMotorDetailResource()
  const [values, setValues] = useState<BaepMotorDetailFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BaepMotorDetail</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="baep_protocol_id">Baep Protocol *</Label>
        <Input id="baep_protocol_id" type="number" value={values.baep_protocol_id ?? ''} onChange={(e) => setValues({ ...values, baep_protocol_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="muscle_strength_score">Muscle Strength Score</Label>
        <Input id="muscle_strength_score" type="number" value={values.muscle_strength_score ?? ''} onChange={(e) => setValues({ ...values, muscle_strength_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="spasticity_level">Spasticity Level</Label>
        <Input id="spasticity_level" type="text" value={values.spasticity_level ?? ''} onChange={(e) => setValues({ ...values, spasticity_level: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gait_status">Gait Status</Label>
        <Input id="gait_status" type="text" value={values.gait_status ?? ''} onChange={(e) => setValues({ ...values, gait_status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
