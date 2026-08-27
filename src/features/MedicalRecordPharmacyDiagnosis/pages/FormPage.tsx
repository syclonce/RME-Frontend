import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { usePharmacyDiagnosisResource } from '../api'
import type { PharmacyDiagnosisFormValues } from '../types'

export function PharmacyDiagnosisFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePharmacyDiagnosisResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PharmacyDiagnosisFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PharmacyDiagnosisFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-pharmacy-diagnosis') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-pharmacy-diagnosis') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PharmacyDiagnosis</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_id">Prescription</Label>
        <AsyncCombobox
          endpoint="/prescriptions"
          value={values.prescription_id ?? null}
          onChange={(v) => setValues({ ...values, prescription_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="problem_category">Problem Category *</Label>
        <Input id="problem_category" type="text" value={values.problem_category ?? ''} onChange={(e) => setValues({ ...values, problem_category: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input id="description" type="text" value={values.description ?? ''} onChange={(e) => setValues({ ...values, description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recommendation">Recommendation</Label>
        <Input id="recommendation" type="text" value={values.recommendation ?? ''} onChange={(e) => setValues({ ...values, recommendation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_by">Assessed By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.assessed_by ?? null}
          onChange={(v) => setValues({ ...values, assessed_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_at">Assessed At *</Label>
        <Input id="assessed_at" type="date" value={values.assessed_at ?? ''} onChange={(e) => setValues({ ...values, assessed_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
