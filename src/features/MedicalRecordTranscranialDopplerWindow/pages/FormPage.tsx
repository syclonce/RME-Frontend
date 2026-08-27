import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
        <Select value={values.window_site ?? ''} onValueChange={(v) => setValues({ ...values, window_site: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="temporal" value="temporal">Temporal</SelectItem>
            <SelectItem key="orbital" value="orbital">Orbital</SelectItem>
            <SelectItem key="suboccipital" value="suboccipital">Suboccipital</SelectItem>
            <SelectItem key="submandibular" value="submandibular">Submandibular</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="signal_quality">Signal Quality</Label>
        <Select value={values.signal_quality ?? ''} onValueChange={(v) => setValues({ ...values, signal_quality: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="good" value="good">Good</SelectItem>
            <SelectItem key="fair" value="fair">Fair</SelectItem>
            <SelectItem key="poor" value="poor">Poor</SelectItem>
            <SelectItem key="absent" value="absent">Absent</SelectItem>
          </SelectContent>
        </Select>
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
