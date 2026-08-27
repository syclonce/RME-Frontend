import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useEndOfLifeEducationResource } from '../api'
import type { EndOfLifeEducationFormValues } from '../types'

export function EndOfLifeEducationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useEndOfLifeEducationResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<EndOfLifeEducationFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as EndOfLifeEducationFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-end-of-life-education') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-end-of-life-education') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} EndOfLifeEducation</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
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
        <RelationSelect
          endpoint="/employees"
          value={values.educator_id ?? null}
          onChange={(v) => setValues({ ...values, educator_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="educated_at">Educated At *</Label>
        <Input id="educated_at" type="date" value={values.educated_at ?? ''} onChange={(e) => setValues({ ...values, educated_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
