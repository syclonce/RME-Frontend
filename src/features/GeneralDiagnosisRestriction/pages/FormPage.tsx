import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDiagnosisRestrictionResource } from '../api'
import type { DiagnosisRestrictionFormValues } from '../types'

export function DiagnosisRestrictionFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useDiagnosisRestrictionResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<DiagnosisRestrictionFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as DiagnosisRestrictionFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-diagnosis-restriction') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-diagnosis-restriction') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} DiagnosisRestriction</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis_code_id">Diagnosis Code *</Label>
        <Input id="diagnosis_code_id" type="number" value={values.diagnosis_code_id ?? ''} onChange={(e) => setValues({ ...values, diagnosis_code_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="restricted_antibiotic_name">Restricted Antibiotic Name *</Label>
        <Input id="restricted_antibiotic_name" type="text" value={values.restricted_antibiotic_name ?? ''} onChange={(e) => setValues({ ...values, restricted_antibiotic_name: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="requires_justification" checked={!!values.requires_justification} onCheckedChange={(v) => setValues({ ...values, requires_justification: !!v })} />
        <Label htmlFor="requires_justification">Requires Justification</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
