import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useRadiologyClaimItemResource } from '../api'
import type { RadiologyClaimItemFormValues } from '../types'

export function RadiologyClaimItemFormPage() {
  const navigate = useNavigate()
  const { create } = useRadiologyClaimItemResource()
  const [values, setValues] = useState<RadiologyClaimItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/berkas-klaim-radiology-claim-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah RadiologyClaimItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="radiology_claim_id">Radiology Claim *</Label>
        <RelationSelect
          endpoint="/radiology-claims"
          value={values.radiology_claim_id ?? null}
          onChange={(v) => setValues({ ...values, radiology_claim_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="exam_name">Exam Name *</Label>
        <Input id="exam_name" type="text" value={values.exam_name ?? ''} onChange={(e) => setValues({ ...values, exam_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="amount">Amount *</Label>
        <Input id="amount" type="number" value={values.amount ?? ''} onChange={(e) => setValues({ ...values, amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
