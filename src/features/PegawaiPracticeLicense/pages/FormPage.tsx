import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePracticeLicenseResource } from '../api'
import type { PracticeLicenseFormValues } from '../types'

export function PracticeLicenseFormPage() {
  const { create } = usePracticeLicenseResource()
  const [values, setValues] = useState<PracticeLicenseFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PracticeLicense</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_id">Employee *</Label>
        <Input id="employee_id" type="number" value={values.employee_id ?? ''} onChange={(e) => setValues({ ...values, employee_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="license_type">License Type *</Label>
        <Input id="license_type" type="text" value={values.license_type ?? ''} onChange={(e) => setValues({ ...values, license_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="license_number">License Number *</Label>
        <Input id="license_number" type="text" value={values.license_number ?? ''} onChange={(e) => setValues({ ...values, license_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="issued_at">Issued At</Label>
        <Input id="issued_at" type="date" value={values.issued_at ?? ''} onChange={(e) => setValues({ ...values, issued_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="expires_at">Expires At</Label>
        <Input id="expires_at" type="date" value={values.expires_at ?? ''} onChange={(e) => setValues({ ...values, expires_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="issuing_authority">Issuing Authority</Label>
        <Input id="issuing_authority" type="text" value={values.issuing_authority ?? ''} onChange={(e) => setValues({ ...values, issuing_authority: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
