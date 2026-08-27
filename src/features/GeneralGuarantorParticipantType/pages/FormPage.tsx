import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGuarantorParticipantTypeResource } from '../api'
import type { GuarantorParticipantTypeFormValues } from '../types'

export function GuarantorParticipantTypeFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useGuarantorParticipantTypeResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<GuarantorParticipantTypeFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as GuarantorParticipantTypeFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-guarantor-participant-type') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-guarantor-participant-type') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} GuarantorParticipantType</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="code">Code</Label>
        <Input id="code" type="text" value={values.code ?? ''} onChange={(e) => setValues({ ...values, code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="payer_type">Payer Type *</Label>
        <Input id="payer_type" type="text" value={values.payer_type ?? ''} onChange={(e) => setValues({ ...values, payer_type: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="requires_verification" checked={!!values.requires_verification} onCheckedChange={(v) => setValues({ ...values, requires_verification: !!v })} />
        <Label htmlFor="requires_verification">Requires Verification</Label>
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
