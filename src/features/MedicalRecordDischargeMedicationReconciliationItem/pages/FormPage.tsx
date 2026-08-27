import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useDischargeMedicationReconciliationItemResource } from '../api'
import type { DischargeMedicationReconciliationItemFormValues } from '../types'

export function DischargeMedicationReconciliationItemFormPage() {
  const navigate = useNavigate()
  const { create } = useDischargeMedicationReconciliationItemResource()
  const [values, setValues] = useState<DischargeMedicationReconciliationItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-discharge-medication-reconciliation-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah DischargeMedicationReconciliationItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="reconciliation_id">Reconciliation *</Label>
        <RelationSelect
          endpoint="/discharge-med-reconciliations"
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
        <Select value={values.action ?? ''} onValueChange={(v) => setValues({ ...values, action: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="continue" value="continue">Continue</SelectItem>
            <SelectItem key="hold" value="hold">Hold</SelectItem>
            <SelectItem key="discontinue" value="discontinue">Discontinue</SelectItem>
            <SelectItem key="modify" value="modify">Modify</SelectItem>
            <SelectItem key="new" value="new">New</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reason">Reason</Label>
        <Input id="reason" type="text" value={values.reason ?? ''} onChange={(e) => setValues({ ...values, reason: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="patient_education_given" checked={!!values.patient_education_given} onCheckedChange={(v) => setValues({ ...values, patient_education_given: !!v })} />
        <Label htmlFor="patient_education_given">Patient Education Given</Label>
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
