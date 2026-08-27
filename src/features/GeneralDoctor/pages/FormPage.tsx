import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useDoctorResource } from '../api'
import type { DoctorFormValues } from '../types'

export function DoctorFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useDoctorResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<DoctorFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as DoctorFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-doctor') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-doctor') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Doctor</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_id">Employee *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.employee_id ?? null}
          onChange={(v) => setValues({ ...values, employee_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="specialization">Specialization</Label>
        <Input id="specialization" type="text" value={values.specialization ?? ''} onChange={(e) => setValues({ ...values, specialization: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sip_number">Sip Number</Label>
        <Input id="sip_number" type="text" value={values.sip_number ?? ''} onChange={(e) => setValues({ ...values, sip_number: e.target.value })} />
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
