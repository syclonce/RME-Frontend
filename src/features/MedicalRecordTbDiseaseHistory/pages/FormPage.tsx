import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useTbDiseaseHistoryResource } from '../api'
import type { TbDiseaseHistoryFormValues } from '../types'

export function TbDiseaseHistoryFormPage() {
  const navigate = useNavigate()
  const { create } = useTbDiseaseHistoryResource()
  const [values, setValues] = useState<TbDiseaseHistoryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-tb-disease-history') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah TbDiseaseHistory</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
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
        <Select value={values.treatment_outcome ?? ''} onValueChange={(v) => setValues({ ...values, treatment_outcome: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="cured" value="cured">Cured</SelectItem>
            <SelectItem key="completed" value="completed">Completed</SelectItem>
            <SelectItem key="failed" value="failed">Failed</SelectItem>
            <SelectItem key="ongoing" value="ongoing">Ongoing</SelectItem>
          </SelectContent>
        </Select>
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
