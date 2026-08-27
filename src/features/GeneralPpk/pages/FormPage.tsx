import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePpkResource } from '../api'
import type { PpkFormValues } from '../types'

export function PpkFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePpkResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PpkFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PpkFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-ppk') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-ppk') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Ppk</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="code">Code</Label>
        <Input id="code" type="text" value={values.code ?? ''} onChange={(e) => setValues({ ...values, code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bpjs_code">Bpjs Code</Label>
        <Input id="bpjs_code" type="text" value={values.bpjs_code ?? ''} onChange={(e) => setValues({ ...values, bpjs_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="type">Type</Label>
        <Input id="type" type="number" value={values.type ?? ''} onChange={(e) => setValues({ ...values, type: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ownership">Ownership</Label>
        <Input id="ownership" type="number" value={values.ownership ?? ''} onChange={(e) => setValues({ ...values, ownership: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="jpk">Jpk</Label>
        <Input id="jpk" type="number" value={values.jpk ?? ''} onChange={(e) => setValues({ ...values, jpk: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="class">Class *</Label>
        <Input id="class" type="text" value={values.class ?? ''} onChange={(e) => setValues({ ...values, class: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="address">Address *</Label>
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
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="text" value={values.phone ?? ''} onChange={(e) => setValues({ ...values, phone: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fax">Fax *</Label>
        <Input id="fax" type="text" value={values.fax ?? ''} onChange={(e) => setValues({ ...values, fax: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="region_code">Region Code</Label>
        <Input id="region_code" type="text" value={values.region_code ?? ''} onChange={(e) => setValues({ ...values, region_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="region_name">Region Name *</Label>
        <Input id="region_name" type="text" value={values.region_name ?? ''} onChange={(e) => setValues({ ...values, region_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="started_at">Started At</Label>
        <Input id="started_at" type="date" value={values.started_at ?? ''} onChange={(e) => setValues({ ...values, started_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ended_at">Ended At</Label>
        <Input id="ended_at" type="date" value={values.ended_at ?? ''} onChange={(e) => setValues({ ...values, ended_at: e.target.value })} />
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
