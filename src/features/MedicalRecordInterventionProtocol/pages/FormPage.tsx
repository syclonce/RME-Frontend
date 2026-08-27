import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useInterventionProtocolResource } from '../api'
import type { InterventionProtocolFormValues } from '../types'

export function InterventionProtocolFormPage() {
  const navigate = useNavigate()
  const { create } = useInterventionProtocolResource()
  const [values, setValues] = useState<InterventionProtocolFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-intervention-protocol') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah InterventionProtocol</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit *</Label>
        <RelationSelect
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="started_by">Started By *</Label>
        <RelationSelect
          endpoint="/employees"
          value={values.started_by ?? null}
          onChange={(v) => setValues({ ...values, started_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="created_by">Created By</Label>
        <RelationSelect
          endpoint="/users"
          value={values.created_by ?? null}
          onChange={(v) => setValues({ ...values, created_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="protocol_name">Protocol Name *</Label>
        <Input id="protocol_name" type="text" value={values.protocol_name ?? ''} onChange={(e) => setValues({ ...values, protocol_name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="indication">Indication</Label>
        <Input id="indication" type="text" value={values.indication ?? ''} onChange={(e) => setValues({ ...values, indication: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Select value={values.status ?? ''} onValueChange={(v) => setValues({ ...values, status: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="active" value="active">Active</SelectItem>
            <SelectItem key="completed" value="completed">Completed</SelectItem>
            <SelectItem key="discontinued" value="discontinued">Discontinued</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="started_at">Started At</Label>
        <Input id="started_at" type="date" value={values.started_at ?? ''} onChange={(e) => setValues({ ...values, started_at: e.target.value })} />
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
