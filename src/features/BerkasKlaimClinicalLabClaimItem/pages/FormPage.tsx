import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useClinicalLabClaimItemResource } from '../api'
import type { ClinicalLabClaimItemFormValues } from '../types'

export function ClinicalLabClaimItemFormPage() {
  const navigate = useNavigate()
  const { create } = useClinicalLabClaimItemResource()
  const [values, setValues] = useState<ClinicalLabClaimItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/berkas-klaim-clinical-lab-claim-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ClinicalLabClaimItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="clinical_lab_claim_id">Clinical Lab Claim *</Label>
        <RelationSelect
          endpoint="/clinical-lab-claims"
          value={values.clinical_lab_claim_id ?? null}
          onChange={(v) => setValues({ ...values, clinical_lab_claim_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="test_name">Test Name *</Label>
        <Input id="test_name" type="text" value={values.test_name ?? ''} onChange={(e) => setValues({ ...values, test_name: e.target.value })} />
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
