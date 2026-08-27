import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useDiagnosisResource } from '../api'
import type { DiagnosisFormValues } from '../types'

export function DiagnosisFormPage() {
  const navigate = useNavigate()
  const { create } = useDiagnosisResource()
  const [values, setValues] = useState<DiagnosisFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-diagnosis') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Diagnosis</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="diagnosis_code_id">Diagnosis Code *</Label>
        <RelationSelect
          endpoint="/diagnosis-codes"
          value={values.diagnosis_code_id ?? null}
          onChange={(v) => setValues({ ...values, diagnosis_code_id: v })}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_primary" checked={!!values.is_primary} onCheckedChange={(v) => setValues({ ...values, is_primary: !!v })} />
        <Label htmlFor="is_primary">Is Primary</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
