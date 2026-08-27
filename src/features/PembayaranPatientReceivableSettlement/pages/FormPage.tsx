import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePatientReceivableSettlementResource } from '../api'
import type { PatientReceivableSettlementFormValues } from '../types'

export function PatientReceivableSettlementFormPage() {
  const navigate = useNavigate()
  const { create } = usePatientReceivableSettlementResource()
  const [values, setValues] = useState<PatientReceivableSettlementFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pembayaran-patient-receivable-settlement') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PatientReceivableSettlement</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_receivable_id">Patient Receivable *</Label>
        <Input id="patient_receivable_id" type="number" value={values.patient_receivable_id ?? ''} onChange={(e) => setValues({ ...values, patient_receivable_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="paid_amount">Paid Amount *</Label>
        <Input id="paid_amount" type="number" value={values.paid_amount ?? ''} onChange={(e) => setValues({ ...values, paid_amount: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="paid_at">Paid At</Label>
        <Input id="paid_at" type="date" value={values.paid_at ?? ''} onChange={(e) => setValues({ ...values, paid_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
