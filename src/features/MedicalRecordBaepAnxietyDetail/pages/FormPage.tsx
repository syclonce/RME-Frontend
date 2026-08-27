import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useBaepAnxietyDetailResource } from '../api'
import type { BaepAnxietyDetailFormValues } from '../types'

export function BaepAnxietyDetailFormPage() {
  const navigate = useNavigate()
  const { create } = useBaepAnxietyDetailResource()
  const [values, setValues] = useState<BaepAnxietyDetailFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-baep-anxiety-detail') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah BaepAnxietyDetail</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="baep_protocol_id">Baep Protocol *</Label>
        <RelationSelect
          endpoint="/baep-intervention-protocols"
          value={values.baep_protocol_id ?? null}
          onChange={(v) => setValues({ ...values, baep_protocol_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="scale_used">Scale Used</Label>
        <Input id="scale_used" type="text" value={values.scale_used ?? ''} onChange={(e) => setValues({ ...values, scale_used: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="score">Score *</Label>
        <Input id="score" type="number" value={values.score ?? ''} onChange={(e) => setValues({ ...values, score: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="severity_level">Severity Level</Label>
        <Select value={values.severity_level ?? ''} onValueChange={(v) => setValues({ ...values, severity_level: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="mild" value="mild">Mild</SelectItem>
            <SelectItem key="moderate" value="moderate">Moderate</SelectItem>
            <SelectItem key="severe" value="severe">Severe</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
