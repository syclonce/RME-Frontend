import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useReceivingRecordResource } from '../api'
import type { ReceivingRecordFormValues } from '../types'

export function ReceivingRecordFormPage() {
  const navigate = useNavigate()
  const { create } = useReceivingRecordResource()
  const [values, setValues] = useState<ReceivingRecordFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/inventory-receiving-record') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ReceivingRecord</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.ward_id ?? null}
          onChange={(v) => setValues({ ...values, ward_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="received_by">Received By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.received_by ?? null}
          onChange={(v) => setValues({ ...values, received_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="received_at">Received At</Label>
        <Input id="received_at" type="date" value={values.received_at ?? ''} onChange={(e) => setValues({ ...values, received_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
