import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTbDiseaseHistoryResource } from '../api'
import type { TbDiseaseHistoryFormValues } from '../types'

export function TbDiseaseHistoryFormPage() {
  const { create } = useTbDiseaseHistoryResource()
  const [values, setValues] = useState<TbDiseaseHistoryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah TbDiseaseHistory</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <Input id="created_by" type="number" value={values.created_by ?? ''} onChange={(e) => setValues({ ...values, created_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="previous_tb_treatment" checked={!!values.previous_tb_treatment} onCheckedChange={(v) => setValues({ ...values, previous_tb_treatment: !!v })} />
        <Label htmlFor="previous_tb_treatment">Previous Tb Treatment</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="treatment_year">Treatment Year</Label>
        <Input id="treatment_year" type="number" value={values.treatment_year ?? ''} onChange={(e) => setValues({ ...values, treatment_year: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="treatment_outcome">Treatment Outcome</Label>
        <Input id="treatment_outcome" type="text" value={values.treatment_outcome ?? ''} onChange={(e) => setValues({ ...values, treatment_outcome: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tb_category">Tb Category</Label>
        <Input id="tb_category" type="text" value={values.tb_category ?? ''} onChange={(e) => setValues({ ...values, tb_category: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
