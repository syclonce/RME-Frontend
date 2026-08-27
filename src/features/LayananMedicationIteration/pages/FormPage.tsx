import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMedicationIterationResource } from '../api'
import type { MedicationIterationFormValues } from '../types'

export function MedicationIterationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useMedicationIterationResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<MedicationIterationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as MedicationIterationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-medication-iteration') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-medication-iteration') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} MedicationIteration</h1>
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
