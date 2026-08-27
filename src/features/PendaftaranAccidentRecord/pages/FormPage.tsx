import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAccidentRecordResource } from '../api'
import type { AccidentRecordFormValues } from '../types'

export function AccidentRecordFormPage() {
  const navigate = useNavigate()
  const { create } = useAccidentRecordResource()
  const [values, setValues] = useState<AccidentRecordFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-accident-record') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah AccidentRecord</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="accident_type">Accident Type *</Label>
        <Input id="accident_type" type="text" value={values.accident_type ?? ''} onChange={(e) => setValues({ ...values, accident_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="accident_at">Accident At *</Label>
        <Input id="accident_at" type="date" value={values.accident_at ?? ''} onChange={(e) => setValues({ ...values, accident_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="location">Location *</Label>
        <Input id="location" type="text" value={values.location ?? ''} onChange={(e) => setValues({ ...values, location: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="police_report_number">Police Report Number</Label>
        <Input id="police_report_number" type="text" value={values.police_report_number ?? ''} onChange={(e) => setValues({ ...values, police_report_number: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
