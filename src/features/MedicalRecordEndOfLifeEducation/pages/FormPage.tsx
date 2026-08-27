import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEndOfLifeEducationResource } from '../api'
import type { EndOfLifeEducationFormValues } from '../types'

export function EndOfLifeEducationFormPage() {
  const { create } = useEndOfLifeEducationResource()
  const [values, setValues] = useState<EndOfLifeEducationFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah EndOfLifeEducation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="topic">Topic *</Label>
        <Input id="topic" type="text" value={values.topic ?? ''} onChange={(e) => setValues({ ...values, topic: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="participants">Participants</Label>
        <Input id="participants" type="text" value={values.participants ?? ''} onChange={(e) => setValues({ ...values, participants: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="decision_summary">Decision Summary</Label>
        <Input id="decision_summary" type="text" value={values.decision_summary ?? ''} onChange={(e) => setValues({ ...values, decision_summary: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="educator_id">Educator *</Label>
        <Input id="educator_id" type="number" value={values.educator_id ?? ''} onChange={(e) => setValues({ ...values, educator_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="educated_at">Educated At *</Label>
        <Input id="educated_at" type="date" value={values.educated_at ?? ''} onChange={(e) => setValues({ ...values, educated_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
