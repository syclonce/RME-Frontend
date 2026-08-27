import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useProcedureSurgeryResource } from '../api'
import type { ProcedureSurgeryFormValues } from '../types'

export function ProcedureSurgeryFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useProcedureSurgeryResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ProcedureSurgeryFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ProcedureSurgeryFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-procedure-surgery') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-procedure-surgery') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ProcedureSurgery</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="procedure_id">Procedure</Label>
        <RelationSelect
          endpoint="/procedures"
          value={values.procedure_id ?? null}
          onChange={(v) => setValues({ ...values, procedure_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="surgery_name">Surgery Name *</Label>
        <Input id="surgery_name" type="text" value={values.surgery_name ?? ''} onChange={(e) => setValues({ ...values, surgery_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="surgery_type">Surgery Type</Label>
        <Input id="surgery_type" type="text" value={values.surgery_type ?? ''} onChange={(e) => setValues({ ...values, surgery_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="anesthesia_type">Anesthesia Type</Label>
        <Input id="anesthesia_type" type="text" value={values.anesthesia_type ?? ''} onChange={(e) => setValues({ ...values, anesthesia_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="performed_at">Performed At</Label>
        <Input id="performed_at" type="date" value={values.performed_at ?? ''} onChange={(e) => setValues({ ...values, performed_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
