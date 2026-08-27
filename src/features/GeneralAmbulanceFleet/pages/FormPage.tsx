import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAmbulanceResource } from '../api'
import type { AmbulanceFormValues } from '../types'

export function AmbulanceFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useAmbulanceResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<AmbulanceFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as AmbulanceFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-ambulance-fleet') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-ambulance-fleet') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Ambulance</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="vehicle_code">Vehicle Code *</Label>
        <Input id="vehicle_code" type="text" value={values.vehicle_code ?? ''} onChange={(e) => setValues({ ...values, vehicle_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="plate_number">Plate Number *</Label>
        <Input id="plate_number" type="text" value={values.plate_number ?? ''} onChange={(e) => setValues({ ...values, plate_number: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
