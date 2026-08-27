import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRecordFileLoanResource } from '../api'
import type { RecordFileLoanFormValues } from '../types'

export function RecordFileLoanFormPage() {
  const { create } = useRecordFileLoanResource()
  const [values, setValues] = useState<RecordFileLoanFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah RecordFileLoan</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="borrower_name">Borrower Name *</Label>
        <Input id="borrower_name" type="text" value={values.borrower_name ?? ''} onChange={(e) => setValues({ ...values, borrower_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="borrower_unit">Borrower Unit</Label>
        <Input id="borrower_unit" type="text" value={values.borrower_unit ?? ''} onChange={(e) => setValues({ ...values, borrower_unit: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="purpose">Purpose</Label>
        <Input id="purpose" type="text" value={values.purpose ?? ''} onChange={(e) => setValues({ ...values, purpose: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="loaned_at">Loaned At *</Label>
        <Input id="loaned_at" type="date" value={values.loaned_at ?? ''} onChange={(e) => setValues({ ...values, loaned_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="due_at">Due At</Label>
        <Input id="due_at" type="date" value={values.due_at ?? ''} onChange={(e) => setValues({ ...values, due_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="returned_at">Returned At</Label>
        <Input id="returned_at" type="date" value={values.returned_at ?? ''} onChange={(e) => setValues({ ...values, returned_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
