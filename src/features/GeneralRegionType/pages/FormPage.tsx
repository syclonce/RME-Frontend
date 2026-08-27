import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRegionTypeResource } from '../api'
import type { RegionTypeFormValues } from '../types'

export function RegionTypeFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useRegionTypeResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<RegionTypeFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as RegionTypeFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-region-type') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-region-type') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} RegionType</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="digit_count">Digit Count</Label>
        <Input id="digit_count" type="number" value={values.digit_count ?? ''} onChange={(e) => setValues({ ...values, digit_count: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="delimiter">Delimiter</Label>
        <Input id="delimiter" type="text" value={values.delimiter ?? ''} onChange={(e) => setValues({ ...values, delimiter: e.target.value })} />
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
