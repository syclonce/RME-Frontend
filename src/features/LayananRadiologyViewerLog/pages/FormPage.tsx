import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRadiologyViewerLogResource } from '../api'
import type { RadiologyViewerLogFormValues } from '../types'

export function RadiologyViewerLogFormPage() {
  const { create } = useRadiologyViewerLogResource()
  const [values, setValues] = useState<RadiologyViewerLogFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah RadiologyViewerLog</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="accession_number">Accession Number</Label>
        <Input id="accession_number" type="text" value={values.accession_number ?? ''} onChange={(e) => setValues({ ...values, accession_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="viewed_by">Viewed By *</Label>
        <Input id="viewed_by" type="number" value={values.viewed_by ?? ''} onChange={(e) => setValues({ ...values, viewed_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="viewed_at">Viewed At *</Label>
        <Input id="viewed_at" type="date" value={values.viewed_at ?? ''} onChange={(e) => setValues({ ...values, viewed_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ip_address">Ip Address</Label>
        <Input id="ip_address" type="text" value={values.ip_address ?? ''} onChange={(e) => setValues({ ...values, ip_address: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
