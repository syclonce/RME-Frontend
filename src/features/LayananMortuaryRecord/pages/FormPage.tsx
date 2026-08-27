import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useMortuaryRecordResource } from '../api'
import type { MortuaryRecordFormValues } from '../types'

export function MortuaryRecordFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useMortuaryRecordResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<MortuaryRecordFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as MortuaryRecordFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-mortuary-record') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-mortuary-record') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} MortuaryRecord</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <RelationSelect
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="admitted_at">Admitted At *</Label>
        <Input id="admitted_at" type="date" value={values.admitted_at ?? ''} onChange={(e) => setValues({ ...values, admitted_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="cause_of_death_notes">Cause Of Death Notes</Label>
        <Input id="cause_of_death_notes" type="text" value={values.cause_of_death_notes ?? ''} onChange={(e) => setValues({ ...values, cause_of_death_notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
