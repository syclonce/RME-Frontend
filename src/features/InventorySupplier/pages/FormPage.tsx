import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSupplierResource } from '../api'
import type { SupplierFormValues } from '../types'

export function SupplierFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useSupplierResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<SupplierFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as SupplierFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-supplier') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-supplier') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Supplier</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="code">Code</Label>
        <Input id="code" type="text" value={values.code ?? ''} onChange={(e) => setValues({ ...values, code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="contact_person">Contact Person</Label>
        <Input id="contact_person" type="text" value={values.contact_person ?? ''} onChange={(e) => setValues({ ...values, contact_person: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="text" value={values.phone ?? ''} onChange={(e) => setValues({ ...values, phone: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="text" value={values.email ?? ''} onChange={(e) => setValues({ ...values, email: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="address">Address</Label>
        <Input id="address" type="text" value={values.address ?? ''} onChange={(e) => setValues({ ...values, address: e.target.value })} />
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
