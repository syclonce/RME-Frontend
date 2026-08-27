import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RelationSelect } from '@/shared/components/RelationSelect'
import { useTranscranialDopplerWindowResource } from '../api'
import type { TranscranialDopplerWindowFormValues } from '../types'

export function TranscranialDopplerWindowFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = useTranscranialDopplerWindowResource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<TranscranialDopplerWindowFormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as TranscranialDopplerWindowFormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/medical-record-transcranial-doppler-window') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/medical-record-transcranial-doppler-window') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} TranscranialDopplerWindow</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="transcranial_doppler_examination_id">Transcranial Doppler Examination *</Label>
        <RelationSelect
          endpoint="/tcd-examinations"
          value={values.transcranial_doppler_examination_id ?? null}
          onChange={(v) => setValues({ ...values, transcranial_doppler_examination_id: v })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="window_site">Window Site *</Label>
        <Input id="window_site" type="text" value={values.window_site ?? ''} onChange={(e) => setValues({ ...values, window_site: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="signal_quality">Signal Quality</Label>
        <Input id="signal_quality" type="text" value={values.signal_quality ?? ''} onChange={(e) => setValues({ ...values, signal_quality: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="depth_mm">Depth Mm</Label>
        <Input id="depth_mm" type="number" value={values.depth_mm ?? ''} onChange={(e) => setValues({ ...values, depth_mm: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="velocity_cm_s">Velocity Cm S</Label>
        <Input id="velocity_cm_s" type="number" value={values.velocity_cm_s ?? ''} onChange={(e) => setValues({ ...values, velocity_cm_s: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
