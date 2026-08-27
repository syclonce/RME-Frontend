import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePatientTransferSheetResource } from '../api'
import type { PatientTransferSheetFormValues } from '../types'

export function PatientTransferSheetFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePatientTransferSheetResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PatientTransferSheetFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PatientTransferSheetFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-patient-transfer-sheet') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-patient-transfer-sheet') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PatientTransferSheet</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="from_ward_id">From Ward</Label>
        <Input id="from_ward_id" type="number" value={values.from_ward_id ?? ''} onChange={(e) => setValues({ ...values, from_ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="to_ward_id">To Ward</Label>
        <Input id="to_ward_id" type="number" value={values.to_ward_id ?? ''} onChange={(e) => setValues({ ...values, to_ward_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="transfer_reason">Transfer Reason</Label>
        <Input id="transfer_reason" type="text" value={values.transfer_reason ?? ''} onChange={(e) => setValues({ ...values, transfer_reason: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_condition">Patient Condition</Label>
        <Input id="patient_condition" type="text" value={values.patient_condition ?? ''} onChange={(e) => setValues({ ...values, patient_condition: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="transferred_at">Transferred At</Label>
        <Input id="transferred_at" type="date" value={values.transferred_at ?? ''} onChange={(e) => setValues({ ...values, transferred_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="transferred_by">Transferred By</Label>
        <Input id="transferred_by" type="number" value={values.transferred_by ?? ''} onChange={(e) => setValues({ ...values, transferred_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
