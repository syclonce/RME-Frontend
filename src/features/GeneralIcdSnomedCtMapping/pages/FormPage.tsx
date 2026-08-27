import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useIcdSnomedCtMappingResource } from '../api'
import type { IcdSnomedCtMappingFormValues } from '../types'

export function IcdSnomedCtMappingFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useIcdSnomedCtMappingResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<IcdSnomedCtMappingFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as IcdSnomedCtMappingFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-icd-snomed-ct-mapping') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-icd-snomed-ct-mapping') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} IcdSnomedCtMapping</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="icd_code">Icd Code *</Label>
        <Input id="icd_code" type="text" value={values.icd_code ?? ''} onChange={(e) => setValues({ ...values, icd_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="snomed_code">Snomed Code *</Label>
        <Input id="snomed_code" type="text" value={values.snomed_code ?? ''} onChange={(e) => setValues({ ...values, snomed_code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="icd_description">Icd Description</Label>
        <Input id="icd_description" type="text" value={values.icd_description ?? ''} onChange={(e) => setValues({ ...values, icd_description: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="snomed_description">Snomed Description</Label>
        <Input id="snomed_description" type="text" value={values.snomed_description ?? ''} onChange={(e) => setValues({ ...values, snomed_description: e.target.value })} />
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
