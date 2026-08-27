import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTreatmentProtocolStepDrugResource } from '../api'
import type { TreatmentProtocolStepDrugFormValues } from '../types'

export function TreatmentProtocolStepDrugFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useTreatmentProtocolStepDrugResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<TreatmentProtocolStepDrugFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as TreatmentProtocolStepDrugFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-treatment-protocol-step-drug') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-treatment-protocol-step-drug') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} TreatmentProtocolStepDrug</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="treatment_protocol_step_id">Treatment Protocol Step *</Label>
        <Input id="treatment_protocol_step_id" type="number" value={values.treatment_protocol_step_id ?? ''} onChange={(e) => setValues({ ...values, treatment_protocol_step_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="drug_name">Drug Name *</Label>
        <Input id="drug_name" type="text" value={values.drug_name ?? ''} onChange={(e) => setValues({ ...values, drug_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dosage">Dosage *</Label>
        <Input id="dosage" type="text" value={values.dosage ?? ''} onChange={(e) => setValues({ ...values, dosage: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="frequency">Frequency *</Label>
        <Input id="frequency" type="text" value={values.frequency ?? ''} onChange={(e) => setValues({ ...values, frequency: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="route">Route</Label>
        <Input id="route" type="text" value={values.route ?? ''} onChange={(e) => setValues({ ...values, route: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
