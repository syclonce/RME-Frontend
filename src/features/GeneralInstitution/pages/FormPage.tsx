import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInstitutionResource } from '../api'
import type { InstitutionFormValues } from '../types'

export function InstitutionFormPage() {
  const { create } = useInstitutionResource()
  const [values, setValues] = useState<InstitutionFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Institution</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ppk_id">Ppk</Label>
        <Input id="ppk_id" type="number" value={values.ppk_id ?? ''} onChange={(e) => setValues({ ...values, ppk_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="text" value={values.email ?? ''} onChange={(e) => setValues({ ...values, email: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="website">Website *</Label>
        <Input id="website" type="text" value={values.website ?? ''} onChange={(e) => setValues({ ...values, website: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
