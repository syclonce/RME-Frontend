import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useChiefComplaintResource } from '../api'
import type { ChiefComplaintFormValues } from '../types'

export function ChiefComplaintFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useChiefComplaintResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ChiefComplaintFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ChiefComplaintFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-chief-complaint') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-chief-complaint') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ChiefComplaint</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="complaint">Complaint</Label>
        <Input id="complaint" type="text" value={values.complaint ?? ''} onChange={(e) => setValues({ ...values, complaint: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="onset">Onset</Label>
        <Input id="onset" type="text" value={values.onset ?? ''} onChange={(e) => setValues({ ...values, onset: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="duration">Duration</Label>
        <Input id="duration" type="text" value={values.duration ?? ''} onChange={(e) => setValues({ ...values, duration: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.recorded_by ?? null}
          onChange={(v) => setValues({ ...values, recorded_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At *</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
