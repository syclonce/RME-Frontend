import { useState } from 'react'
import { ClipboardList } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { notifyApiError } from '@/shared/lib/apiError'
import { useActiveVisit } from '@/shared/hooks/useActiveVisit'
import { useRecordClinicalNote, useVisitClinicalNotes } from '../api'
import type { ClinicalNote } from '../types'

const TIME = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
})

/**
 * Empat bagian SOAP, dalam urutan yang dipakai dokter menulisnya.
 *
 * Penjelasannya sengaja ada di layar: SOAP diajarkan berbeda-beda antar
 * institusi, dan catatan yang bagiannya tertukar sulit dibaca dokter
 * berikutnya — terutama pada visite pagi ketika belasan catatan dibaca
 * berurutan.
 */
const SOAP = [
  { key: 'subjective', label: 'Subjective', hint: 'Yang disampaikan pasien: keluhan, riwayat, apa yang dirasakan.' },
  { key: 'objective', label: 'Objective', hint: 'Yang Anda temukan: pemeriksaan fisik, hasil penunjang, tanda vital.' },
  { key: 'assessment', label: 'Assessment', hint: 'Penilaian klinis atas temuan di atas.' },
  { key: 'planning', label: 'Planning', hint: 'Rencana: terapi, tindakan, pemeriksaan lanjutan.' },
] as const

type SoapKey = (typeof SOAP)[number]['key']
type FormState = Record<SoapKey | 'instructions', string>

const EMPTY: FormState = { subjective: '', objective: '', assessment: '', planning: '', instructions: '' }

/**
 * Catatan klinis (SOAP) satu kunjungan.
 *
 * Menggantikan tabel CRUD generik. Dua alasan tabel itu tidak layak di sini:
 *
 * 1. Ia meminta `author_id` sebagai angka — dokter harus menghafal id
 *    pegawainya sendiri. Kini diisi server dari profil pegawai user login.
 * 2. SOAP adalah empat blok teks panjang yang dibaca berurutan; sebagai kolom
 *    tabel, masing-masing terpotong jadi cuplikan yang tidak bisa dibaca.
 */
export function ClinicalNoteListPage() {
  const { visitId, context } = useActiveVisit()
  const historyQuery = useVisitClinicalNotes(visitId)
  const recordMutation = useRecordClinicalNote(visitId)
  const [form, setForm] = useState<FormState>(EMPTY)

  const set = (key: keyof FormState) => (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const filled = Object.values(form).filter((v) => v.trim() !== '').length

  async function submit() {
    try {
      // Kirim hanya bagian yang terisi: string kosong tersimpan sebagai
      // bagian SOAP yang "ada tapi kosong", tidak dapat dibedakan dari
      // pemeriksaan yang memang tidak dilakukan.
      const payload = Object.fromEntries(
        Object.entries(form).filter(([, v]) => v.trim() !== '').map(([k, v]) => [k, v.trim()]),
      )
      await recordMutation.mutateAsync(payload)
      toast.success('Catatan klinis tersimpan.')
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
            <CardTitle>Catatan Klinis</CardTitle>
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
          <ClipboardList className="text-muted-foreground size-5" /> Catatan Klinis
        </h1>
        <p className="text-muted-foreground text-sm">
          {context
            ? `${context.patient.name ?? 'Pasien'} · ${context.visit.visit_number ?? `Kunjungan #${visitId}`}`
            : `Kunjungan #${visitId}`}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tulis Catatan</CardTitle>
          <CardDescription>
            Isi bagian yang relevan. Bagian yang dikosongkan tidak disimpan — berbeda dari
            bagian yang sengaja ditulis kosong.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          {SOAP.map((section) => (
            <div key={section.key} className="grid gap-1.5">
              <Label htmlFor={section.key}>{section.label}</Label>
              <p className="text-muted-foreground text-xs">{section.hint}</p>
              <Textarea id={section.key} rows={4} value={form[section.key]} onChange={set(section.key)} />
            </div>
          ))}
          <div className="grid gap-1.5 lg:col-span-2">
            <Label htmlFor="instructions">Instruksi</Label>
            <p className="text-muted-foreground text-xs">
              Yang harus dikerjakan perawat atau disampaikan ke pasien.
            </p>
            <Textarea id="instructions" rows={3} value={form.instructions} onChange={set('instructions')} />
          </div>
          <div className="lg:col-span-2">
            <Button disabled={filled === 0 || recordMutation.isPending} onClick={submit}>
              {recordMutation.isPending ? 'Menyimpan...' : 'Simpan Catatan'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Riwayat Catatan</CardTitle>
          <CardDescription>Terbaru di atas.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {historyQuery.isLoading && <Skeleton className="h-24 w-full" />}

          {!historyQuery.isLoading && (historyQuery.data ?? []).length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              Belum ada catatan klinis pada kunjungan ini.
            </p>
          )}

          {(historyQuery.data ?? []).map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function NoteCard({ note }: { note: ClinicalNote }) {
  const sections = SOAP.filter((s) => note[s.key])

  return (
    <div className="rounded-md border p-3">
      <p className="mb-2.5 text-sm font-medium">
        {note.recorded_at ? TIME.format(new Date(note.recorded_at)) : 'Waktu tidak tercatat'}
      </p>

      {sections.length === 0 && !note.instructions && (
        <p className="text-muted-foreground text-sm">Catatan tanpa isi.</p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {sections.map((section) => (
          <div key={section.key}>
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              {section.label}
            </p>
            {/* whitespace-pre-line: dokter menulis daftar terapi baris per
                baris, dan menggabungkannya jadi satu paragraf membuat dosis
                menempel ke nama obat berikutnya. */}
            <p className="text-sm whitespace-pre-line">{note[section.key]}</p>
          </div>
        ))}
      </div>

      {note.instructions && (
        <div className="mt-3 border-t pt-3">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Instruksi</p>
          <p className="text-sm whitespace-pre-line">{note.instructions}</p>
        </div>
      )}
    </div>
  )
}
