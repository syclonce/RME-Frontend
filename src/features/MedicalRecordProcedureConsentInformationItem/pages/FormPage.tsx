import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useProcedureConsentInformationItemResource } from '../api'
import type { ProcedureConsentInformationItemFormValues } from '../types'

export function ProcedureConsentInformationItemFormPage() {
  const navigate = useNavigate()
  const { create } = useProcedureConsentInformationItemResource()
  const [values, setValues] = useState<ProcedureConsentInformationItemFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-procedure-consent-information-item') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ProcedureConsentInformationItem</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="information_id">Information *</Label>
        <Input id="information_id" type="number" value={values.information_id ?? ''} onChange={(e) => setValues({ ...values, information_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="item_name">Item Name *</Label>
        <Input id="item_name" type="text" value={values.item_name ?? ''} onChange={(e) => setValues({ ...values, item_name: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_explained" checked={!!values.is_explained} onCheckedChange={(v) => setValues({ ...values, is_explained: !!v })} />
        <Label htmlFor="is_explained">Is Explained</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_understood" checked={!!values.is_understood} onCheckedChange={(v) => setValues({ ...values, is_understood: !!v })} />
        <Label htmlFor="is_understood">Is Understood</Label>
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
