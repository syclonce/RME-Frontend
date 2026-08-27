import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useFunctionalStatusAssessmentResource } from '../api'
import type { FunctionalStatusAssessmentFormValues } from '../types'

export function FunctionalStatusAssessmentFormPage() {
  const navigate = useNavigate()
  const { create } = useFunctionalStatusAssessmentResource()
  const [values, setValues] = useState<FunctionalStatusAssessmentFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-functional-status-assessment') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah FunctionalStatusAssessment</h1>
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
        <Label htmlFor="bathing_status">Bathing Status</Label>
        <Select value={values.bathing_status ?? ''} onValueChange={(v) => setValues({ ...values, bathing_status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="independent" value="independent">Independent</SelectItem>
            <SelectItem key="assisted" value="assisted">Assisted</SelectItem>
            <SelectItem key="dependent" value="dependent">Dependent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="dressing_status">Dressing Status</Label>
        <Select value={values.dressing_status ?? ''} onValueChange={(v) => setValues({ ...values, dressing_status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="independent" value="independent">Independent</SelectItem>
            <SelectItem key="assisted" value="assisted">Assisted</SelectItem>
            <SelectItem key="dependent" value="dependent">Dependent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="toileting_status">Toileting Status</Label>
        <Select value={values.toileting_status ?? ''} onValueChange={(v) => setValues({ ...values, toileting_status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="independent" value="independent">Independent</SelectItem>
            <SelectItem key="assisted" value="assisted">Assisted</SelectItem>
            <SelectItem key="dependent" value="dependent">Dependent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="transferring_status">Transferring Status</Label>
        <Select value={values.transferring_status ?? ''} onValueChange={(v) => setValues({ ...values, transferring_status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="independent" value="independent">Independent</SelectItem>
            <SelectItem key="assisted" value="assisted">Assisted</SelectItem>
            <SelectItem key="dependent" value="dependent">Dependent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="feeding_status">Feeding Status</Label>
        <Select value={values.feeding_status ?? ''} onValueChange={(v) => setValues({ ...values, feeding_status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="independent" value="independent">Independent</SelectItem>
            <SelectItem key="assisted" value="assisted">Assisted</SelectItem>
            <SelectItem key="dependent" value="dependent">Dependent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="total_score">Total Score</Label>
        <Input id="total_score" type="number" value={values.total_score ?? ''} onChange={(e) => setValues({ ...values, total_score: e.target.value === '' ? null : Number(e.target.value) })} />
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
