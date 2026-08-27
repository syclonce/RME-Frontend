import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useAntimicrobialStewardshipGeneralExaminationResource } from '../api'
import type { AntimicrobialStewardshipGeneralExaminationFormValues } from '../types'

export function AntimicrobialStewardshipGeneralExaminationFormPage() {
  const navigate = useNavigate()
  const { create } = useAntimicrobialStewardshipGeneralExaminationResource()
  const [values, setValues] = useState<AntimicrobialStewardshipGeneralExaminationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-antimicrobial-stewardship-general-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AntimicrobialStewardshipGeneralExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="antimicrobial_stewardship_form_id">Antimicrobial Stewardship Form *</Label>
        <RelationSelect
          endpoint="/antimicrobial-stewardship-forms"
          value={values.antimicrobial_stewardship_form_id ?? null}
          onChange={(v) => setValues({ ...values, antimicrobial_stewardship_form_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="temperature">Temperature</Label>
        <Input id="temperature" type="number" value={values.temperature ?? ''} onChange={(e) => setValues({ ...values, temperature: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pulse">Pulse</Label>
        <Input id="pulse" type="number" value={values.pulse ?? ''} onChange={(e) => setValues({ ...values, pulse: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="respiration_rate">Respiration Rate</Label>
        <Input id="respiration_rate" type="number" value={values.respiration_rate ?? ''} onChange={(e) => setValues({ ...values, respiration_rate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_pressure">Blood Pressure</Label>
        <Input id="blood_pressure" type="text" value={values.blood_pressure ?? ''} onChange={(e) => setValues({ ...values, blood_pressure: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="weight_kg">Weight Kg</Label>
        <Input id="weight_kg" type="number" value={values.weight_kg ?? ''} onChange={(e) => setValues({ ...values, weight_kg: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="height_cm">Height Cm</Label>
        <Input id="height_cm" type="number" value={values.height_cm ?? ''} onChange={(e) => setValues({ ...values, height_cm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At *</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
