import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBaepDysphagiaDetailResource } from '../api'
import type { BaepDysphagiaDetailFormValues } from '../types'

export function BaepDysphagiaDetailFormPage() {
  const { create } = useBaepDysphagiaDetailResource()
  const [values, setValues] = useState<BaepDysphagiaDetailFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BaepDysphagiaDetail</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="baep_protocol_id">Baep Protocol *</Label>
        <Input id="baep_protocol_id" type="number" value={values.baep_protocol_id ?? ''} onChange={(e) => setValues({ ...values, baep_protocol_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="swallowing_test_used">Swallowing Test Used</Label>
        <Input id="swallowing_test_used" type="text" value={values.swallowing_test_used ?? ''} onChange={(e) => setValues({ ...values, swallowing_test_used: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="severity_level">Severity Level</Label>
        <Input id="severity_level" type="text" value={values.severity_level ?? ''} onChange={(e) => setValues({ ...values, severity_level: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="aspiration_risk" checked={!!values.aspiration_risk} onCheckedChange={(v) => setValues({ ...values, aspiration_risk: !!v })} />
        <Label htmlFor="aspiration_risk">Aspiration Risk</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diet_texture_recommendation">Diet Texture Recommendation</Label>
        <Input id="diet_texture_recommendation" type="text" value={values.diet_texture_recommendation ?? ''} onChange={(e) => setValues({ ...values, diet_texture_recommendation: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
