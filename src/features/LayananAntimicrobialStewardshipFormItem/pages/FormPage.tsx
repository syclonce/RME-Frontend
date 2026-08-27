import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAntimicrobialStewardshipFormItemResource } from '../api'
import type { AntimicrobialStewardshipFormItemFormValues } from '../types'

export function AntimicrobialStewardshipFormItemFormPage() {
  const navigate = useNavigate()
  const { create } = useAntimicrobialStewardshipFormItemResource()
  const [values, setValues] = useState<AntimicrobialStewardshipFormItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-antimicrobial-stewardship-form-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AntimicrobialStewardshipFormItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="antimicrobial_stewardship_form_id">Antimicrobial Stewardship Form *</Label>
        <Input id="antimicrobial_stewardship_form_id" type="number" value={values.antimicrobial_stewardship_form_id ?? ''} onChange={(e) => setValues({ ...values, antimicrobial_stewardship_form_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id">Item</Label>
        <Input id="item_id" type="number" value={values.item_id ?? ''} onChange={(e) => setValues({ ...values, item_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dose">Dose *</Label>
        <Input id="dose" type="text" value={values.dose ?? ''} onChange={(e) => setValues({ ...values, dose: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="route">Route *</Label>
        <Input id="route" type="text" value={values.route ?? ''} onChange={(e) => setValues({ ...values, route: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="frequency">Frequency *</Label>
        <Input id="frequency" type="text" value={values.frequency ?? ''} onChange={(e) => setValues({ ...values, frequency: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="planned_duration_days">Planned Duration Days</Label>
        <Input id="planned_duration_days" type="number" value={values.planned_duration_days ?? ''} onChange={(e) => setValues({ ...values, planned_duration_days: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
