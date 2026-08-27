import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useInhalantAllergenExaminationResource } from '../api'
import type { InhalantAllergenExaminationFormValues } from '../types'

export function InhalantAllergenExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useInhalantAllergenExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<InhalantAllergenExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as InhalantAllergenExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-inhalant-allergen-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-inhalant-allergen-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} InhalantAllergenExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <RelationSelect
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="allergen_name">Allergen Name *</Label>
        <Input id="allergen_name" type="text" value={values.allergen_name ?? ''} onChange={(e) => setValues({ ...values, allergen_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reaction_grade">Reaction Grade</Label>
        <Input id="reaction_grade" type="text" value={values.reaction_grade ?? ''} onChange={(e) => setValues({ ...values, reaction_grade: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="wheal_diameter_mm">Wheal Diameter Mm</Label>
        <Input id="wheal_diameter_mm" type="number" value={values.wheal_diameter_mm ?? ''} onChange={(e) => setValues({ ...values, wheal_diameter_mm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="erythema_diameter_mm">Erythema Diameter Mm</Label>
        <Input id="erythema_diameter_mm" type="number" value={values.erythema_diameter_mm ?? ''} onChange={(e) => setValues({ ...values, erythema_diameter_mm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="interpretation">Interpretation</Label>
        <Input id="interpretation" type="text" value={values.interpretation ?? ''} onChange={(e) => setValues({ ...values, interpretation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
