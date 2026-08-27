import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useRecordFileLoanResource } from '../api'
import type { RecordFileLoanFormValues } from '../types'

export function RecordFileLoanFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useRecordFileLoanResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<RecordFileLoanFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as RecordFileLoanFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-record-file-loan') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-record-file-loan') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} RecordFileLoan</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <RelationSelect
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="borrower_name">Borrower Name *</Label>
        <Input id="borrower_name" type="text" value={values.borrower_name ?? ''} onChange={(e) => setValues({ ...values, borrower_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="borrower_unit">Borrower Unit</Label>
        <Input id="borrower_unit" type="text" value={values.borrower_unit ?? ''} onChange={(e) => setValues({ ...values, borrower_unit: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="purpose">Purpose</Label>
        <Input id="purpose" type="text" value={values.purpose ?? ''} onChange={(e) => setValues({ ...values, purpose: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="loaned_at">Loaned At *</Label>
        <Input id="loaned_at" type="date" value={values.loaned_at ?? ''} onChange={(e) => setValues({ ...values, loaned_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="due_at">Due At</Label>
        <Input id="due_at" type="date" value={values.due_at ?? ''} onChange={(e) => setValues({ ...values, due_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="returned_at">Returned At</Label>
        <Input id="returned_at" type="date" value={values.returned_at ?? ''} onChange={(e) => setValues({ ...values, returned_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Select value={values.status ?? ''} onValueChange={(v) => setValues({ ...values, status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="borrowed" value="borrowed">Borrowed</SelectItem>
            <SelectItem key="returned" value="returned">Returned</SelectItem>
            <SelectItem key="overdue" value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
