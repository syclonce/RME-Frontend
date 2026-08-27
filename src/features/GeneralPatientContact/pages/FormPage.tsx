import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { usePatientContactResource } from '../api'
import type { PatientContactFormValues } from '../types'

export function PatientContactFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePatientContactResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PatientContactFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PatientContactFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-patient-contact') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-patient-contact') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PatientContact</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <AsyncCombobox
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
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
        <Checkbox id="is_primary" checked={!!values.is_primary} onCheckedChange={(v) => setValues({ ...values, is_primary: !!v })} />
        <Label htmlFor="is_primary">Is Primary</Label>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
