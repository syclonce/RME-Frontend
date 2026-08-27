import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useGuarantorWardAccessResource } from '../api'
import type { GuarantorWardAccessFormValues } from '../types'

export function GuarantorWardAccessFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useGuarantorWardAccessResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<GuarantorWardAccessFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as GuarantorWardAccessFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-guarantor-ward-access') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-guarantor-ward-access') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} GuarantorWardAccess</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="guarantor_id">Guarantor *</Label>
        <RelationSelect
          endpoint="/guarantors"
          value={values.guarantor_id ?? null}
          onChange={(v) => setValues({ ...values, guarantor_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ward_id">Ward *</Label>
        <RelationSelect
          endpoint="/wards"
          value={values.ward_id ?? null}
          onChange={(v) => setValues({ ...values, ward_id: v })}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_allowed" checked={!!values.is_allowed} onCheckedChange={(v) => setValues({ ...values, is_allowed: !!v })} />
        <Label htmlFor="is_allowed">Is Allowed</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
