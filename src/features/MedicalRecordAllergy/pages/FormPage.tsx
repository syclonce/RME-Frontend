import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useAllergyResource } from '../api'
import type { AllergyFormValues } from '../types'

export function AllergyFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useAllergyResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<AllergyFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as AllergyFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-allergy') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-allergy') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Allergy</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <RelationSelect
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="category">Category *</Label>
        <Select value={values.category ?? ''} onValueChange={(v) => setValues({ ...values, category: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="drug" value="drug">Drug</SelectItem>
            <SelectItem key="food" value="food">Food</SelectItem>
            <SelectItem key="environment" value="environment">Environment</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="allergen">Allergen *</Label>
        <Input id="allergen" type="text" value={values.allergen ?? ''} onChange={(e) => setValues({ ...values, allergen: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reaction">Reaction</Label>
        <Input id="reaction" type="text" value={values.reaction ?? ''} onChange={(e) => setValues({ ...values, reaction: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="severity">Severity</Label>
        <Select value={values.severity ?? ''} onValueChange={(v) => setValues({ ...values, severity: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="mild" value="mild">Mild</SelectItem>
            <SelectItem key="moderate" value="moderate">Moderate</SelectItem>
            <SelectItem key="severe" value="severe">Severe</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.recorded_by ?? null}
          onChange={(v) => setValues({ ...values, recorded_by: v })}
        />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
