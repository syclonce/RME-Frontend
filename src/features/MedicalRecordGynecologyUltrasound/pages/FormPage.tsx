import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useGynecologyUltrasoundResource } from '../api'
import type { GynecologyUltrasoundFormValues } from '../types'

export function GynecologyUltrasoundFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useGynecologyUltrasoundResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<GynecologyUltrasoundFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as GynecologyUltrasoundFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-gynecology-ultrasound') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-gynecology-ultrasound') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} GynecologyUltrasound</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <RelationSelect
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
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
        <Label htmlFor="doctor_id">Doctor</Label>
        <RelationSelect
          endpoint="/doctors"
          value={values.doctor_id ?? null}
          onChange={(v) => setValues({ ...values, doctor_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="exam_date">Exam Date *</Label>
        <Input id="exam_date" type="date" value={values.exam_date ?? ''} onChange={(e) => setValues({ ...values, exam_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="uterus_findings">Uterus Findings</Label>
        <Input id="uterus_findings" type="text" value={values.uterus_findings ?? ''} onChange={(e) => setValues({ ...values, uterus_findings: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="right_ovary_findings">Right Ovary Findings</Label>
        <Input id="right_ovary_findings" type="text" value={values.right_ovary_findings ?? ''} onChange={(e) => setValues({ ...values, right_ovary_findings: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="left_ovary_findings">Left Ovary Findings</Label>
        <Input id="left_ovary_findings" type="text" value={values.left_ovary_findings ?? ''} onChange={(e) => setValues({ ...values, left_ovary_findings: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="endometrial_thickness_mm">Endometrial Thickness Mm</Label>
        <Input id="endometrial_thickness_mm" type="number" value={values.endometrial_thickness_mm ?? ''} onChange={(e) => setValues({ ...values, endometrial_thickness_mm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="conclusion">Conclusion</Label>
        <Input id="conclusion" type="text" value={values.conclusion ?? ''} onChange={(e) => setValues({ ...values, conclusion: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
