import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useUltrasoundGuidedProcedureResource } from '../api'
import type { UltrasoundGuidedProcedureFormValues } from '../types'

export function UltrasoundGuidedProcedureFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useUltrasoundGuidedProcedureResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<UltrasoundGuidedProcedureFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as UltrasoundGuidedProcedureFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-ultrasound-guided-procedure') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-ultrasound-guided-procedure') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} UltrasoundGuidedProcedure</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient *</Label>
        <AsyncCombobox
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
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
        <Label htmlFor="doctor_id">Doctor</Label>
        <RelationSelect
          endpoint="/doctors"
          value={values.doctor_id ?? null}
          onChange={(v) => setValues({ ...values, doctor_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="procedure_name">Procedure Name *</Label>
        <Input id="procedure_name" type="text" value={values.procedure_name ?? ''} onChange={(e) => setValues({ ...values, procedure_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="target_site">Target Site</Label>
        <Input id="target_site" type="text" value={values.target_site ?? ''} onChange={(e) => setValues({ ...values, target_site: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="needle_gauge">Needle Gauge</Label>
        <Input id="needle_gauge" type="text" value={values.needle_gauge ?? ''} onChange={(e) => setValues({ ...values, needle_gauge: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="findings_and_outcome">Findings And Outcome</Label>
        <Input id="findings_and_outcome" type="text" value={values.findings_and_outcome ?? ''} onChange={(e) => setValues({ ...values, findings_and_outcome: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="complications">Complications</Label>
        <Input id="complications" type="text" value={values.complications ?? ''} onChange={(e) => setValues({ ...values, complications: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="performed_at">Performed At *</Label>
        <Input id="performed_at" type="date" value={values.performed_at ?? ''} onChange={(e) => setValues({ ...values, performed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
