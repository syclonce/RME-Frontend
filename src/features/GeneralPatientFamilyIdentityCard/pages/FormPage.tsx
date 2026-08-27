import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePatientFamilyIdentityCardResource } from '../api'
import type { PatientFamilyIdentityCardFormValues } from '../types'

export function PatientFamilyIdentityCardFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePatientFamilyIdentityCardResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PatientFamilyIdentityCardFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PatientFamilyIdentityCardFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-patient-family-identity-card') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-patient-family-identity-card') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PatientFamilyIdentityCard</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_family_id">Patient Family *</Label>
        <RelationSelect
          endpoint="/patientfamilies"
          value={values.patient_family_id ?? null}
          onChange={(v) => setValues({ ...values, patient_family_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="identity_type">Identity Type *</Label>
        <Input id="identity_type" type="text" value={values.identity_type ?? ''} onChange={(e) => setValues({ ...values, identity_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="identity_number">Identity Number *</Label>
        <Input id="identity_number" type="text" value={values.identity_number ?? ''} onChange={(e) => setValues({ ...values, identity_number: e.target.value })} />
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
