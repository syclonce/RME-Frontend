import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useFamilyMedicalHistoryResource } from '../api'
import type { FamilyMedicalHistoryFormValues } from '../types'

export function FamilyMedicalHistoryFormPage() {
  const navigate = useNavigate()
  const { create } = useFamilyMedicalHistoryResource()
  const [values, setValues] = useState<FamilyMedicalHistoryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-family-medical-history') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah FamilyMedicalHistory</h1>
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
      <div className="grid gap-1.5">
        <Label htmlFor="relation">Relation *</Label>
        <Input id="relation" type="text" value={values.relation ?? ''} onChange={(e) => setValues({ ...values, relation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="condition">Condition *</Label>
        <Input id="condition" type="text" value={values.condition ?? ''} onChange={(e) => setValues({ ...values, condition: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosed_age">Diagnosed Age</Label>
        <Input id="diagnosed_age" type="number" value={values.diagnosed_age ?? ''} onChange={(e) => setValues({ ...values, diagnosed_age: e.target.value === '' ? null : Number(e.target.value) })} />
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
