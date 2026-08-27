import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useAntimicrobialStewardshipRadiologyResultResource } from '../api'
import type { AntimicrobialStewardshipRadiologyResultFormValues } from '../types'

export function AntimicrobialStewardshipRadiologyResultFormPage() {
  const navigate = useNavigate()
  const { create } = useAntimicrobialStewardshipRadiologyResultResource()
  const [values, setValues] = useState<AntimicrobialStewardshipRadiologyResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-antimicrobial-stewardship-radiology-result') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AntimicrobialStewardshipRadiologyResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="antimicrobial_stewardship_form_id">Antimicrobial Stewardship Form *</Label>
        <RelationSelect
          endpoint="/antimicrobial-stewardship-forms"
          value={values.antimicrobial_stewardship_form_id ?? null}
          onChange={(v) => setValues({ ...values, antimicrobial_stewardship_form_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examination_name">Examination Name *</Label>
        <Input id="examination_name" type="text" value={values.examination_name ?? ''} onChange={(e) => setValues({ ...values, examination_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="findings">Findings *</Label>
        <Input id="findings" type="text" value={values.findings ?? ''} onChange={(e) => setValues({ ...values, findings: e.target.value })} />
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
