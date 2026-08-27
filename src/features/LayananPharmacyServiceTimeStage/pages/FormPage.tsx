import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { usePharmacyServiceTimeStageResource } from '../api'
import type { PharmacyServiceTimeStageFormValues } from '../types'

export function PharmacyServiceTimeStageFormPage() {
  const navigate = useNavigate()
  const { create } = usePharmacyServiceTimeStageResource()
  const [values, setValues] = useState<PharmacyServiceTimeStageFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-pharmacy-service-time-stage') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PharmacyServiceTimeStage</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="pharmacy_service_time_id">Pharmacy Service Time *</Label>
        <RelationSelect
          endpoint="/pharmacy-service-times"
          value={values.pharmacy_service_time_id ?? null}
          onChange={(v) => setValues({ ...values, pharmacy_service_time_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="stage_name">Stage Name *</Label>
        <Input id="stage_name" type="text" value={values.stage_name ?? ''} onChange={(e) => setValues({ ...values, stage_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_at">Recorded At *</Label>
        <Input id="recorded_at" type="date" value={values.recorded_at ?? ''} onChange={(e) => setValues({ ...values, recorded_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.recorded_by ?? null}
          onChange={(v) => setValues({ ...values, recorded_by: v })}
        />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
