import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAnesthesiaPreparationResource } from '../api'
import type { AnesthesiaPreparationFormValues } from '../types'

export function AnesthesiaPreparationFormPage() {
  const navigate = useNavigate()
  const { create } = useAnesthesiaPreparationResource()
  const [values, setValues] = useState<AnesthesiaPreparationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-anesthesia-preparation') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AnesthesiaPreparation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="prepared_by">Prepared By *</Label>
        <Input id="prepared_by" type="number" value={values.prepared_by ?? ''} onChange={(e) => setValues({ ...values, prepared_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <Input id="created_by" type="number" value={values.created_by ?? ''} onChange={(e) => setValues({ ...values, created_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fasting_hours">Fasting Hours</Label>
        <Input id="fasting_hours" type="number" value={values.fasting_hours ?? ''} onChange={(e) => setValues({ ...values, fasting_hours: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="allergy_checked" checked={!!values.allergy_checked} onCheckedChange={(v) => setValues({ ...values, allergy_checked: !!v })} />
        <Label htmlFor="allergy_checked">Allergy Checked</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mallampati_score">Mallampati Score</Label>
        <Input id="mallampati_score" type="number" value={values.mallampati_score ?? ''} onChange={(e) => setValues({ ...values, mallampati_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="consent_confirmed" checked={!!values.consent_confirmed} onCheckedChange={(v) => setValues({ ...values, consent_confirmed: !!v })} />
        <Label htmlFor="consent_confirmed">Consent Confirmed</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="equipment_checklist">Equipment Checklist</Label>
        <Input id="equipment_checklist" type="text" value={values.equipment_checklist ?? ''} onChange={(e) => setValues({ ...values, equipment_checklist: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="prepared_at">Prepared At</Label>
        <Input id="prepared_at" type="date" value={values.prepared_at ?? ''} onChange={(e) => setValues({ ...values, prepared_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
