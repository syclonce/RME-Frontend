import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useDietOrderResource } from '../api'
import type { DietOrderFormValues } from '../types'

export function DietOrderFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useDietOrderResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<DietOrderFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as DietOrderFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-diet-order') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-diet-order') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} DietOrder</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diet_type">Diet Type *</Label>
        <Input id="diet_type" type="text" value={values.diet_type ?? ''} onChange={(e) => setValues({ ...values, diet_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="calorie_target">Calorie Target</Label>
        <Input id="calorie_target" type="number" value={values.calorie_target ?? ''} onChange={(e) => setValues({ ...values, calorie_target: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="allergy_notes">Allergy Notes</Label>
        <Input id="allergy_notes" type="text" value={values.allergy_notes ?? ''} onChange={(e) => setValues({ ...values, allergy_notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="meal_schedule">Meal Schedule *</Label>
        <Input id="meal_schedule" type="text" value={values.meal_schedule ?? ''} onChange={(e) => setValues({ ...values, meal_schedule: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ordered_by">Ordered By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.ordered_by ?? null}
          onChange={(v) => setValues({ ...values, ordered_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="order_date">Order Date *</Label>
        <Input id="order_date" type="date" value={values.order_date ?? ''} onChange={(e) => setValues({ ...values, order_date: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
