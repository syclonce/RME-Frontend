import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSocialConditionResource } from '../api'
import type { SocialConditionFormValues } from '../types'

export function SocialConditionFormPage() {
  const { create } = useSocialConditionResource()
  const [values, setValues] = useState<SocialConditionFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah SocialCondition</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="living_situation">Living Situation</Label>
        <Input id="living_situation" type="text" value={values.living_situation ?? ''} onChange={(e) => setValues({ ...values, living_situation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="occupation_status">Occupation Status</Label>
        <Input id="occupation_status" type="text" value={values.occupation_status ?? ''} onChange={(e) => setValues({ ...values, occupation_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="financial_status">Financial Status</Label>
        <Input id="financial_status" type="text" value={values.financial_status ?? ''} onChange={(e) => setValues({ ...values, financial_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="support_system">Support System</Label>
        <Input id="support_system" type="text" value={values.support_system ?? ''} onChange={(e) => setValues({ ...values, support_system: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By *</Label>
        <Input id="recorded_by" type="number" value={values.recorded_by ?? ''} onChange={(e) => setValues({ ...values, recorded_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At *</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
