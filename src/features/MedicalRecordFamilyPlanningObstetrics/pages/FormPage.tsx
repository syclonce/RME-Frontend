import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFamilyPlanningObstetricsResource } from '../api'
import type { FamilyPlanningObstetricsFormValues } from '../types'

export function FamilyPlanningObstetricsFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useFamilyPlanningObstetricsResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<FamilyPlanningObstetricsFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as FamilyPlanningObstetricsFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-family-planning-obstetrics') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-family-planning-obstetrics') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} FamilyPlanningObstetrics</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="contraceptive_method">Contraceptive Method *</Label>
        <Input id="contraceptive_method" type="text" value={values.contraceptive_method ?? ''} onChange={(e) => setValues({ ...values, contraceptive_method: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="installation_date">Installation Date</Label>
        <Input id="installation_date" type="date" value={values.installation_date ?? ''} onChange={(e) => setValues({ ...values, installation_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="removal_date">Removal Date</Label>
        <Input id="removal_date" type="date" value={values.removal_date ?? ''} onChange={(e) => setValues({ ...values, removal_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="side_effects">Side Effects</Label>
        <Input id="side_effects" type="text" value={values.side_effects ?? ''} onChange={(e) => setValues({ ...values, side_effects: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="action_taken">Action Taken</Label>
        <Input id="action_taken" type="text" value={values.action_taken ?? ''} onChange={(e) => setValues({ ...values, action_taken: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="next_visit_date">Next Visit Date</Label>
        <Input id="next_visit_date" type="date" value={values.next_visit_date ?? ''} onChange={(e) => setValues({ ...values, next_visit_date: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
