import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePatientFamilyEducationResource } from '../api'
import type { PatientFamilyEducationFormValues } from '../types'

export function PatientFamilyEducationFormPage() {
  const { create } = usePatientFamilyEducationResource()
  const [values, setValues] = useState<PatientFamilyEducationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PatientFamilyEducation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="topic">Topic *</Label>
        <Input id="topic" type="text" value={values.topic ?? ''} onChange={(e) => setValues({ ...values, topic: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="method">Method</Label>
        <Input id="method" type="text" value={values.method ?? ''} onChange={(e) => setValues({ ...values, method: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="barrier">Barrier</Label>
        <Input id="barrier" type="text" value={values.barrier ?? ''} onChange={(e) => setValues({ ...values, barrier: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="understanding_level">Understanding Level</Label>
        <Input id="understanding_level" type="text" value={values.understanding_level ?? ''} onChange={(e) => setValues({ ...values, understanding_level: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="re_education_needed" checked={!!values.re_education_needed} onCheckedChange={(v) => setValues({ ...values, re_education_needed: !!v })} />
        <Label htmlFor="re_education_needed">Re Education Needed</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="educator_id">Educator *</Label>
        <Input id="educator_id" type="number" value={values.educator_id ?? ''} onChange={(e) => setValues({ ...values, educator_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="educated_at">Educated At *</Label>
        <Input id="educated_at" type="date" value={values.educated_at ?? ''} onChange={(e) => setValues({ ...values, educated_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
