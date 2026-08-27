import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useLinenItemResource } from '../api'
import type { LinenItemFormValues } from '../types'

export function LinenItemFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useLinenItemResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<LinenItemFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as LinenItemFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-linen-tracking') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-linen-tracking') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} LinenItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="linen_item_id">Linen Item *</Label>
        <RelationSelect
          endpoint="/linen-items"
          value={values.linen_item_id ?? null}
          onChange={(v) => setValues({ ...values, linen_item_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Select value={values.status ?? ''} onValueChange={(v) => setValues({ ...values, status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="dikirim_londri" value="dikirim_londri">Dikirim Londri</SelectItem>
            <SelectItem key="dicuci" value="dicuci">Dicuci</SelectItem>
            <SelectItem key="kembali_bersih" value="kembali_bersih">Kembali Bersih</SelectItem>
            <SelectItem key="rusak_hilang" value="rusak_hilang">Rusak Hilang</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sent_at">Sent At</Label>
        <Input id="sent_at" type="date" value={values.sent_at ?? ''} onChange={(e) => setValues({ ...values, sent_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" type="number" value={values.quantity ?? ''} onChange={(e) => setValues({ ...values, quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
