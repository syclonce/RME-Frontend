import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useRadiologyClaimResource } from '../api'
import type { RadiologyClaimFormValues } from '../types'

export function RadiologyClaimFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useRadiologyClaimResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<RadiologyClaimFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as RadiologyClaimFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/berkas-klaim-radiology-claim') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/berkas-klaim-radiology-claim') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} RadiologyClaim</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="claim_file_id">Claim File *</Label>
        <RelationSelect
          endpoint="/claim-files"
          value={values.claim_file_id ?? null}
          onChange={(v) => setValues({ ...values, claim_file_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="order_id">Order</Label>
        <AsyncCombobox
          endpoint="/lab-orders"
          value={values.order_id ?? null}
          onChange={(v) => setValues({ ...values, order_id: v })}
        />
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
