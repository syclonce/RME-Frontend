import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { usePathologyMolecularResultResource } from '../api'
import type { PathologyMolecularResultFormValues } from '../types'

export function PathologyMolecularResultFormPage() {
  const navigate = useNavigate()
  const { create } = usePathologyMolecularResultResource()
  const [values, setValues] = useState<PathologyMolecularResultFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/layanan-pathology-molecular-result') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah PathologyMolecularResult</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="pathology_anatomy_result_id">Pathology Anatomy Result *</Label>
        <RelationSelect
          endpoint="/pathology-anatomy-results"
          value={values.pathology_anatomy_result_id ?? null}
          onChange={(v) => setValues({ ...values, pathology_anatomy_result_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="test_name">Test Name *</Label>
        <Input id="test_name" type="text" value={values.test_name ?? ''} onChange={(e) => setValues({ ...values, test_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="result">Result *</Label>
        <Input id="result" type="text" value={values.result ?? ''} onChange={(e) => setValues({ ...values, result: e.target.value })} />
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
