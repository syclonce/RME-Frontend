import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePatientFamilyContactResource } from '../api'
import type { PatientFamilyContactFormValues } from '../types'

export function PatientFamilyContactFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePatientFamilyContactResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PatientFamilyContactFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PatientFamilyContactFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-patient-family-contact') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-patient-family-contact') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PatientFamilyContact</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_family_id">Patient Family *</Label>
        <RelationSelect
          endpoint="/patientfamilies"
          value={values.patient_family_id ?? null}
          onChange={(v) => setValues({ ...values, patient_family_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="contact_type">Contact Type *</Label>
        <Input id="contact_type" type="text" value={values.contact_type ?? ''} onChange={(e) => setValues({ ...values, contact_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="contact_value">Contact Value *</Label>
        <Input id="contact_value" type="text" value={values.contact_value ?? ''} onChange={(e) => setValues({ ...values, contact_value: e.target.value })} />
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
