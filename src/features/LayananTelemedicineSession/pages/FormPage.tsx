import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useTelemedicineSessionResource } from '../api'
import type { TelemedicineSessionFormValues } from '../types'

export function TelemedicineSessionFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useTelemedicineSessionResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<TelemedicineSessionFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as TelemedicineSessionFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-telemedicine-session') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-telemedicine-session') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} TelemedicineSession</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="doctor_employee_id">Doctor Employee *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.doctor_employee_id ?? null}
          onChange={(v) => setValues({ ...values, doctor_employee_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="scheduled_at">Scheduled At *</Label>
        <Input id="scheduled_at" type="date" value={values.scheduled_at ?? ''} onChange={(e) => setValues({ ...values, scheduled_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="session_url">Session Url</Label>
        <Input id="session_url" type="text" value={values.session_url ?? ''} onChange={(e) => setValues({ ...values, session_url: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
