import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useInvoiceResource } from '../api'
import type { InvoiceFormValues } from '../types'

export function InvoiceFormPage() {
  const navigate = useNavigate()
  const { create } = useInvoiceResource()
  const [values, setValues] = useState<InvoiceFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-invoice') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Tagihan (Invoice)</h1>
      <div className="grid gap-1.5">
        <Label>Kunjungan (Visit) *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v ?? undefined })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="invoice_date">Tanggal Invoice</Label>
        <Input
          id="invoice_date"
          type="date"
          value={values.invoice_date ?? ''}
          onChange={(e) => setValues({ ...values, invoice_date: e.target.value || undefined })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="rounding_adjustment">Pembulatan</Label>
        <Input
          id="rounding_adjustment"
          type="number"
          value={values.rounding_adjustment ?? ''}
          onChange={(e) =>
            setValues({ ...values, rounding_adjustment: e.target.value === '' ? undefined : Number(e.target.value) })
          }
        />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
