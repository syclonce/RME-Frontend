import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { usePracticeLicenseResource } from '../api'
import type { PracticeLicenseFormValues } from '../types'

export function PracticeLicenseFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = usePracticeLicenseResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<PracticeLicenseFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as PracticeLicenseFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/pegawai-practice-license') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/pegawai-practice-license') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} PracticeLicense</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="employee_id">Employee *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.employee_id ?? null}
          onChange={(v) => setValues({ ...values, employee_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="license_type">License Type *</Label>
        <Select value={values.license_type ?? ''} onValueChange={(v) => setValues({ ...values, license_type: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="STR" value="STR">STR</SelectItem>
            <SelectItem key="SIP" value="SIP">SIP</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="license_number">License Number *</Label>
        <Input id="license_number" type="text" value={values.license_number ?? ''} onChange={(e) => setValues({ ...values, license_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="issued_at">Issued At</Label>
        <Input id="issued_at" type="date" value={values.issued_at ?? ''} onChange={(e) => setValues({ ...values, issued_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="expires_at">Expires At</Label>
        <Input id="expires_at" type="date" value={values.expires_at ?? ''} onChange={(e) => setValues({ ...values, expires_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="issuing_authority">Issuing Authority</Label>
        <Input id="issuing_authority" type="text" value={values.issuing_authority ?? ''} onChange={(e) => setValues({ ...values, issuing_authority: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
