import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useIntradialyticHdMonitoringResource } from '../api'
import type { IntradialyticHdMonitoringFormValues } from '../types'

export function IntradialyticHdMonitoringFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useIntradialyticHdMonitoringResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<IntradialyticHdMonitoringFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as IntradialyticHdMonitoringFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-intradialytic-hd-monitoring') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-intradialytic-hd-monitoring') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} IntradialyticHdMonitoring</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dialysis_hour">Dialysis Hour</Label>
        <Input id="dialysis_hour" type="number" value={values.dialysis_hour ?? ''} onChange={(e) => setValues({ ...values, dialysis_hour: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_pressure_systolic">Blood Pressure Systolic</Label>
        <Input id="blood_pressure_systolic" type="number" value={values.blood_pressure_systolic ?? ''} onChange={(e) => setValues({ ...values, blood_pressure_systolic: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_pressure_diastolic">Blood Pressure Diastolic</Label>
        <Input id="blood_pressure_diastolic" type="number" value={values.blood_pressure_diastolic ?? ''} onChange={(e) => setValues({ ...values, blood_pressure_diastolic: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_flow_rate">Blood Flow Rate</Label>
        <Input id="blood_flow_rate" type="number" value={values.blood_flow_rate ?? ''} onChange={(e) => setValues({ ...values, blood_flow_rate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dialysate_flow_rate">Dialysate Flow Rate</Label>
        <Input id="dialysate_flow_rate" type="number" value={values.dialysate_flow_rate ?? ''} onChange={(e) => setValues({ ...values, dialysate_flow_rate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ultrafiltration_rate">Ultrafiltration Rate</Label>
        <Input id="ultrafiltration_rate" type="number" value={values.ultrafiltration_rate ?? ''} onChange={(e) => setValues({ ...values, ultrafiltration_rate: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="venous_pressure">Venous Pressure</Label>
        <Input id="venous_pressure" type="number" value={values.venous_pressure ?? ''} onChange={(e) => setValues({ ...values, venous_pressure: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="transmembrane_pressure">Transmembrane Pressure</Label>
        <Input id="transmembrane_pressure" type="number" value={values.transmembrane_pressure ?? ''} onChange={(e) => setValues({ ...values, transmembrane_pressure: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="symptoms">Symptoms</Label>
        <Input id="symptoms" type="text" value={values.symptoms ?? ''} onChange={(e) => setValues({ ...values, symptoms: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="monitored_at">Monitored At</Label>
        <Input id="monitored_at" type="date" value={values.monitored_at ?? ''} onChange={(e) => setValues({ ...values, monitored_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
