import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePrescriptionInitialReviewResource } from '../api'
import type { PrescriptionInitialReviewFormValues } from '../types'

export function PrescriptionInitialReviewFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = usePrescriptionInitialReviewResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PrescriptionInitialReviewFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PrescriptionInitialReviewFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-prescription-initial-review') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-prescription-initial-review') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PrescriptionInitialReview</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_id">Prescription *</Label>
        <Input id="prescription_id" type="number" value={values.prescription_id ?? ''} onChange={(e) => setValues({ ...values, prescription_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reviewed_by">Reviewed By *</Label>
        <Input id="reviewed_by" type="number" value={values.reviewed_by ?? ''} onChange={(e) => setValues({ ...values, reviewed_by: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="reviewed_at">Reviewed At *</Label>
        <Input id="reviewed_at" type="date" value={values.reviewed_at ?? ''} onChange={(e) => setValues({ ...values, reviewed_at: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_appropriate" checked={!!values.is_appropriate} onCheckedChange={(v) => setValues({ ...values, is_appropriate: !!v })} />
        <Label htmlFor="is_appropriate">Is Appropriate</Label>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="issues_found">Issues Found</Label>
        <Input id="issues_found" type="text" value={values.issues_found ?? ''} onChange={(e) => setValues({ ...values, issues_found: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recommendation">Recommendation</Label>
        <Input id="recommendation" type="text" value={values.recommendation ?? ''} onChange={(e) => setValues({ ...values, recommendation: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
