import { useState } from 'react'
import { HeartPulse } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { notifyApiError } from '@/shared/lib/apiError'
import { useActiveVisit } from '@/shared/hooks/useActiveVisit'
import { BloodPressureReading, VitalReading } from '../components/VitalReading'
import { painSeverity, worstSeverity } from '../vitalRanges'
import { useRecordVitalSign, useVisitVitalSigns } from '../api'
import type { VitalSign } from '../types'

const TIME = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
})

interface FormState {
  temperature: string
  pulse: string
  respiratory_rate: string
  systolic: string
  diastolic: string
  oxygen_saturation: string
  pain_scale: string
}

const EMPTY: FormState = {
  temperature: '', pulse: '', respiratory_rate: '',
  systolic: '', diastolic: '', oxygen_saturation: '', pain_scale: '',
}

/**
 * Pencatatan tanda vital satu kunjungan.
 *
 * Menggantikan tabel CRUD generik yang sebelumnya ada di sini. Tiga hal yang
 * membuat tabel itu tidak layak dipakai di samping pasien:
 *
 * 1. Ia meminta `recorded_by` sebagai ANGKA — perawat harus menghafal id
 *    pegawainya sendiri. Kini diisi server dari profil pegawai user login.
 * 2. Sistolik dan diastolik jadi dua kolom terpisah, padahal tekanan darah
 *    selalu dibaca "120/80".
 * 3. Tidak ada penanda nilai kritis: suhu 41 °C tampil sama seperti 36,5 °C.
 */
export function VitalSignListPage() {
  const { visitId, context } = useActiveVisit()
  const historyQuery = useVisitVitalSigns(visitId)
  const recordMutation = useRecordVitalSign(visitId)
  const [form, setForm] = useState<FormState>(EMPTY)

  const set = (key: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }))

  // Kirim hanya field yang benar-benar diisi. Mengirim string kosong membuat
  // backend menerima 0 untuk kolom nullable — nadi "0" adalah pernyataan
  // klinis yang sangat berbeda dari "tidak diukur".
  const payload = () =>
    Object.fromEntries(
      Object.entries(form)
        .filter(([, value]) => value.trim() !== '')
        .map(([key, value]) => [key, Number(value)]),
    )

  const filledCount = Object.values(form).filter((v) => v.trim() !== '').length

  async function submit() {
    try {
      await recordMutation.mutateAsync(payload())
      toast.success('Tanda vital tercatat.')
      setForm(EMPTY)
    } catch (error) {
      notifyApiError(error)
    }
  }

  if (visitId === null) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Tanda Vital</CardTitle>
            <CardDescription>
              Halaman ini dibuka dari papan Pelayanan Pasien supaya konteks kunjungannya ikut terbawa.
              Buka lewat pasien yang sedang dilayani agar pencatatan menempel pada kunjungan yang benar.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 p-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <HeartPulse className="text-muted-foreground size-5" /> Tanda Vital
        </h1>
        <p className="text-muted-foreground text-sm">
          {context ? `${context.patient.name ?? 'Pasien'} · ${context.visit.visit_number ?? `Kunjungan #${visitId}`}` : `Kunjungan #${visitId}`}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Catat Pengukuran</CardTitle>
          <CardDescription>
            Isi hanya yang benar-benar diukur. Field kosong tidak dikirim — nadi &ldquo;0&rdquo; berarti
            hal yang sangat berbeda dari &ldquo;tidak diukur&rdquo;.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Suhu (°C)" value={form.temperature} onChange={set('temperature')} step="0.1" />
          <Field label="Nadi (×/mnt)" value={form.pulse} onChange={set('pulse')} />
          <Field label="Laju Napas (×/mnt)" value={form.respiratory_rate} onChange={set('respiratory_rate')} />
          <Field label="SpO₂ (%)" value={form.oxygen_saturation} onChange={set('oxygen_saturation')} />
          <Field label="Sistolik (mmHg)" value={form.systolic} onChange={set('systolic')} />
          <Field label="Diastolik (mmHg)" value={form.diastolic} onChange={set('diastolic')} />
          <Field label="Skala Nyeri (0–10)" value={form.pain_scale} onChange={set('pain_scale')} />
          <div className="flex items-end">
            <Button className="w-full" disabled={filledCount === 0 || recordMutation.isPending} onClick={submit}>
              {recordMutation.isPending ? 'Menyimpan...' : 'Simpan Pengukuran'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Riwayat Pengukuran</CardTitle>
          <CardDescription>
            Tanda vital adalah rekam medis yang hanya bertambah — koreksi dilakukan dengan
            pengukuran baru, bukan menyunting yang lama.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {historyQuery.isLoading && <Skeleton className="h-20 w-full" />}

          {!historyQuery.isLoading && (historyQuery.data ?? []).length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              Belum ada pengukuran pada kunjungan ini.
            </p>
          )}

          {(historyQuery.data ?? []).map((reading) => (
            <ReadingRow key={reading.id} reading={reading} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function ReadingRow({ reading }: { reading: VitalSign }) {
  const severity = worstSeverity(reading)
  const pain = painSeverity(reading.pain_scale)

  return (
    <div
      className={`rounded-md border p-3 ${
        severity === 'kritis' ? 'border-destructive/40 bg-destructive/5' : ''
      }`}
    >
      <div className="mb-2.5 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">
          {reading.recorded_at ? TIME.format(new Date(reading.recorded_at)) : 'Waktu tidak tercatat'}
        </span>
        {severity === 'kritis' && <Badge variant="destructive">Ada nilai kritis</Badge>}
        {severity === 'perhatian' && <Badge variant="outline">Ada nilai di luar normal</Badge>}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <BloodPressureReading systolic={reading.systolic} diastolic={reading.diastolic} />
        <VitalReading field="pulse" value={reading.pulse} />
        <VitalReading field="temperature" value={reading.temperature} />
        <VitalReading field="respiratory_rate" value={reading.respiratory_rate} />
        <VitalReading field="oxygen_saturation" value={reading.oxygen_saturation} />
        <div>
          <p className="text-muted-foreground text-xs">Nyeri</p>
          <p
            className={`font-semibold tabular-nums ${
              reading.pain_scale === null || reading.pain_scale === undefined
                ? 'text-muted-foreground'
                : pain === 'kritis'
                  ? 'text-destructive'
                  : pain === 'perhatian'
                    ? 'text-amber-600 dark:text-amber-500'
                    : 'text-foreground'
            }`}
          >
            {reading.pain_scale ?? '—'}
            {reading.pain_scale !== null && reading.pain_scale !== undefined && (
              <span className="ml-0.5 text-xs font-normal">/10</span>
            )}
          </p>
          {pain !== 'normal' && reading.pain_scale !== null && reading.pain_scale !== undefined && (
            <p className={`text-xs ${pain === 'kritis' ? 'text-destructive' : 'text-amber-600 dark:text-amber-500'}`}>
              {pain === 'kritis' ? 'nyeri berat' : 'nyeri sedang'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

interface FieldProps {
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  step?: string
}

function Field({ label, value, onChange, step }: FieldProps) {
  const id = label.replace(/\W+/g, '-').toLowerCase()
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="number" inputMode="decimal" step={step} value={value} onChange={onChange} />
    </div>
  )
}
