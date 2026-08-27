import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useBerkasKlaimClaimCompletenessCommentResource } from '../api'
import type { BerkasKlaimClaimCompletenessCommentFormValues } from '../types'

export function BerkasKlaimClaimCompletenessCommentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useBerkasKlaimClaimCompletenessCommentResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<BerkasKlaimClaimCompletenessCommentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as BerkasKlaimClaimCompletenessCommentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/berkas-klaim-claim-completeness-comment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/berkas-klaim-claim-completeness-comment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} BerkasKlaimClaimCompletenessComment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="claim_completeness_id">Claim Completeness *</Label>
        <RelationSelect
          endpoint="/claim-completeness"
          value={values.claim_completeness_id ?? null}
          onChange={(v) => setValues({ ...values, claim_completeness_id: v })}
        />
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
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
