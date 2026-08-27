import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBerkasKlaimClaimCompletenessResource } from '../api'
import type { BerkasKlaimClaimCompletenessFormValues } from '../types'

export function BerkasKlaimClaimCompletenessFormPage() {
  const { create } = useBerkasKlaimClaimCompletenessResource()
  const [values, setValues] = useState<BerkasKlaimClaimCompletenessFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BerkasKlaimClaimCompleteness</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="claim_file_id">Claim File *</Label>
        <Input id="claim_file_id" type="number" value={values.claim_file_id ?? ''} onChange={(e) => setValues({ ...values, claim_file_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="checklist_item">Checklist Item *</Label>
        <Input id="checklist_item" type="text" value={values.checklist_item ?? ''} onChange={(e) => setValues({ ...values, checklist_item: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_complete" checked={!!values.is_complete} onCheckedChange={(v) => setValues({ ...values, is_complete: !!v })} />
        <Label htmlFor="is_complete">Is Complete</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="checked_by">Checked By</Label>
        <Input id="checked_by" type="text" value={values.checked_by ?? ''} onChange={(e) => setValues({ ...values, checked_by: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="checked_at">Checked At</Label>
        <Input id="checked_at" type="date" value={values.checked_at ?? ''} onChange={(e) => setValues({ ...values, checked_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
