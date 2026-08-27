import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useSkinPrickTestExaminationResource } from '../api'
import type { SkinPrickTestExaminationFormValues } from '../types'

export function SkinPrickTestExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useSkinPrickTestExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<SkinPrickTestExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as SkinPrickTestExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-skin-prick-test-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-skin-prick-test-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} SkinPrickTestExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="allergen">Allergen *</Label>
        <Input id="allergen" type="text" value={values.allergen ?? ''} onChange={(e) => setValues({ ...values, allergen: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="wheal_size_mm">Wheal Size Mm</Label>
        <Input id="wheal_size_mm" type="number" value={values.wheal_size_mm ?? ''} onChange={(e) => setValues({ ...values, wheal_size_mm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="flare_size_mm">Flare Size Mm</Label>
        <Input id="flare_size_mm" type="number" value={values.flare_size_mm ?? ''} onChange={(e) => setValues({ ...values, flare_size_mm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="result">Result</Label>
        <Select value={values.result ?? ''} onValueChange={(v) => setValues({ ...values, result: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="positive" value="positive">Positive</SelectItem>
            <SelectItem key="negative" value="negative">Negative</SelectItem>
            <SelectItem key="equivocal" value="equivocal">Equivocal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reaction_onset_minutes">Reaction Onset Minutes</Label>
        <Input id="reaction_onset_minutes" type="number" value={values.reaction_onset_minutes ?? ''} onChange={(e) => setValues({ ...values, reaction_onset_minutes: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tested_at">Tested At</Label>
        <Input id="tested_at" type="date" value={values.tested_at ?? ''} onChange={(e) => setValues({ ...values, tested_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
