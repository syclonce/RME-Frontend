import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useBaepMotorDetailResource } from '../api'
import type { BaepMotorDetailFormValues } from '../types'

export function BaepMotorDetailFormPage() {
  const navigate = useNavigate()
  const { create } = useBaepMotorDetailResource()
  const [values, setValues] = useState<BaepMotorDetailFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-baep-motor-detail') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BaepMotorDetail</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="baep_protocol_id">Baep Protocol *</Label>
        <RelationSelect
          endpoint="/baep-intervention-protocols"
          value={values.baep_protocol_id ?? null}
          onChange={(v) => setValues({ ...values, baep_protocol_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="muscle_strength_score">Muscle Strength Score</Label>
        <Input id="muscle_strength_score" type="number" value={values.muscle_strength_score ?? ''} onChange={(e) => setValues({ ...values, muscle_strength_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="spasticity_level">Spasticity Level</Label>
        <Select value={values.spasticity_level ?? ''} onValueChange={(v) => setValues({ ...values, spasticity_level: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="0" value="0">0</SelectItem>
            <SelectItem key="1" value="1">1</SelectItem>
            <SelectItem key="1+" value="1+">1+</SelectItem>
            <SelectItem key="2" value="2">2</SelectItem>
            <SelectItem key="3" value="3">3</SelectItem>
            <SelectItem key="4" value="4">4</SelectItem>
          </SelectContent>
        </Select>
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
