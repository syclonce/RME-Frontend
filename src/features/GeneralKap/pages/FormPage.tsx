import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useKapResource } from '../api'
import type { KapFormValues } from '../types'

export function KapFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useKapResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<KapFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as KapFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-kap') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-kap') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Kap</h1>
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
