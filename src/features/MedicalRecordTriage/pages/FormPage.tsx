import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useTriageResource } from '../api'
import type { TriageFormValues } from '../types'

export function TriageFormPage() {
  const navigate = useNavigate()
  const { create } = useTriageResource()
  const [values, setValues] = useState<TriageFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-triage') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Triage</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="level">Level *</Label>
        <Input id="level" type="number" value={values.level ?? ''} onChange={(e) => setValues({ ...values, level: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="chief_complaint">Chief Complaint</Label>
        <Input id="chief_complaint" type="text" value={values.chief_complaint ?? ''} onChange={(e) => setValues({ ...values, chief_complaint: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_by">Assessed By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.assessed_by ?? null}
          onChange={(v) => setValues({ ...values, assessed_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_at">Assessed At</Label>
        <Input id="assessed_at" type="date" value={values.assessed_at ?? ''} onChange={(e) => setValues({ ...values, assessed_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
