import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRehabilitationProcedureExaminationItemResource } from '../api'
import type { RehabilitationProcedureExaminationItemFormValues } from '../types'

export function RehabilitationProcedureExaminationItemFormPage() {
  const { create } = useRehabilitationProcedureExaminationItemResource()
  const [values, setValues] = useState<RehabilitationProcedureExaminationItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah RehabilitationProcedureExaminationItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="rehabilitation_procedure_examination_id">Rehabilitation Procedure Examination *</Label>
        <Input id="rehabilitation_procedure_examination_id" type="number" value={values.rehabilitation_procedure_examination_id ?? ''} onChange={(e) => setValues({ ...values, rehabilitation_procedure_examination_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="step_name">Step Name *</Label>
        <Input id="step_name" type="text" value={values.step_name ?? ''} onChange={(e) => setValues({ ...values, step_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="duration_minutes">Duration Minutes</Label>
        <Input id="duration_minutes" type="number" value={values.duration_minutes ?? ''} onChange={(e) => setValues({ ...values, duration_minutes: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="result">Result</Label>
        <Input id="result" type="text" value={values.result ?? ''} onChange={(e) => setValues({ ...values, result: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="sequence">Sequence</Label>
        <Input id="sequence" type="number" value={values.sequence ?? ''} onChange={(e) => setValues({ ...values, sequence: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
