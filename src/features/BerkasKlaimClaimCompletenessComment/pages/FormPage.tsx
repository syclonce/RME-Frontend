import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBerkasKlaimClaimCompletenessCommentResource } from '../api'
import type { BerkasKlaimClaimCompletenessCommentFormValues } from '../types'

export function BerkasKlaimClaimCompletenessCommentFormPage() {
  const { create } = useBerkasKlaimClaimCompletenessCommentResource()
  const [values, setValues] = useState<BerkasKlaimClaimCompletenessCommentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BerkasKlaimClaimCompletenessComment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="claim_completeness_id">Claim Completeness *</Label>
        <Input id="claim_completeness_id" type="number" value={values.claim_completeness_id ?? ''} onChange={(e) => setValues({ ...values, claim_completeness_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="comment">Comment *</Label>
        <Input id="comment" type="text" value={values.comment ?? ''} onChange={(e) => setValues({ ...values, comment: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="commented_by">Commented By</Label>
        <Input id="commented_by" type="text" value={values.commented_by ?? ''} onChange={(e) => setValues({ ...values, commented_by: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="commented_at">Commented At</Label>
        <Input id="commented_at" type="date" value={values.commented_at ?? ''} onChange={(e) => setValues({ ...values, commented_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
