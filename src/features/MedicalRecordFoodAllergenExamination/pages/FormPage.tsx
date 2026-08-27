import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFoodAllergenExaminationResource } from '../api'
import type { FoodAllergenExaminationFormValues } from '../types'

export function FoodAllergenExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useFoodAllergenExaminationResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<FoodAllergenExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as FoodAllergenExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-food-allergen-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-food-allergen-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} FoodAllergenExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="food_item">Food Item *</Label>
        <Input id="food_item" type="text" value={values.food_item ?? ''} onChange={(e) => setValues({ ...values, food_item: e.target.value })} />
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
        <Label htmlFor="symptoms_observed">Symptoms Observed</Label>
        <Input id="symptoms_observed" type="text" value={values.symptoms_observed ?? ''} onChange={(e) => setValues({ ...values, symptoms_observed: e.target.value })} />
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
