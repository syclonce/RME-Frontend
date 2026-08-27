import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useGynecologyHistoryResource } from '../api'
import type { GynecologyHistoryFormValues } from '../types'

export function GynecologyHistoryFormPage() {
  const navigate = useNavigate()
  const { create } = useGynecologyHistoryResource()
  const [values, setValues] = useState<GynecologyHistoryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-gynecology-history') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah GynecologyHistory</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <RelationSelect
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="menarche_age">Menarche Age</Label>
        <Input id="menarche_age" type="number" value={values.menarche_age ?? ''} onChange={(e) => setValues({ ...values, menarche_age: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="menstrual_cycle_pattern">Menstrual Cycle Pattern</Label>
        <Input id="menstrual_cycle_pattern" type="text" value={values.menstrual_cycle_pattern ?? ''} onChange={(e) => setValues({ ...values, menstrual_cycle_pattern: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="contraception_history">Contraception History</Label>
        <Input id="contraception_history" type="text" value={values.contraception_history ?? ''} onChange={(e) => setValues({ ...values, contraception_history: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gynecological_surgery_history">Gynecological Surgery History</Label>
        <Input id="gynecological_surgery_history" type="text" value={values.gynecological_surgery_history ?? ''} onChange={(e) => setValues({ ...values, gynecological_surgery_history: e.target.value })} />
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
