import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEmployeeResource } from '../api'
import type { EmployeeFormValues } from '../types'

export function EmployeeFormPage() {
  const { create } = useEmployeeResource()
  const [values, setValues] = useState<EmployeeFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Employee</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="user_id">User</Label>
        <Input id="user_id" type="number" value={values.user_id ?? ''} onChange={(e) => setValues({ ...values, user_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_number">Employee Number</Label>
        <Input id="employee_number" type="text" value={values.employee_number ?? ''} onChange={(e) => setValues({ ...values, employee_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="nickname">Nickname</Label>
        <Input id="nickname" type="text" value={values.nickname ?? ''} onChange={(e) => setValues({ ...values, nickname: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="title_prefix">Title Prefix</Label>
        <Input id="title_prefix" type="text" value={values.title_prefix ?? ''} onChange={(e) => setValues({ ...values, title_prefix: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="title_suffix">Title Suffix</Label>
        <Input id="title_suffix" type="text" value={values.title_suffix ?? ''} onChange={(e) => setValues({ ...values, title_suffix: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="birth_place">Birth Place</Label>
        <Input id="birth_place" type="text" value={values.birth_place ?? ''} onChange={(e) => setValues({ ...values, birth_place: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="birth_date">Birth Date</Label>
        <Input id="birth_date" type="date" value={values.birth_date ?? ''} onChange={(e) => setValues({ ...values, birth_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="religion_id">Religion</Label>
        <Input id="religion_id" type="number" value={values.religion_id ?? ''} onChange={(e) => setValues({ ...values, religion_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gender_id">Gender</Label>
        <Input id="gender_id" type="number" value={values.gender_id ?? ''} onChange={(e) => setValues({ ...values, gender_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="profession_id">Profession</Label>
        <Input id="profession_id" type="number" value={values.profession_id ?? ''} onChange={(e) => setValues({ ...values, profession_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="smf_id">Smf</Label>
        <Input id="smf_id" type="number" value={values.smf_id ?? ''} onChange={(e) => setValues({ ...values, smf_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="address">Address</Label>
        <Input id="address" type="text" value={values.address ?? ''} onChange={(e) => setValues({ ...values, address: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="rt">Rt</Label>
        <Input id="rt" type="text" value={values.rt ?? ''} onChange={(e) => setValues({ ...values, rt: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="rw">Rw</Label>
        <Input id="rw" type="text" value={values.rw ?? ''} onChange={(e) => setValues({ ...values, rw: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="postal_code">Postal Code</Label>
        <Input id="postal_code" type="text" value={values.postal_code ?? ''} onChange={(e) => setValues({ ...values, postal_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="village_id">Village</Label>
        <Input id="village_id" type="number" value={values.village_id ?? ''} onChange={(e) => setValues({ ...values, village_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_non_employee" checked={!!values.is_non_employee} onCheckedChange={(v) => setValues({ ...values, is_non_employee: !!v })} />
        <Label htmlFor="is_non_employee">Is Non Employee</Label>
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
