import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEndOfLifePsychosocialRelationshipResource } from '../api'
import type { EndOfLifePsychosocialRelationshipFormValues } from '../types'

export function EndOfLifePsychosocialRelationshipFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useEndOfLifePsychosocialRelationshipResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<EndOfLifePsychosocialRelationshipFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as EndOfLifePsychosocialRelationshipFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-end-of-life-psychosocial-relationship') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-end-of-life-psychosocial-relationship') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} EndOfLifePsychosocialRelationship</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="relationship_type">Relationship Type</Label>
        <Input id="relationship_type" type="text" value={values.relationship_type ?? ''} onChange={(e) => setValues({ ...values, relationship_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="support_system">Support System</Label>
        <Input id="support_system" type="text" value={values.support_system ?? ''} onChange={(e) => setValues({ ...values, support_system: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="spiritual_needs">Spiritual Needs</Label>
        <Input id="spiritual_needs" type="text" value={values.spiritual_needs ?? ''} onChange={(e) => setValues({ ...values, spiritual_needs: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="emotional_state">Emotional State</Label>
        <Input id="emotional_state" type="text" value={values.emotional_state ?? ''} onChange={(e) => setValues({ ...values, emotional_state: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_by">Assessed By *</Label>
        <Input id="assessed_by" type="number" value={values.assessed_by ?? ''} onChange={(e) => setValues({ ...values, assessed_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_at">Assessed At *</Label>
        <Input id="assessed_at" type="date" value={values.assessed_at ?? ''} onChange={(e) => setValues({ ...values, assessed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
