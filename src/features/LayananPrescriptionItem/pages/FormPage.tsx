import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { usePrescriptionItemResource } from '../api'
import type { PrescriptionItemFormValues } from '../types'

export function PrescriptionItemFormPage() {
  const navigate = useNavigate()
  const { create } = usePrescriptionItemResource()
  const [values, setValues] = useState<PrescriptionItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-prescription-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PrescriptionItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_id">Prescription *</Label>
        <AsyncCombobox
          endpoint="/prescriptions"
          value={values.prescription_id ?? null}
          onChange={(v) => setValues({ ...values, prescription_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id">Item</Label>
        <RelationSelect
          endpoint="/items"
          value={values.item_id ?? null}
          onChange={(v) => setValues({ ...values, item_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="drug_name">Drug Name *</Label>
        <Input id="drug_name" type="text" value={values.drug_name ?? ''} onChange={(e) => setValues({ ...values, drug_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dosage">Dosage *</Label>
        <Input id="dosage" type="text" value={values.dosage ?? ''} onChange={(e) => setValues({ ...values, dosage: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="frequency">Frequency *</Label>
        <Input id="frequency" type="text" value={values.frequency ?? ''} onChange={(e) => setValues({ ...values, frequency: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="route">Route</Label>
        <Input id="route" type="text" value={values.route ?? ''} onChange={(e) => setValues({ ...values, route: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="duration">Duration</Label>
        <Input id="duration" type="text" value={values.duration ?? ''} onChange={(e) => setValues({ ...values, duration: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" type="number" value={values.quantity ?? ''} onChange={(e) => setValues({ ...values, quantity: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
