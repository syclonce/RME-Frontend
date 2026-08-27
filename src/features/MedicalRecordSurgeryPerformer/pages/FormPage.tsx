import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSurgeryPerformerResource } from '../api'
import type { SurgeryPerformerFormValues } from '../types'

export function SurgeryPerformerFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useSurgeryPerformerResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<SurgeryPerformerFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as SurgeryPerformerFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-surgery-performer') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-surgery-performer') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} SurgeryPerformer</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="surgery_id">Surgery</Label>
        <Input id="surgery_id" type="number" value={values.surgery_id ?? ''} onChange={(e) => setValues({ ...values, surgery_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="doctor_id">Doctor</Label>
        <Input id="doctor_id" type="number" value={values.doctor_id ?? ''} onChange={(e) => setValues({ ...values, doctor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="role">Role</Label>
        <Input id="role" type="text" value={values.role ?? ''} onChange={(e) => setValues({ ...values, role: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
