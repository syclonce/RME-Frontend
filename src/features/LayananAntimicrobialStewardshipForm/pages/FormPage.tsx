import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useAntimicrobialStewardshipFormResource } from '../api'
import type { AntimicrobialStewardshipFormFormValues } from '../types'

export function AntimicrobialStewardshipFormFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useAntimicrobialStewardshipFormResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<AntimicrobialStewardshipFormFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as AntimicrobialStewardshipFormFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-antimicrobial-stewardship-form') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-antimicrobial-stewardship-form') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} AntimicrobialStewardshipForm</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <AsyncCombobox
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="requesting_doctor_id">Requesting Doctor</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.requesting_doctor_id ?? null}
          onChange={(v) => setValues({ ...values, requesting_doctor_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="antibiotic_restriction_id">Antibiotic Restriction</Label>
        <RelationSelect
          endpoint="/antibiotic-restrictions"
          value={values.antibiotic_restriction_id ?? null}
          onChange={(v) => setValues({ ...values, antibiotic_restriction_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="indication">Indication *</Label>
        <Input id="indication" type="text" value={values.indication ?? ''} onChange={(e) => setValues({ ...values, indication: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status *</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="submitted_at">Submitted At</Label>
        <Input id="submitted_at" type="date" value={values.submitted_at ?? ''} onChange={(e) => setValues({ ...values, submitted_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
