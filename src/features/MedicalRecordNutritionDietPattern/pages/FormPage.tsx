import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useNutritionDietPatternResource } from '../api'
import type { NutritionDietPatternFormValues } from '../types'

export function NutritionDietPatternFormPage() {
  const navigate = useNavigate()
  const { create } = useNutritionDietPatternResource()
  const [values, setValues] = useState<NutritionDietPatternFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-nutrition-diet-pattern') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah NutritionDietPattern</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_by">Assessed By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.assessed_by ?? null}
          onChange={(v) => setValues({ ...values, assessed_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <RelationSelect
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diet_type">Diet Type *</Label>
        <Input id="diet_type" type="text" value={values.diet_type ?? ''} onChange={(e) => setValues({ ...values, diet_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="appetite">Appetite</Label>
        <Input id="appetite" type="text" value={values.appetite ?? ''} onChange={(e) => setValues({ ...values, appetite: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="meal_frequency_per_day">Meal Frequency Per Day</Label>
        <Input id="meal_frequency_per_day" type="number" value={values.meal_frequency_per_day ?? ''} onChange={(e) => setValues({ ...values, meal_frequency_per_day: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="food_allergies">Food Allergies</Label>
        <Input id="food_allergies" type="text" value={values.food_allergies ?? ''} onChange={(e) => setValues({ ...values, food_allergies: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="special_diet_notes">Special Diet Notes</Label>
        <Input id="special_diet_notes" type="text" value={values.special_diet_notes ?? ''} onChange={(e) => setValues({ ...values, special_diet_notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_at">Assessed At</Label>
        <Input id="assessed_at" type="date" value={values.assessed_at ?? ''} onChange={(e) => setValues({ ...values, assessed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
