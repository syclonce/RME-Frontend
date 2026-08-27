import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useDischargeMedicationReconciliationResource } from '../api'
import type { DischargeMedicationReconciliationFormValues } from '../types'

export function DischargeMedicationReconciliationFormPage() {
  const navigate = useNavigate()
  const { create } = useDischargeMedicationReconciliationResource()
  const [values, setValues] = useState<DischargeMedicationReconciliationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-discharge-medication-reconciliation') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah DischargeMedicationReconciliation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reconciled_by">Reconciled By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.reconciled_by ?? null}
          onChange={(v) => setValues({ ...values, reconciled_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <AsyncCombobox
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
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
        <Select value={values.status ?? ''} onValueChange={(v) => setValues({ ...values, status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="draft" value="draft">Draft</SelectItem>
            <SelectItem key="completed" value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
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
