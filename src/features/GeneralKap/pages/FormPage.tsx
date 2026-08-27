import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useKapResource } from '../api'
import type { KapFormValues } from '../types'

export function KapFormPage() {
  const { create } = useKapResource()
  const [values, setValues] = useState<KapFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Kap</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_norm">Patient Norm *</Label>
        <Input id="patient_norm" type="text" value={values.patient_norm ?? ''} onChange={(e) => setValues({ ...values, patient_norm: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="card_type">Card Type *</Label>
        <Input id="card_type" type="text" value={values.card_type ?? ''} onChange={(e) => setValues({ ...values, card_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="card_number">Card Number *</Label>
        <Input id="card_number" type="text" value={values.card_number ?? ''} onChange={(e) => setValues({ ...values, card_number: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
