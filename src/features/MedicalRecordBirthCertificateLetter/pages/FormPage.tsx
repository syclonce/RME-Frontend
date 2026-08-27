import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useBirthCertificateLetterResource } from '../api'
import type { BirthCertificateLetterFormValues } from '../types'

export function BirthCertificateLetterFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useBirthCertificateLetterResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<BirthCertificateLetterFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as BirthCertificateLetterFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-birth-certificate-letter') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-birth-certificate-letter') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} BirthCertificateLetter</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="letter_number">Letter Number *</Label>
        <Input id="letter_number" type="text" value={values.letter_number ?? ''} onChange={(e) => setValues({ ...values, letter_number: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <AsyncCombobox
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mother_patient_id">Mother Patient</Label>
        <AsyncCombobox
          endpoint="/patients"
          value={values.mother_patient_id ?? null}
          onChange={(v) => setValues({ ...values, mother_patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="doctor_id">Doctor *</Label>
        <RelationSelect
          endpoint="/doctors"
          value={values.doctor_id ?? null}
          onChange={(v) => setValues({ ...values, doctor_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="issue_date">Issue Date *</Label>
        <Input id="issue_date" type="date" value={values.issue_date ?? ''} onChange={(e) => setValues({ ...values, issue_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="child_name">Child Name</Label>
        <Input id="child_name" type="text" value={values.child_name ?? ''} onChange={(e) => setValues({ ...values, child_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="birth_date_time">Birth Date Time</Label>
        <Input id="birth_date_time" type="date" value={values.birth_date_time ?? ''} onChange={(e) => setValues({ ...values, birth_date_time: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="birth_weight_grams">Birth Weight Grams</Label>
        <Input id="birth_weight_grams" type="number" value={values.birth_weight_grams ?? ''} onChange={(e) => setValues({ ...values, birth_weight_grams: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="birth_length_cm">Birth Length Cm</Label>
        <Input id="birth_length_cm" type="number" value={values.birth_length_cm ?? ''} onChange={(e) => setValues({ ...values, birth_length_cm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gender">Gender</Label>
        <Input id="gender" type="text" value={values.gender ?? ''} onChange={(e) => setValues({ ...values, gender: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="remarks">Remarks</Label>
        <Input id="remarks" type="text" value={values.remarks ?? ''} onChange={(e) => setValues({ ...values, remarks: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
