import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useReservationResource } from '../api'
import type { ReservationFormValues } from '../types'

export function ReservationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useReservationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ReservationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ReservationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pendaftaran-reservation') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-reservation') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Reservation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <AsyncCombobox
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.ward_id ?? null}
          onChange={(v) => setValues({ ...values, ward_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reserved_at">Reserved At *</Label>
        <Input id="reserved_at" type="date" value={values.reserved_at ?? ''} onChange={(e) => setValues({ ...values, reserved_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="scheduled_at">Scheduled At *</Label>
        <Input id="scheduled_at" type="date" value={values.scheduled_at ?? ''} onChange={(e) => setValues({ ...values, scheduled_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Select value={values.status ?? ''} onValueChange={(v) => setValues({ ...values, status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="pending" value="pending">Pending</SelectItem>
            <SelectItem key="confirmed" value="confirmed">Confirmed</SelectItem>
            <SelectItem key="cancelled" value="cancelled">Cancelled</SelectItem>
            <SelectItem key="completed" value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
