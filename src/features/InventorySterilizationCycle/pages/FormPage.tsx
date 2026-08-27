import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSterilizationCycleResource } from '../api'
import type { SterilizationCycleFormValues } from '../types'

export function SterilizationCycleFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useSterilizationCycleResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<SterilizationCycleFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as SterilizationCycleFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/inventory-sterilization-cycle') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/inventory-sterilization-cycle') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} SterilizationCycle</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="machine_name">Machine Name *</Label>
        <Input id="machine_name" type="text" value={values.machine_name ?? ''} onChange={(e) => setValues({ ...values, machine_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="temperature_celsius">Temperature Celsius *</Label>
        <Input id="temperature_celsius" type="number" value={values.temperature_celsius ?? ''} onChange={(e) => setValues({ ...values, temperature_celsius: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pressure_bar">Pressure Bar *</Label>
        <Input id="pressure_bar" type="number" value={values.pressure_bar ?? ''} onChange={(e) => setValues({ ...values, pressure_bar: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="duration_minutes">Duration Minutes *</Label>
        <Input id="duration_minutes" type="number" value={values.duration_minutes ?? ''} onChange={(e) => setValues({ ...values, duration_minutes: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="started_at">Started At *</Label>
        <Input id="started_at" type="date" value={values.started_at ?? ''} onChange={(e) => setValues({ ...values, started_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="completed_at">Completed At</Label>
        <Input id="completed_at" type="date" value={values.completed_at ?? ''} onChange={(e) => setValues({ ...values, completed_at: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="biological_indicator_result">Biological Indicator Result</Label>
        <Select value={values.biological_indicator_result ?? ''} onValueChange={(v) => setValues({ ...values, biological_indicator_result: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="pending" value="pending">Pending</SelectItem>
            <SelectItem key="negative" value="negative">Negative</SelectItem>
            <SelectItem key="positive" value="positive">Positive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Select value={values.status ?? ''} onValueChange={(v) => setValues({ ...values, status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="in_process" value="in_process">In Process</SelectItem>
            <SelectItem key="passed" value="passed">Passed</SelectItem>
            <SelectItem key="failed" value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
