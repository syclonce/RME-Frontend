import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useReportTypeResource } from '../api'
import type { ReportTypeFormValues } from '../types'

export function ReportTypeFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useReportTypeResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ReportTypeFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ReportTypeFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-report-type') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-report-type') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ReportType</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="class_name">Class Name *</Label>
        <Input id="class_name" type="text" value={values.class_name ?? ''} onChange={(e) => setValues({ ...values, class_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="module">Module *</Label>
        <Input id="module" type="text" value={values.module ?? ''} onChange={(e) => setValues({ ...values, module: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="level">Level</Label>
        <Input id="level" type="number" value={values.level ?? ''} onChange={(e) => setValues({ ...values, level: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
