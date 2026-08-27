import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useDrugInteractionRuleResource } from '../api'
import type { DrugInteractionRuleFormValues } from '../types'

export function DrugInteractionRuleFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useDrugInteractionRuleResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<DrugInteractionRuleFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as DrugInteractionRuleFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-drug-interaction-check') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-drug-interaction-check') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} DrugInteractionRule</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id_a">Item Id A *</Label>
        <RelationSelect
          endpoint="/items"
          value={values.item_id_a ?? null}
          onChange={(v) => setValues({ ...values, item_id_a: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id_b">Item Id B *</Label>
        <RelationSelect
          endpoint="/items"
          value={values.item_id_b ?? null}
          onChange={(v) => setValues({ ...values, item_id_b: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="severity">Severity *</Label>
        <Input id="severity" type="text" value={values.severity ?? ''} onChange={(e) => setValues({ ...values, severity: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="clinical_note">Clinical Note *</Label>
        <Input id="clinical_note" type="text" value={values.clinical_note ?? ''} onChange={(e) => setValues({ ...values, clinical_note: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
