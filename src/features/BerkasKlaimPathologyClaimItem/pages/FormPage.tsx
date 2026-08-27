import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePathologyClaimItemResource } from '../api'
import type { PathologyClaimItemFormValues } from '../types'

export function PathologyClaimItemFormPage() {
  const { create } = usePathologyClaimItemResource()
  const [values, setValues] = useState<PathologyClaimItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PathologyClaimItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="pathology_claim_id">Pathology Claim *</Label>
        <Input id="pathology_claim_id" type="number" value={values.pathology_claim_id ?? ''} onChange={(e) => setValues({ ...values, pathology_claim_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
