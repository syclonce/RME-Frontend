import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useLabSensitivityResultResource } from '../api'
import type { LabSensitivityResultFormValues } from '../types'

export function LabSensitivityResultFormPage() {
  const navigate = useNavigate()
  const { create } = useLabSensitivityResultResource()
  const [values, setValues] = useState<LabSensitivityResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-lab-sensitivity-result') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah LabSensitivityResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_order_id">Lab Order *</Label>
        <RelationSelect
          endpoint="/lab-orders"
          value={values.lab_order_id ?? null}
          onChange={(v) => setValues({ ...values, lab_order_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="organism">Organism *</Label>
        <Input id="organism" type="text" value={values.organism ?? ''} onChange={(e) => setValues({ ...values, organism: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="antibiotic_name">Antibiotic Name *</Label>
        <Input id="antibiotic_name" type="text" value={values.antibiotic_name ?? ''} onChange={(e) => setValues({ ...values, antibiotic_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sensitivity_result">Sensitivity Result *</Label>
        <Input id="sensitivity_result" type="text" value={values.sensitivity_result ?? ''} onChange={(e) => setValues({ ...values, sensitivity_result: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At *</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
