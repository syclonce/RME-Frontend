import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useExaminationGroupMappingResource } from '../api'
import type { ExaminationGroupMappingFormValues } from '../types'

export function ExaminationGroupMappingFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useExaminationGroupMappingResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<ExaminationGroupMappingFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ExaminationGroupMappingFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-examination-group-mapping') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-examination-group-mapping') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ExaminationGroupMapping</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="examination_group_id">Examination Group *</Label>
        <Input id="examination_group_id" type="number" value={values.examination_group_id ?? ''} onChange={(e) => setValues({ ...values, examination_group_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mapping_category">Mapping Category *</Label>
        <Input id="mapping_category" type="text" value={values.mapping_category ?? ''} onChange={(e) => setValues({ ...values, mapping_category: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="external_code">External Code</Label>
        <Input id="external_code" type="text" value={values.external_code ?? ''} onChange={(e) => setValues({ ...values, external_code: e.target.value })} />
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
