import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useExaminationGroupMappingResource } from '../api'
import type { ExaminationGroupMappingFormValues } from '../types'

export function ExaminationGroupMappingFormPage() {
  const { create } = useExaminationGroupMappingResource()
  const [values, setValues] = useState<ExaminationGroupMappingFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ExaminationGroupMapping</h1>
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
