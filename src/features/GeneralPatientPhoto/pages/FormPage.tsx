import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGeneralPatientPhotoResource } from '../api'
import type { GeneralPatientPhotoFormValues } from '../types'

export function GeneralPatientPhotoFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useGeneralPatientPhotoResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<GeneralPatientPhotoFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as GeneralPatientPhotoFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-patient-photo') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-patient-photo') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} GeneralPatientPhoto</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="file_path">File Path *</Label>
        <Input id="file_path" type="text" value={values.file_path ?? ''} onChange={(e) => setValues({ ...values, file_path: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="taken_at">Taken At *</Label>
        <Input id="taken_at" type="date" value={values.taken_at ?? ''} onChange={(e) => setValues({ ...values, taken_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
