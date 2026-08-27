import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useConsultationAnswerResource } from '../api'
import type { ConsultationAnswerFormValues } from '../types'

export function ConsultationAnswerFormPage() {
  const { create } = useConsultationAnswerResource()
  const [values, setValues] = useState<ConsultationAnswerFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ConsultationAnswer</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="consultation_id">Consultation *</Label>
        <Input id="consultation_id" type="number" value={values.consultation_id ?? ''} onChange={(e) => setValues({ ...values, consultation_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="answered_by">Answered By *</Label>
        <Input id="answered_by" type="number" value={values.answered_by ?? ''} onChange={(e) => setValues({ ...values, answered_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="answered_at">Answered At</Label>
        <Input id="answered_at" type="date" value={values.answered_at ?? ''} onChange={(e) => setValues({ ...values, answered_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="answer">Answer</Label>
        <Input id="answer" type="text" value={values.answer ?? ''} onChange={(e) => setValues({ ...values, answer: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
