import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLabAnalyzerVendorResource } from '../api'
import type { LabAnalyzerVendorFormValues } from '../types'

export function LabAnalyzerVendorFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useLabAnalyzerVendorResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<LabAnalyzerVendorFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as LabAnalyzerVendorFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-lab-analyzer-order') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-lab-analyzer-order') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} LabAnalyzerVendor</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="vendor_id">Vendor</Label>
        <Input id="vendor_id" type="number" value={values.vendor_id ?? ''} onChange={(e) => setValues({ ...values, vendor_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="test_code">Test Code *</Label>
        <Input id="test_code" type="text" value={values.test_code ?? ''} onChange={(e) => setValues({ ...values, test_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ordered_by">Ordered By *</Label>
        <Input id="ordered_by" type="number" value={values.ordered_by ?? ''} onChange={(e) => setValues({ ...values, ordered_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ordered_at">Ordered At</Label>
        <Input id="ordered_at" type="date" value={values.ordered_at ?? ''} onChange={(e) => setValues({ ...values, ordered_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
