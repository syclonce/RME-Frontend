import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { usePenjaminRSAttendingPhysicianResource } from '../api'
import type { PenjaminRSAttendingPhysicianFormValues } from '../types'

export function PenjaminRSAttendingPhysicianFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePenjaminRSAttendingPhysicianResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PenjaminRSAttendingPhysicianFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PenjaminRSAttendingPhysicianFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/penjamin-rsattending-physician') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/penjamin-rsattending-physician') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PenjaminRSAttendingPhysician</h1>
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
        <Label htmlFor="assigned_at">Assigned At</Label>
        <Input id="assigned_at" type="date" value={values.assigned_at ?? ''} onChange={(e) => setValues({ ...values, assigned_at: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_primary" checked={!!values.is_primary} onCheckedChange={(v) => setValues({ ...values, is_primary: !!v })} />
        <Label htmlFor="is_primary">Is Primary</Label>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
