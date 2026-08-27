import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useObstetricHistoryResource } from '../api'
import type { ObstetricHistoryFormValues } from '../types'

export function ObstetricHistoryFormPage() {
  const navigate = useNavigate()
  const { create } = useObstetricHistoryResource()
  const [values, setValues] = useState<ObstetricHistoryFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-obstetric-history') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ObstetricHistory</h1>
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
        <Label htmlFor="pregnancy_number">Pregnancy Number</Label>
        <Input id="pregnancy_number" type="number" value={values.pregnancy_number ?? ''} onChange={(e) => setValues({ ...values, pregnancy_number: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="delivery_date">Delivery Date</Label>
        <Input id="delivery_date" type="date" value={values.delivery_date ?? ''} onChange={(e) => setValues({ ...values, delivery_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="delivery_method">Delivery Method</Label>
        <Select value={values.delivery_method ?? ''} onValueChange={(v) => setValues({ ...values, delivery_method: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="normal" value="normal">Normal</SelectItem>
            <SelectItem key="cesarean" value="cesarean">Cesarean</SelectItem>
            <SelectItem key="vacuum" value="vacuum">Vacuum</SelectItem>
            <SelectItem key="forceps" value="forceps">Forceps</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="birth_weight_grams">Birth Weight Grams</Label>
        <Input id="birth_weight_grams" type="number" value={values.birth_weight_grams ?? ''} onChange={(e) => setValues({ ...values, birth_weight_grams: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="complications">Complications</Label>
        <Input id="complications" type="text" value={values.complications ?? ''} onChange={(e) => setValues({ ...values, complications: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="outcome">Outcome</Label>
        <Input id="outcome" type="text" value={values.outcome ?? ''} onChange={(e) => setValues({ ...values, outcome: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
