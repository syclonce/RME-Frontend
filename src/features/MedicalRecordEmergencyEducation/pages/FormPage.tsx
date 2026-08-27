import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEmergencyEducationResource } from '../api'
import type { EmergencyEducationFormValues } from '../types'

export function EmergencyEducationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useEmergencyEducationResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<EmergencyEducationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as EmergencyEducationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-emergency-education') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-emergency-education') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} EmergencyEducation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="topic">Topic *</Label>
        <Input id="topic" type="text" value={values.topic ?? ''} onChange={(e) => setValues({ ...values, topic: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="method">Method</Label>
        <Input id="method" type="text" value={values.method ?? ''} onChange={(e) => setValues({ ...values, method: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="understanding_level">Understanding Level</Label>
        <Input id="understanding_level" type="text" value={values.understanding_level ?? ''} onChange={(e) => setValues({ ...values, understanding_level: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="educator_id">Educator *</Label>
        <Input id="educator_id" type="number" value={values.educator_id ?? ''} onChange={(e) => setValues({ ...values, educator_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="educated_at">Educated At *</Label>
        <Input id="educated_at" type="date" value={values.educated_at ?? ''} onChange={(e) => setValues({ ...values, educated_at: e.target.value })} />
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
