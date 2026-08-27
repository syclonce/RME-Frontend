import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useTransferMedicationReconciliationItemResource } from '../api'
import type { TransferMedicationReconciliationItemFormValues } from '../types'

export function TransferMedicationReconciliationItemFormPage() {
  const navigate = useNavigate()
  const { create } = useTransferMedicationReconciliationItemResource()
  const [values, setValues] = useState<TransferMedicationReconciliationItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-transfer-medication-reconciliation-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah TransferMedicationReconciliationItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="reconciliation_id">Reconciliation *</Label>
        <RelationSelect
          endpoint="/transfer-med-reconciliations"
          value={values.reconciliation_id ?? null}
          onChange={(v) => setValues({ ...values, reconciliation_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="drug_name">Drug Name *</Label>
        <Input id="drug_name" type="text" value={values.drug_name ?? ''} onChange={(e) => setValues({ ...values, drug_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dose">Dose</Label>
        <Input id="dose" type="text" value={values.dose ?? ''} onChange={(e) => setValues({ ...values, dose: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="frequency">Frequency</Label>
        <Input id="frequency" type="text" value={values.frequency ?? ''} onChange={(e) => setValues({ ...values, frequency: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="route">Route</Label>
        <Input id="route" type="text" value={values.route ?? ''} onChange={(e) => setValues({ ...values, route: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="action">Action *</Label>
        <Input id="action" type="text" value={values.action ?? ''} onChange={(e) => setValues({ ...values, action: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
