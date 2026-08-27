import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useRadiologyViewerLogResource } from '../api'
import type { RadiologyViewerLogFormValues } from '../types'

export function RadiologyViewerLogFormPage() {
  const navigate = useNavigate()
  const { create } = useRadiologyViewerLogResource()
  const [values, setValues] = useState<RadiologyViewerLogFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-radiology-viewer-log') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah RadiologyViewerLog</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="accession_number">Accession Number</Label>
        <Input id="accession_number" type="text" value={values.accession_number ?? ''} onChange={(e) => setValues({ ...values, accession_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="viewed_by">Viewed By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.viewed_by ?? null}
          onChange={(v) => setValues({ ...values, viewed_by: v })}
        />
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
