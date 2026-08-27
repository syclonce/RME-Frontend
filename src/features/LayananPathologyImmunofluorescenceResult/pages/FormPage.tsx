import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePathologyImmunofluorescenceResultResource } from '../api'
import type { PathologyImmunofluorescenceResultFormValues } from '../types'

export function PathologyImmunofluorescenceResultFormPage() {
  const navigate = useNavigate()
  const { create } = usePathologyImmunofluorescenceResultResource()
  const [values, setValues] = useState<PathologyImmunofluorescenceResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-pathology-immunofluorescence-result') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PathologyImmunofluorescenceResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="pathology_anatomy_result_id">Pathology Anatomy Result *</Label>
        <Input id="pathology_anatomy_result_id" type="number" value={values.pathology_anatomy_result_id ?? ''} onChange={(e) => setValues({ ...values, pathology_anatomy_result_id: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="marker">Marker *</Label>
        <Input id="marker" type="text" value={values.marker ?? ''} onChange={(e) => setValues({ ...values, marker: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="result">Result *</Label>
        <Input id="result" type="text" value={values.result ?? ''} onChange={(e) => setValues({ ...values, result: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="intensity">Intensity</Label>
        <Input id="intensity" type="text" value={values.intensity ?? ''} onChange={(e) => setValues({ ...values, intensity: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="examined_at">Examined At *</Label>
        <Input id="examined_at" type="date" value={values.examined_at ?? ''} onChange={(e) => setValues({ ...values, examined_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
