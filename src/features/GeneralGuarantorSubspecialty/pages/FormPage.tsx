import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useGuarantorSubspecialtyResource } from '../api'
import type { GuarantorSubspecialtyFormValues } from '../types'

export function GuarantorSubspecialtyFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useGuarantorSubspecialtyResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<GuarantorSubspecialtyFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as GuarantorSubspecialtyFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-guarantor-subspecialty') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-guarantor-subspecialty') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} GuarantorSubspecialty</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="guarantor_id">Guarantor *</Label>
        <RelationSelect
          endpoint="/guarantors"
          value={values.guarantor_id ?? null}
          onChange={(v) => setValues({ ...values, guarantor_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="subspecialty_name">Subspecialty Name *</Label>
        <Input id="subspecialty_name" type="text" value={values.subspecialty_name ?? ''} onChange={(e) => setValues({ ...values, subspecialty_name: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_covered" checked={!!values.is_covered} onCheckedChange={(v) => setValues({ ...values, is_covered: !!v })} />
        <Label htmlFor="is_covered">Is Covered</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="coverage_note">Coverage Note</Label>
        <Input id="coverage_note" type="text" value={values.coverage_note ?? ''} onChange={(e) => setValues({ ...values, coverage_note: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
