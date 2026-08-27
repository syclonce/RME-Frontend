import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useCoManagementResource } from '../api'
import type { CoManagementFormValues } from '../types'

export function CoManagementFormPage() {
  const navigate = useNavigate()
  const { create } = useCoManagementResource()
  const [values, setValues] = useState<CoManagementFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/pendaftaran-co-management') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah CoManagement</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_id">Employee *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.employee_id ?? null}
          onChange={(v) => setValues({ ...values, employee_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="started_at">Started At</Label>
        <Input id="started_at" type="date" value={values.started_at ?? ''} onChange={(e) => setValues({ ...values, started_at: e.target.value })} />
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
