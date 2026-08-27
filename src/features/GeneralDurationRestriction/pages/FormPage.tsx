import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDurationRestrictionResource } from '../api'
import type { DurationRestrictionFormValues } from '../types'

export function DurationRestrictionFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useDurationRestrictionResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<DurationRestrictionFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as DurationRestrictionFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-duration-restriction') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-duration-restriction') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} DurationRestriction</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="antibiotic_name">Antibiotic Name *</Label>
        <Input id="antibiotic_name" type="text" value={values.antibiotic_name ?? ''} onChange={(e) => setValues({ ...values, antibiotic_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="max_days">Max Days *</Label>
        <Input id="max_days" type="number" value={values.max_days ?? ''} onChange={(e) => setValues({ ...values, max_days: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="min_days">Min Days</Label>
        <Input id="min_days" type="number" value={values.min_days ?? ''} onChange={(e) => setValues({ ...values, min_days: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="requires_reevaluation" checked={!!values.requires_reevaluation} onCheckedChange={(v) => setValues({ ...values, requires_reevaluation: !!v })} />
        <Label htmlFor="requires_reevaluation">Requires Reevaluation</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
