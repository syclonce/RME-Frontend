import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRoleResource } from '../api'
import type { RoleFormValues } from '../types'

export function RoleFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useRoleResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<RoleFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as RoleFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/authorization') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/authorization') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Role</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
