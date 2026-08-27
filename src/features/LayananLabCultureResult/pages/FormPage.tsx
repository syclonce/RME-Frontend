import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useLabCultureResultResource } from '../api'
import type { LabCultureResultFormValues } from '../types'

export function LabCultureResultFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useLabCultureResultResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<LabCultureResultFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as LabCultureResultFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-lab-culture-result') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-lab-culture-result') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} LabCultureResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="lab_order_id">Lab Order *</Label>
        <AsyncCombobox
          endpoint="/lab-orders"
          value={values.lab_order_id ?? null}
          onChange={(v) => setValues({ ...values, lab_order_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="specimen_type">Specimen Type *</Label>
        <Input id="specimen_type" type="text" value={values.specimen_type ?? ''} onChange={(e) => setValues({ ...values, specimen_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="organism_found">Organism Found</Label>
        <Input id="organism_found" type="text" value={values.organism_found ?? ''} onChange={(e) => setValues({ ...values, organism_found: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="colony_count">Colony Count</Label>
        <Input id="colony_count" type="text" value={values.colony_count ?? ''} onChange={(e) => setValues({ ...values, colony_count: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At *</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="result_status">Result Status *</Label>
        <Input id="result_status" type="text" value={values.result_status ?? ''} onChange={(e) => setValues({ ...values, result_status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
