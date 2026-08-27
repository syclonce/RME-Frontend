import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePathologyClaimResource } from '../api'
import type { PathologyClaimFormValues } from '../types'

export function PathologyClaimFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = usePathologyClaimResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PathologyClaimFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PathologyClaimFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/berkas-klaim-pathology-claim') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/berkas-klaim-pathology-claim') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PathologyClaim</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="claim_file_id">Claim File *</Label>
        <Input id="claim_file_id" type="number" value={values.claim_file_id ?? ''} onChange={(e) => setValues({ ...values, claim_file_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="order_id">Order</Label>
        <Input id="order_id" type="number" value={values.order_id ?? ''} onChange={(e) => setValues({ ...values, order_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="submitted_at">Submitted At</Label>
        <Input id="submitted_at" type="date" value={values.submitted_at ?? ''} onChange={(e) => setValues({ ...values, submitted_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
