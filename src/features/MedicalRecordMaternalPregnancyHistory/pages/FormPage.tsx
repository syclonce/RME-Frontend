import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useMaternalPregnancyHistoryResource } from '../api'
import type { MaternalPregnancyHistoryFormValues } from '../types'

export function MaternalPregnancyHistoryFormPage() {
  const navigate = useNavigate()
  const { create } = useMaternalPregnancyHistoryResource()
  const [values, setValues] = useState<MaternalPregnancyHistoryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-maternal-pregnancy-history') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah MaternalPregnancyHistory</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <AsyncCombobox
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gravida">Gravida</Label>
        <Input id="gravida" type="number" value={values.gravida ?? ''} onChange={(e) => setValues({ ...values, gravida: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="para">Para</Label>
        <Input id="para" type="number" value={values.para ?? ''} onChange={(e) => setValues({ ...values, para: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="abortus">Abortus</Label>
        <Input id="abortus" type="number" value={values.abortus ?? ''} onChange={(e) => setValues({ ...values, abortus: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pregnancy_complications">Pregnancy Complications</Label>
        <Input id="pregnancy_complications" type="text" value={values.pregnancy_complications ?? ''} onChange={(e) => setValues({ ...values, pregnancy_complications: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="delivery_method_history">Delivery Method History</Label>
        <Input id="delivery_method_history" type="text" value={values.delivery_method_history ?? ''} onChange={(e) => setValues({ ...values, delivery_method_history: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
