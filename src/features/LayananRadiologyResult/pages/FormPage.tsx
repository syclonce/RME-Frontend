import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRadiologyResultResource } from '../api'
import type { RadiologyResultFormValues } from '../types'

export function RadiologyResultFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useRadiologyResultResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<RadiologyResultFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as RadiologyResultFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-radiology-result') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-radiology-result') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} RadiologyResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="radiology_order_id">Radiology Order *</Label>
        <Input id="radiology_order_id" type="number" value={values.radiology_order_id ?? ''} onChange={(e) => setValues({ ...values, radiology_order_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="findings">Findings *</Label>
        <Input id="findings" type="text" value={values.findings ?? ''} onChange={(e) => setValues({ ...values, findings: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="impression">Impression</Label>
        <Input id="impression" type="text" value={values.impression ?? ''} onChange={(e) => setValues({ ...values, impression: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="radiologist_id">Radiologist</Label>
        <Input id="radiologist_id" type="number" value={values.radiologist_id ?? ''} onChange={(e) => setValues({ ...values, radiologist_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At *</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status *</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
