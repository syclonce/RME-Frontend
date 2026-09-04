import { useState } from 'react'
import { MessageSquareText, TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { notifyApiError } from '@/shared/lib/apiError'
import { useActiveVisit } from '@/shared/hooks/useActiveVisit'
import { useRecordAnamnesis, useVisitAnamneses } from '../api'
import type { Anamnesis } from '../types'

const TIME = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
})

const SECTIONS = [
  {
    key: 'present_illness_history',
    label: 'Riwayat Penyakit Sekarang',
    hint: 'Perjalanan keluhan yang membawa pasien datang hari ini.',
  },
  {
    key: 'past_medical_history',
    label: 'Riwayat Penyakit Dahulu',
    hint: 'Penyakit, operasi, atau rawat inap sebelumnya.',
  },
  {
    key: 'allergy_history',
    label: 'Riwayat Alergi',
    hint: 'Obat, makanan, atau bahan lain — sebutkan reaksinya bila diketahui.',
  },
  {
    key: 'family_medical_history',
    label: 'Riwayat Penyakit Keluarga',
    hint: 'Penyakit yang diturunkan atau berulang dalam keluarga.',
  },
  {
    key: 'social_history',
    label: 'Riwayat Sosial',
    hint: 'Pekerjaan, kebiasaan, lingkungan yang berkaitan dengan keluhan.',
  },
] as const

type SectionKey = (typeof SECTIONS)[number]['key']
type FormState = Record<SectionKey, string>

const EMPTY: FormState = {
  present_illness_history: '', past_medical_history: '', allergy_history: '',
  family_medical_history: '', social_history: '',
}

/**
 * Anamnesis satu kunjungan.
 *
 * Menggantikan tabel CRUD generik. Lima bagian riwayat adalah teks panjang
 * yang dibaca berurutan; sebagai kolom tabel, masing-masing terpotong jadi
 * cuplikan yang tidak dapat dibaca.
 *
 * Riwayat alergi diberi penanda tersendiri di riwayat: ia satu-satunya bagian
 * di sini yang dibaca ULANG sebelum memberi obat, dan tidak boleh tenggelam
 * di antara empat bagian lain.
 */
export function AnamnesisListPage() {
  const { visitId, context } = useActiveVisit()
  const historyQuery = useVisitAnamneses(visitId)
  const recordMutation = useRecordAnamnesis(visitId)
  const [form, setForm] = useState<FormState>(EMPTY)

  const set = (key: SectionKey) => (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const filled = Object.values(form).filter((v) => v.trim() !== '').length

  async function submit() {
    try {
      const payload = Object.fromEntries(
        Object.entries(form).filter(([, v]) => v.trim() !== '').map(([k, v]) => [k, v.trim()]),
      )
      await recordMutation.mutateAsync(payload)
      toast.success('Anamnesis tersimpan.')
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
            <CardTitle>Anamnesis</CardTitle>
            <CardDescription>
              Halaman ini dibuka dari papan Pelayanan Pasien supaya konteks kunjungannya ikut terbawa.
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
          <MessageSquareText className="text-muted-foreground size-5" /> Anamnesis
        </h1>
        <p className="text-muted-foreground text-sm">
          {context
            ? `${context.patient.name ?? 'Pasien'} · ${context.visit.visit_number ?? `Kunjungan #${visitId}`}`
            : `Kunjungan #${visitId}`}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Catat Anamnesis</CardTitle>
          <CardDescription>
            Isi bagian yang relevan. Bagian yang dikosongkan tidak disimpan — berbeda dari
            bagian yang sengaja ditulis kosong.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          {SECTIONS.map((section) => (
            <div
              key={section.key}
              className={`grid gap-1.5 ${section.key === 'present_illness_history' ? 'lg:col-span-2' : ''}`}
            >
              <Label htmlFor={section.key}>{section.label}</Label>
              <p className="text-muted-foreground text-xs">{section.hint}</p>
              <Textarea
                id={section.key}
                rows={section.key === 'present_illness_history' ? 4 : 3}
                value={form[section.key]}
                onChange={set(section.key)}
              />
            </div>
          ))}
          <div className="lg:col-span-2">
            <Button disabled={filled === 0 || recordMutation.isPending} onClick={submit}>
              {recordMutation.isPending ? 'Menyimpan...' : 'Simpan Anamnesis'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Riwayat Anamnesis</CardTitle>
          <CardDescription>Terbaru di atas.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {historyQuery.isLoading && <Skeleton className="h-24 w-full" />}

          {!historyQuery.isLoading && (historyQuery.data ?? []).length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              Belum ada anamnesis pada kunjungan ini.
            </p>
          )}

          {(historyQuery.data ?? []).map((record) => (
            <AnamnesisCard key={record.id} record={record} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function AnamnesisCard({ record }: { record: Anamnesis }) {
  const filled = SECTIONS.filter((s) => record[s.key])
  const hasAllergy = Boolean(record.allergy_history)

  return (
    <div className="rounded-md border p-3">
      <p className="mb-2.5 text-sm font-medium">
        {record.recorded_at ? TIME.format(new Date(record.recorded_at)) : 'Waktu tidak tercatat'}
      </p>

      {/* Alergi diangkat ke atas dan diberi warna: ia satu-satunya bagian di
          sini yang dibaca ulang sebelum memberi obat, dan tenggelam di antara
          empat bagian lain berarti terlewat justru saat paling dibutuhkan. */}
      {hasAllergy && (
        <div className="border-destructive/40 bg-destructive/5 mb-3 rounded-md border p-2.5">
          <p className="text-destructive flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
            <TriangleAlert className="size-3.5" /> Riwayat Alergi
          </p>
          <p className="mt-1 text-sm whitespace-pre-line">{record.allergy_history}</p>
        </div>
      )}

      {filled.length === 0 && <p className="text-muted-foreground text-sm">Anamnesis tanpa isi.</p>}

      <div className="grid gap-3 sm:grid-cols-2">
        {filled
          .filter((section) => section.key !== 'allergy_history')
          .map((section) => (
            <div key={section.key}>
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {section.label}
              </p>
              <p className="text-sm whitespace-pre-line">{record[section.key]}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
