import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useMorseFallScaleAssessmentResource } from '../api'
import type { MorseFallScaleAssessmentFormValues } from '../types'

export function MorseFallScaleAssessmentFormPage() {
  const navigate = useNavigate()
  const { create } = useMorseFallScaleAssessmentResource()
  const [values, setValues] = useState<MorseFallScaleAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-morse-fall-scale-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah MorseFallScaleAssessment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_by">Assessed By *</Label>
        <AsyncCombobox
          endpoint="/employees"
          value={values.assessed_by ?? null}
          onChange={(v) => setValues({ ...values, assessed_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <AsyncCombobox
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="history_of_falling">History Of Falling *</Label>
        <Select value={values.history_of_falling ?? ''} onValueChange={(v) => setValues({ ...values, history_of_falling: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="0" value="0">0</SelectItem>
            <SelectItem key="25" value="25">25</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="secondary_diagnosis">Secondary Diagnosis *</Label>
        <Select value={values.secondary_diagnosis ?? ''} onValueChange={(v) => setValues({ ...values, secondary_diagnosis: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="0" value="0">0</SelectItem>
            <SelectItem key="15" value="15">15</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ambulatory_aid">Ambulatory Aid *</Label>
        <Select value={values.ambulatory_aid ?? ''} onValueChange={(v) => setValues({ ...values, ambulatory_aid: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="0" value="0">0</SelectItem>
            <SelectItem key="15" value="15">15</SelectItem>
            <SelectItem key="30" value="30">30</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="iv_therapy">Iv Therapy *</Label>
        <Select value={values.iv_therapy ?? ''} onValueChange={(v) => setValues({ ...values, iv_therapy: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="0" value="0">0</SelectItem>
            <SelectItem key="20" value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="gait">Gait *</Label>
        <Select value={values.gait ?? ''} onValueChange={(v) => setValues({ ...values, gait: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="0" value="0">0</SelectItem>
            <SelectItem key="10" value="10">10</SelectItem>
            <SelectItem key="20" value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mental_status">Mental Status *</Label>
        <Select value={values.mental_status ?? ''} onValueChange={(v) => setValues({ ...values, mental_status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="0" value="0">0</SelectItem>
            <SelectItem key="15" value="15">15</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_score">Total Score *</Label>
        <Input id="total_score" type="number" value={values.total_score ?? ''} onChange={(e) => setValues({ ...values, total_score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="risk_level">Risk Level *</Label>
        <Select value={values.risk_level ?? ''} onValueChange={(v) => setValues({ ...values, risk_level: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="LOW" value="LOW">LOW</SelectItem>
            <SelectItem key="MODERATE" value="MODERATE">MODERATE</SelectItem>
            <SelectItem key="HIGH" value="HIGH">HIGH</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assessed_at">Assessed At</Label>
        <Input id="assessed_at" type="date" value={values.assessed_at ?? ''} onChange={(e) => setValues({ ...values, assessed_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
