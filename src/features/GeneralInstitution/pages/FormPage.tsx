import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInstitutionResource } from '../api'
import type { InstitutionFormValues } from '../types'

export function InstitutionFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useInstitutionResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<InstitutionFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as InstitutionFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-institution') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-institution') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Institution</h1>
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
