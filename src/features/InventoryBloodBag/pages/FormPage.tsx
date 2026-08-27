import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useBloodBagResource } from '../api'
import type { BloodBagFormValues } from '../types'

export function BloodBagFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useBloodBagResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<BloodBagFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as BloodBagFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-blood-bag') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-blood-bag') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} BloodBag</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="bag_number">Bag Number *</Label>
        <Input id="bag_number" type="text" value={values.bag_number ?? ''} onChange={(e) => setValues({ ...values, bag_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="blood_type_id">Blood Type *</Label>
        <RelationSelect
          endpoint="/blood_types"
          value={values.blood_type_id ?? null}
          onChange={(v) => setValues({ ...values, blood_type_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="volume_ml">Volume Ml *</Label>
        <Input id="volume_ml" type="number" value={values.volume_ml ?? ''} onChange={(e) => setValues({ ...values, volume_ml: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="collected_at">Collected At *</Label>
        <Input id="collected_at" type="date" value={values.collected_at ?? ''} onChange={(e) => setValues({ ...values, collected_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="expires_at">Expires At *</Label>
        <Input id="expires_at" type="date" value={values.expires_at ?? ''} onChange={(e) => setValues({ ...values, expires_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
