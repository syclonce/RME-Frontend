import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useLeftoverMedicationVoucherResource } from '../api'
import type { LeftoverMedicationVoucherFormValues } from '../types'

export function LeftoverMedicationVoucherFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useLeftoverMedicationVoucherResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<LeftoverMedicationVoucherFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as LeftoverMedicationVoucherFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/layanan-leftover-medication-voucher') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/layanan-leftover-medication-voucher') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} LeftoverMedicationVoucher</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="voucher_number">Voucher Number *</Label>
        <Input id="voucher_number" type="text" value={values.voucher_number ?? ''} onChange={(e) => setValues({ ...values, voucher_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <RelationSelect
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="prescription_id">Prescription</Label>
        <RelationSelect
          endpoint="/prescriptions"
          value={values.prescription_id ?? null}
          onChange={(v) => setValues({ ...values, prescription_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="text" value={values.status ?? ''} onChange={(e) => setValues({ ...values, status: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="issued_at">Issued At *</Label>
        <Input id="issued_at" type="date" value={values.issued_at ?? ''} onChange={(e) => setValues({ ...values, issued_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="redeemed_at">Redeemed At</Label>
        <Input id="redeemed_at" type="date" value={values.redeemed_at ?? ''} onChange={(e) => setValues({ ...values, redeemed_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
