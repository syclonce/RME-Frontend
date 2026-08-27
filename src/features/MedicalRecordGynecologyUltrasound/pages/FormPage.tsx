import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGynecologyUltrasoundResource } from '../api'
import type { GynecologyUltrasoundFormValues } from '../types'

export function GynecologyUltrasoundFormPage() {
  const { create } = useGynecologyUltrasoundResource()
  const [values, setValues] = useState<GynecologyUltrasoundFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah GynecologyUltrasound</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <Input id="patient_id" type="number" value={values.patient_id ?? ''} onChange={(e) => setValues({ ...values, patient_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <Input id="visit_id" type="number" value={values.visit_id ?? ''} onChange={(e) => setValues({ ...values, visit_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="doctor_id">Doctor</Label>
        <Input id="doctor_id" type="number" value={values.doctor_id ?? ''} onChange={(e) => setValues({ ...values, doctor_id: e.target.value === '' ? null : Number(e.target.value) })} />
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
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
