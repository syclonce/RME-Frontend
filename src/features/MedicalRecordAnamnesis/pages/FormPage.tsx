import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useAnamnesisResource } from '../api'
import type { AnamnesisFormValues } from '../types'

export function AnamnesisFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useAnamnesisResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<AnamnesisFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as AnamnesisFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-anamnesis') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-anamnesis') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Anamnesis</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="present_illness_history">Present Illness History</Label>
        <Input id="present_illness_history" type="text" value={values.present_illness_history ?? ''} onChange={(e) => setValues({ ...values, present_illness_history: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="past_medical_history">Past Medical History</Label>
        <Input id="past_medical_history" type="text" value={values.past_medical_history ?? ''} onChange={(e) => setValues({ ...values, past_medical_history: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="family_medical_history">Family Medical History</Label>
        <Input id="family_medical_history" type="text" value={values.family_medical_history ?? ''} onChange={(e) => setValues({ ...values, family_medical_history: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="allergy_history">Allergy History</Label>
        <Input id="allergy_history" type="text" value={values.allergy_history ?? ''} onChange={(e) => setValues({ ...values, allergy_history: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="social_history">Social History</Label>
        <Input id="social_history" type="text" value={values.social_history ?? ''} onChange={(e) => setValues({ ...values, social_history: e.target.value })} />
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
