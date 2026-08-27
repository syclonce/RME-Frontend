import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMedicationIterationResource } from '../api'
import type { MedicationIterationFormValues } from '../types'

export function MedicationIterationFormPage() {
  const { create } = useMedicationIterationResource()
  const [values, setValues] = useState<MedicationIterationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah MedicationIteration</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_id">Prescription *</Label>
        <Input id="prescription_id" type="number" value={values.prescription_id ?? ''} onChange={(e) => setValues({ ...values, prescription_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="iteration_number">Iteration Number *</Label>
        <Input id="iteration_number" type="number" value={values.iteration_number ?? ''} onChange={(e) => setValues({ ...values, iteration_number: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantity">Quantity *</Label>
        <Input id="quantity" type="number" value={values.quantity ?? ''} onChange={(e) => setValues({ ...values, quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dispensed_at">Dispensed At</Label>
        <Input id="dispensed_at" type="date" value={values.dispensed_at ?? ''} onChange={(e) => setValues({ ...values, dispensed_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status *</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
