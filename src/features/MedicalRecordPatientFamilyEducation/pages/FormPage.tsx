import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePatientFamilyEducationResource } from '../api'
import type { PatientFamilyEducationFormValues } from '../types'

export function PatientFamilyEducationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePatientFamilyEducationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PatientFamilyEducationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PatientFamilyEducationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-patient-family-education') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-patient-family-education') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PatientFamilyEducation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
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
        <RelationSelect
          endpoint="/employees"
          value={values.educator_id ?? null}
          onChange={(v) => setValues({ ...values, educator_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="educated_at">Educated At *</Label>
        <Input id="educated_at" type="date" value={values.educated_at ?? ''} onChange={(e) => setValues({ ...values, educated_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
