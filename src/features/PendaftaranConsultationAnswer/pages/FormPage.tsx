import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useConsultationAnswerResource } from '../api'
import type { ConsultationAnswerFormValues } from '../types'

export function ConsultationAnswerFormPage() {
  const navigate = useNavigate()
  const { create } = useConsultationAnswerResource()
  const [values, setValues] = useState<ConsultationAnswerFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-consultation-answer') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ConsultationAnswer</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="consultation_id">Consultation *</Label>
        <RelationSelect
          endpoint="/consultations"
          value={values.consultation_id ?? null}
          onChange={(v) => setValues({ ...values, consultation_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="answered_by">Answered By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.answered_by ?? null}
          onChange={(v) => setValues({ ...values, answered_by: v })}
        />
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
