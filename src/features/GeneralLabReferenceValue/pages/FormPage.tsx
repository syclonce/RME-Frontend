import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useLabReferenceValueResource } from '../api'
import type { LabReferenceValueFormValues } from '../types'

export function LabReferenceValueFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useLabReferenceValueResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<LabReferenceValueFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as LabReferenceValueFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-lab-reference-value') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-lab-reference-value') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} LabReferenceValue</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_service_parameter_id">Lab Service Parameter *</Label>
        <RelationSelect
          endpoint="/lab-service-parameters"
          value={values.lab_service_parameter_id ?? null}
          onChange={(v) => setValues({ ...values, lab_service_parameter_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gender">Gender</Label>
        <Select value={values.gender ?? ''} onValueChange={(v) => setValues({ ...values, gender: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="male" value="male">Male</SelectItem>
            <SelectItem key="female" value="female">Female</SelectItem>
            <SelectItem key="all" value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="min_age">Min Age</Label>
        <Input id="min_age" type="number" value={values.min_age ?? ''} onChange={(e) => setValues({ ...values, min_age: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="max_age">Max Age</Label>
        <Input id="max_age" type="number" value={values.max_age ?? ''} onChange={(e) => setValues({ ...values, max_age: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="min_value">Min Value</Label>
        <Input id="min_value" type="number" value={values.min_value ?? ''} onChange={(e) => setValues({ ...values, min_value: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="max_value">Max Value</Label>
        <Input id="max_value" type="number" value={values.max_value ?? ''} onChange={(e) => setValues({ ...values, max_value: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="unit">Unit</Label>
        <Input id="unit" type="text" value={values.unit ?? ''} onChange={(e) => setValues({ ...values, unit: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="note">Note</Label>
        <Input id="note" type="text" value={values.note ?? ''} onChange={(e) => setValues({ ...values, note: e.target.value })} />
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
