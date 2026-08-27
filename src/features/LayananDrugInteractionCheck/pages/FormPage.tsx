import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDrugInteractionRuleResource } from '../api'
import type { DrugInteractionRuleFormValues } from '../types'

export function DrugInteractionRuleFormPage() {
  const { create } = useDrugInteractionRuleResource()
  const [values, setValues] = useState<DrugInteractionRuleFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah DrugInteractionRule</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id_a">Item Id A *</Label>
        <Input id="item_id_a" type="number" value={values.item_id_a ?? ''} onChange={(e) => setValues({ ...values, item_id_a: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="item_id_b">Item Id B *</Label>
        <Input id="item_id_b" type="number" value={values.item_id_b ?? ''} onChange={(e) => setValues({ ...values, item_id_b: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="severity">Severity *</Label>
        <Input id="severity" type="text" value={values.severity ?? ''} onChange={(e) => setValues({ ...values, severity: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="clinical_note">Clinical Note *</Label>
        <Input id="clinical_note" type="text" value={values.clinical_note ?? ''} onChange={(e) => setValues({ ...values, clinical_note: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
