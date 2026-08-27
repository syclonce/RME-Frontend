import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useSurgicalProcedureHistoryResource } from '../api'
import type { SurgicalProcedureHistoryFormValues } from '../types'

export function SurgicalProcedureHistoryFormPage() {
  const navigate = useNavigate()
  const { create } = useSurgicalProcedureHistoryResource()
  const [values, setValues] = useState<SurgicalProcedureHistoryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-surgical-procedure-history') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah SurgicalProcedureHistory</h1>
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
        <Label htmlFor="procedure_name">Procedure Name *</Label>
        <Input id="procedure_name" type="text" value={values.procedure_name ?? ''} onChange={(e) => setValues({ ...values, procedure_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="procedure_date">Procedure Date</Label>
        <Input id="procedure_date" type="date" value={values.procedure_date ?? ''} onChange={(e) => setValues({ ...values, procedure_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="facility_name">Facility Name</Label>
        <Input id="facility_name" type="text" value={values.facility_name ?? ''} onChange={(e) => setValues({ ...values, facility_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="surgeon_name">Surgeon Name</Label>
        <Input id="surgeon_name" type="text" value={values.surgeon_name ?? ''} onChange={(e) => setValues({ ...values, surgeon_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="complications">Complications</Label>
        <Input id="complications" type="text" value={values.complications ?? ''} onChange={(e) => setValues({ ...values, complications: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
