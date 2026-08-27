import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePendaftaranHistoryResource } from '../api'
import type { PendaftaranHistoryFormValues } from '../types'

export function PendaftaranHistoryFormPage() {
  const navigate = useNavigate()
  const { create } = usePendaftaranHistoryResource()
  const [values, setValues] = useState<PendaftaranHistoryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-history') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PendaftaranHistory</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="registration_id">Registration *</Label>
        <RelationSelect
          endpoint="/registrations"
          value={values.registration_id ?? null}
          onChange={(v) => setValues({ ...values, registration_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="old_status">Old Status</Label>
        <Input id="old_status" type="text" value={values.old_status ?? ''} onChange={(e) => setValues({ ...values, old_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="new_status">New Status *</Label>
        <Input id="new_status" type="text" value={values.new_status ?? ''} onChange={(e) => setValues({ ...values, new_status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="changed_at">Changed At</Label>
        <Input id="changed_at" type="date" value={values.changed_at ?? ''} onChange={(e) => setValues({ ...values, changed_at: e.target.value })} />
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
