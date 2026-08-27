import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useSaleReturnResource } from '../api'
import type { SaleReturnFormValues } from '../types'

export function SaleReturnFormPage() {
  const navigate = useNavigate()
  const { create } = useSaleReturnResource()
  const [values, setValues] = useState<SaleReturnFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/penjualan-sale-return') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah SaleReturn</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="sale_id">Sale *</Label>
        <RelationSelect
          endpoint="/sales"
          value={values.sale_id ?? null}
          onChange={(v) => setValues({ ...values, sale_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="returned_at">Returned At</Label>
        <Input id="returned_at" type="date" value={values.returned_at ?? ''} onChange={(e) => setValues({ ...values, returned_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="items">Items *</Label>
        <Input id="items" type="text" value={values.items ?? ''} onChange={(e) => setValues({ ...values, items: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
