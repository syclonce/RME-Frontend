import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAntimicrobialStewardshipOtherSupportResultResource } from '../api'
import type { AntimicrobialStewardshipOtherSupportResultFormValues } from '../types'

export function AntimicrobialStewardshipOtherSupportResultFormPage() {
  const navigate = useNavigate()
  const { create } = useAntimicrobialStewardshipOtherSupportResultResource()
  const [values, setValues] = useState<AntimicrobialStewardshipOtherSupportResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-antimicrobial-stewardship-other-support-result') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AntimicrobialStewardshipOtherSupportResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="antimicrobial_stewardship_form_id">Antimicrobial Stewardship Form *</Label>
        <Input id="antimicrobial_stewardship_form_id" type="number" value={values.antimicrobial_stewardship_form_id ?? ''} onChange={(e) => setValues({ ...values, antimicrobial_stewardship_form_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examination_name">Examination Name *</Label>
        <Input id="examination_name" type="text" value={values.examination_name ?? ''} onChange={(e) => setValues({ ...values, examination_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="result_value">Result Value *</Label>
        <Input id="result_value" type="text" value={values.result_value ?? ''} onChange={(e) => setValues({ ...values, result_value: e.target.value })} />
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
