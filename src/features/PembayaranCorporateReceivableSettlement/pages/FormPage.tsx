import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useCorporateReceivableSettlementResource } from '../api'
import type { CorporateReceivableSettlementFormValues } from '../types'

export function CorporateReceivableSettlementFormPage() {
  const navigate = useNavigate()
  const { create } = useCorporateReceivableSettlementResource()
  const [values, setValues] = useState<CorporateReceivableSettlementFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-corporate-receivable-settlement') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah CorporateReceivableSettlement</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="corporate_receivable_id">Corporate Receivable *</Label>
        <RelationSelect
          endpoint="/corporate-receivables"
          value={values.corporate_receivable_id ?? null}
          onChange={(v) => setValues({ ...values, corporate_receivable_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="paid_amount">Paid Amount *</Label>
        <Input id="paid_amount" type="number" value={values.paid_amount ?? ''} onChange={(e) => setValues({ ...values, paid_amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="paid_at">Paid At</Label>
        <Input id="paid_at" type="date" value={values.paid_at ?? ''} onChange={(e) => setValues({ ...values, paid_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
