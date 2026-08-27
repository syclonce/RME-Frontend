import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBerkasKlaimClaimFileResource } from '../api'
import type { BerkasKlaimClaimFileFormValues } from '../types'

export function BerkasKlaimClaimFileFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useBerkasKlaimClaimFileResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<BerkasKlaimClaimFileFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as BerkasKlaimClaimFileFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/berkas-klaim-claim-file') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/berkas-klaim-claim-file') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} BerkasKlaimClaimFile</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_id">Invoice</Label>
        <Input id="invoice_id" type="number" value={values.invoice_id ?? ''} onChange={(e) => setValues({ ...values, invoice_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
