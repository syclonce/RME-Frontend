import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMedicalPersonnelResource } from '../api'
import type { MedicalPersonnelFormValues } from '../types'

export function MedicalPersonnelFormPage() {
  const { create } = useMedicalPersonnelResource()
  const [values, setValues] = useState<MedicalPersonnelFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah MedicalPersonnel</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="identity_number">Identity Number</Label>
        <Input id="identity_number" type="text" value={values.identity_number ?? ''} onChange={(e) => setValues({ ...values, identity_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="personnel_type">Personnel Type *</Label>
        <Input id="personnel_type" type="text" value={values.personnel_type ?? ''} onChange={(e) => setValues({ ...values, personnel_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="profession_id">Profession</Label>
        <Input id="profession_id" type="number" value={values.profession_id ?? ''} onChange={(e) => setValues({ ...values, profession_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="license_number">License Number</Label>
        <Input id="license_number" type="text" value={values.license_number ?? ''} onChange={(e) => setValues({ ...values, license_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="text" value={values.phone ?? ''} onChange={(e) => setValues({ ...values, phone: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
