import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRadiologyClaimResource } from '../api'
import type { RadiologyClaimFormValues } from '../types'

export function RadiologyClaimFormPage() {
  const { create } = useRadiologyClaimResource()
  const [values, setValues] = useState<RadiologyClaimFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah RadiologyClaim</h1>
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
