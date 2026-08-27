import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMmpiTestResource } from '../api'
import type { MmpiTestFormValues } from '../types'

export function MmpiTestFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, detail } = useMmpiTestResource()
  const existing = detail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<MmpiTestFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as MmpiTestFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-mmpi-test') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-mmpi-test') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} MmpiTest</h1>
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
        <Label htmlFor="test_date">Test Date *</Label>
        <Input id="test_date" type="date" value={values.test_date ?? ''} onChange={(e) => setValues({ ...values, test_date: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="validity_scale_l">Validity Scale L</Label>
        <Input id="validity_scale_l" type="number" value={values.validity_scale_l ?? ''} onChange={(e) => setValues({ ...values, validity_scale_l: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="validity_scale_f">Validity Scale F</Label>
        <Input id="validity_scale_f" type="number" value={values.validity_scale_f ?? ''} onChange={(e) => setValues({ ...values, validity_scale_f: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="validity_scale_k">Validity Scale K</Label>
        <Input id="validity_scale_k" type="number" value={values.validity_scale_k ?? ''} onChange={(e) => setValues({ ...values, validity_scale_k: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="clinical_scales_summary">Clinical Scales Summary</Label>
        <Input id="clinical_scales_summary" type="text" value={values.clinical_scales_summary ?? ''} onChange={(e) => setValues({ ...values, clinical_scales_summary: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="interpretation">Interpretation</Label>
        <Input id="interpretation" type="text" value={values.interpretation ?? ''} onChange={(e) => setValues({ ...values, interpretation: e.target.value })} />
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
