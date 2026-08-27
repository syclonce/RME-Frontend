import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useLabMicroscopicResultItemResource } from '../api'
import type { LabMicroscopicResultItemFormValues } from '../types'

export function LabMicroscopicResultItemFormPage() {
  const navigate = useNavigate()
  const { create } = useLabMicroscopicResultItemResource()
  const [values, setValues] = useState<LabMicroscopicResultItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-lab-microscopic-result-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah LabMicroscopicResultItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_microscopic_result_id">Lab Microscopic Result *</Label>
        <RelationSelect
          endpoint="/lab-microscopic-results"
          value={values.lab_microscopic_result_id ?? null}
          onChange={(v) => setValues({ ...values, lab_microscopic_result_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="parameter_name">Parameter Name *</Label>
        <Input id="parameter_name" type="text" value={values.parameter_name ?? ''} onChange={(e) => setValues({ ...values, parameter_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="value">Value *</Label>
        <Input id="value" type="text" value={values.value ?? ''} onChange={(e) => setValues({ ...values, value: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
