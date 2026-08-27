import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAdmissionMedicationReconciliationResource } from '../api'
import type { AdmissionMedicationReconciliationFormValues } from '../types'

export function AdmissionMedicationReconciliationFormPage() {
  const navigate = useNavigate()
  const { create } = useAdmissionMedicationReconciliationResource()
  const [values, setValues] = useState<AdmissionMedicationReconciliationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-admission-medication-reconciliation') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AdmissionMedicationReconciliation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reconciled_by">Reconciled By *</Label>
        <Input id="reconciled_by" type="number" value={values.reconciled_by ?? ''} onChange={(e) => setValues({ ...values, reconciled_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <Input id="created_by" type="number" value={values.created_by ?? ''} onChange={(e) => setValues({ ...values, created_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="source_of_medication_list">Source Of Medication List</Label>
        <Input id="source_of_medication_list" type="text" value={values.source_of_medication_list ?? ''} onChange={(e) => setValues({ ...values, source_of_medication_list: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reconciled_at">Reconciled At</Label>
        <Input id="reconciled_at" type="date" value={values.reconciled_at ?? ''} onChange={(e) => setValues({ ...values, reconciled_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
