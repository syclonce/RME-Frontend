import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useEarExaminationResource } from '../api'
import type { EarExaminationFormValues } from '../types'

export function EarExaminationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useEarExaminationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<EarExaminationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as EarExaminationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-ear-examination') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-ear-examination') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} EarExamination</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="side">Side</Label>
        <Select value={values.side ?? ''} onValueChange={(v) => setValues({ ...values, side: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="left" value="left">Left</SelectItem>
            <SelectItem key="right" value="right">Right</SelectItem>
            <SelectItem key="bilateral" value="bilateral">Bilateral</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="otoscopy">Otoscopy</Label>
        <Input id="otoscopy" type="text" value={values.otoscopy ?? ''} onChange={(e) => setValues({ ...values, otoscopy: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tympanic_membrane">Tympanic Membrane</Label>
        <Input id="tympanic_membrane" type="text" value={values.tympanic_membrane ?? ''} onChange={(e) => setValues({ ...values, tympanic_membrane: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="hearing_test_result">Hearing Test Result</Label>
        <Input id="hearing_test_result" type="text" value={values.hearing_test_result ?? ''} onChange={(e) => setValues({ ...values, hearing_test_result: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="discharge" checked={!!values.discharge} onCheckedChange={(v) => setValues({ ...values, discharge: !!v })} />
        <Label htmlFor="discharge">Discharge</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="findings">Findings</Label>
        <Input id="findings" type="text" value={values.findings ?? ''} onChange={(e) => setValues({ ...values, findings: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
