import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePhysicianRestrictionResource } from '../api'
import type { PhysicianRestrictionFormValues } from '../types'

export function PhysicianRestrictionFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = usePhysicianRestrictionResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PhysicianRestrictionFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PhysicianRestrictionFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-physician-restriction') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-physician-restriction') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PhysicianRestriction</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="doctor_id">Doctor *</Label>
        <Input id="doctor_id" type="number" value={values.doctor_id ?? ''} onChange={(e) => setValues({ ...values, doctor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="restricted_antibiotic_name">Restricted Antibiotic Name *</Label>
        <Input id="restricted_antibiotic_name" type="text" value={values.restricted_antibiotic_name ?? ''} onChange={(e) => setValues({ ...values, restricted_antibiotic_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="authorization_level">Authorization Level</Label>
        <Input id="authorization_level" type="text" value={values.authorization_level ?? ''} onChange={(e) => setValues({ ...values, authorization_level: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_authorized_prescriber" checked={!!values.is_authorized_prescriber} onCheckedChange={(v) => setValues({ ...values, is_authorized_prescriber: !!v })} />
        <Label htmlFor="is_authorized_prescriber">Is Authorized Prescriber</Label>
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
