import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { useAudioAttachmentResource } from '../api'
import type { AudioAttachmentFormValues } from '../types'

export function AudioAttachmentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useAudioAttachmentResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<AudioAttachmentFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as AudioAttachmentFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/general-audio-attachment') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/general-audio-attachment') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} AudioAttachment</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="patient_id">Patient</Label>
        <AsyncCombobox
          endpoint="/patients"
          value={values.patient_id ?? null}
          onChange={(v) => setValues({ ...values, patient_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="visit_id">Visit</Label>
        <AsyncCombobox
          endpoint="/visits"
          value={values.visit_id ?? null}
          onChange={(v) => setValues({ ...values, visit_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="title">Title *</Label>
        <Input id="title" type="text" value={values.title ?? ''} onChange={(e) => setValues({ ...values, title: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="file_path">File Path *</Label>
        <Input id="file_path" type="text" value={values.file_path ?? ''} onChange={(e) => setValues({ ...values, file_path: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="mime_type">Mime Type</Label>
        <Input id="mime_type" type="text" value={values.mime_type ?? ''} onChange={(e) => setValues({ ...values, mime_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="duration_seconds">Duration Seconds</Label>
        <Input id="duration_seconds" type="number" value={values.duration_seconds ?? ''} onChange={(e) => setValues({ ...values, duration_seconds: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="recorded_by">Recorded By</Label>
        <AsyncCombobox
          endpoint="/users"
          value={values.recorded_by ?? null}
          onChange={(v) => setValues({ ...values, recorded_by: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" type="text" value={values.notes ?? ''} onChange={(e) => setValues({ ...values, notes: e.target.value })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
