import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '@/api/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { normalizeItem, normalizeList } from '@/shared/types'
import { notifyApiError } from '@/shared/lib/apiError'
import type { Patient } from '@/features/GeneralPatient/types'
import type { Registration } from '@/features/PendaftaranRegistration/types'
import type { Visit } from '@/features/PendaftaranVisit/types'
import type { Triage } from '../types'

/**
 * Skala triase ESI/ATS 1-5 (kolom `triages.level`, unsignedTinyInteger di
 * migrasi backend). 1 = paling gawat. Warna & label mengikuti konvensi umum
 * triase IGD supaya petugas langsung kenali tanpa perlu baca definisi lengkap.
 */
const LEVELS = [
  { value: 1, label: 'Resusitasi', desc: 'Mengancam nyawa, tindakan segera', className: 'bg-red-600 text-white hover:bg-red-700 border-red-700' },
  { value: 2, label: 'Emergensi', desc: 'Berisiko tinggi, tidak boleh menunggu lama', className: 'bg-orange-500 text-white hover:bg-orange-600 border-orange-600' },
  { value: 3, label: 'Urgen', desc: 'Butuh penanganan segera, masih stabil', className: 'bg-yellow-400 text-yellow-950 hover:bg-yellow-500 border-yellow-500' },
  { value: 4, label: 'Less Urgent', desc: 'Bisa menunggu, kondisi ringan', className: 'bg-green-500 text-white hover:bg-green-600 border-green-600' },
  { value: 5, label: 'Non Urgent', desc: 'Tidak darurat', className: 'bg-blue-500 text-white hover:bg-blue-600 border-blue-600' },
] as const

const LEVEL_BY_VALUE = new Map<number, (typeof LEVELS)[number]>(LEVELS.map((l) => [l.value, l]))

interface WaitingVisit {
  visit: Visit
  registration: Registration
}

/**
 * Halaman kerja petugas triase IGD.
 *
 * Sumber daftar tunggu: GET /visits (backend HANYA punya filter
 * `registration_id`, tidak ada filter status/is_emergency) digabung dengan
 * GET /registrations untuk baca `is_emergency` (kolom itu ada di
 * `registrations`, bukan `visits`). Join dilakukan di frontend by
 * `registration_id`. Idealnya backend menambah filter
 * `is_emergency`/`status` di VisitController::index (atau endpoint gabungan)
 * supaya tidak perlu tarik seluruh halaman visits+registrations tiap buka
 * halaman ini — lihat laporan di luar kode.
 */
export function TriaseIgdPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [activeVisit, setActiveVisit] = useState<WaitingVisit | null>(null)

  const waitingQuery = useQuery({
    queryKey: ['/visits', 'triase-igd-waiting'],
    queryFn: async () => {
      const [visitsRes, registrationsRes] = await Promise.all([
        apiClient.get('/visits', { params: { per_page: 100 } }),
        apiClient.get('/registrations', { params: { per_page: 100 } }),
      ])
      const visits = normalizeList<Visit>(visitsRes.data).items
      const registrations = normalizeList<Registration>(registrationsRes.data).items
      const registrationById = new Map(registrations.map((r) => [r.id, r]))

      // IGD = registrasi dengan is_emergency, kunjungan masih 'active' (belum
      // pulang/batal) — kunjungan yang sudah discharged/cancelled tidak perlu
      // ditriase lagi.
      const result: WaitingVisit[] = []
      for (const visit of visits) {
        if (visit.status !== 'active') continue
        const registration = visit.registration_id !== null ? registrationById.get(visit.registration_id) : undefined
        if (!registration?.is_emergency) continue
        result.push({ visit, registration })
      }
      // Paling lama menunggu di atas.
      return result.sort((a, b) => {
        const aTime = a.visit.admitted_at ? new Date(a.visit.admitted_at).getTime() : 0
        const bTime = b.visit.admitted_at ? new Date(b.visit.admitted_at).getTime() : 0
        return aTime - bTime
      })
    },
  })

  return (
    <div className="flex flex-col gap-5 p-6">
      <div>
        <p className="text-sm text-muted-foreground">Rekam Medis</p>
        <h1 className="text-2xl font-semibold tracking-tight">Triase IGD</h1>
        <p className="text-sm text-muted-foreground">Pasien IGD yang menunggu triase, diurutkan dari yang paling lama menunggu.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Daftar Tunggu</CardTitle>
          <Badge variant="outline">{waitingQuery.data?.length ?? 0} pasien</Badge>
        </CardHeader>
        <CardContent>
          {waitingQuery.isLoading && <p className="text-sm text-muted-foreground">Memuat daftar tunggu...</p>}
          {waitingQuery.isError && <p className="text-sm text-destructive">Daftar tunggu tidak dapat dimuat.</p>}
          {!waitingQuery.isLoading && !waitingQuery.isError && (waitingQuery.data?.length ?? 0) === 0 && (
            <p className="text-sm text-muted-foreground">Tidak ada pasien IGD yang menunggu triase.</p>
          )}

          {waitingQuery.data && waitingQuery.data.length > 0 && (
            <div className="flex flex-col divide-y">
              {waitingQuery.data.map((item) => (
                <div key={item.visit.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium">
                      {item.visit.visit_number ?? `Kunjungan #${item.visit.id}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Registrasi #{item.registration.id}
                      {item.visit.admitted_at ? ` · Masuk ${new Date(item.visit.admitted_at).toLocaleString('id-ID')}` : ''}
                    </p>
                  </div>
                  <Button onClick={() => setActiveVisit(item)}>Triase</Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {activeVisit && (
        <TriaseDialog
          waitingVisit={activeVisit}
          onClose={() => setActiveVisit(null)}
          onSaved={(visitId) => {
            setActiveVisit(null)
            queryClient.invalidateQueries({ queryKey: ['/visits', 'triase-igd-waiting'] })
            navigate(`/pelayanan-pasien/${visitId}`)
          }}
        />
      )}
    </div>
  )
}

function TriaseDialog({
  waitingVisit,
  onClose,
  onSaved,
}: {
  waitingVisit: WaitingVisit
  onClose: () => void
  onSaved: (visitId: number) => void
}) {
  const { visit } = waitingVisit
  const [level, setLevel] = useState<number | null>(null)
  const [chiefComplaint, setChiefComplaint] = useState('')
  const [notes, setNotes] = useState('')
  const [assessedBy, setAssessedBy] = useState<number | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  // Nama pasien untuk konteks di dialog (visit -> registration -> patient),
  // pola yang sama dipakai PelayananPasienPage.
  const patientQuery = useQuery({
    queryKey: ['triase-igd-patient', waitingVisit.registration.patient_id],
    enabled: waitingVisit.registration.patient_id !== null,
    queryFn: async () => {
      const res = await apiClient.get(`/patients/${waitingVisit.registration.patient_id}`)
      return normalizeItem<Patient>(res.data)
    },
  })

  // Cek triase yang sudah ada untuk kunjungan ini — jangan biarkan petugas
  // menimpa tanpa sadar (append-only di backend: store tidak menolak duplikat,
  // jadi pencegahannya harus di UI).
  const existingQuery = useQuery({
    queryKey: ['/triages', 'by-visit', visit.id],
    queryFn: async () => {
      const res = await apiClient.get('/triages', { params: { visit_id: visit.id, per_page: 5 } })
      return normalizeList<Triage>(res.data).items
    },
  })

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await apiClient.post('/triages', {
        visit_id: visit.id,
        level,
        chief_complaint: chiefComplaint || null,
        assessed_by: assessedBy,
        notes: notes || null,
      })
      return normalizeItem<Triage>(res.data)
    },
    onSuccess: () => onSaved(visit.id),
    onError: (error) => setFieldErrors(notifyApiError(error)),
  })

  const hasExisting = (existingQuery.data?.length ?? 0) > 0
  const canSubmit = level !== null && assessedBy !== null && !saveMutation.isPending

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Triase — {visit.visit_number ?? `Kunjungan #${visit.id}`}</DialogTitle>
          <DialogDescription>
            {patientQuery.data?.name ?? 'Memuat data pasien...'}
          </DialogDescription>
        </DialogHeader>

        {existingQuery.isLoading && (
          <p className="text-sm text-muted-foreground">Memeriksa riwayat triase kunjungan ini...</p>
        )}

        {hasExisting && existingQuery.data && (
          <div className="rounded-md border border-amber-400 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100">
            <p className="font-medium">Kunjungan ini sudah pernah ditriase.</p>
            {existingQuery.data.map((t) => {
              const lvl = t.level !== null ? LEVEL_BY_VALUE.get(t.level) : undefined
              return (
                <p key={t.id} className="mt-1">
                  Level {t.level} ({lvl?.label ?? '—'}){t.assessed_at ? ` · ${new Date(t.assessed_at).toLocaleString('id-ID')}` : ''}
                  {t.chief_complaint ? ` · ${t.chief_complaint}` : ''}
                </p>
              )
            })}
            <p className="mt-2">Triase bersifat rekam medis (append-only) — hanya tambahkan asesmen baru bila memang ada perubahan kondisi, jangan menimpa yang lama.</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Level Triase</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
              {LEVELS.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => setLevel(l.value)}
                  className={`flex flex-col items-center gap-0.5 rounded-md border px-2 py-3 text-center text-xs font-semibold transition-all ${l.className} ${
                    level === l.value ? 'ring-2 ring-offset-2 ring-foreground scale-105' : 'opacity-80'
                  } ${l.value <= 2 ? 'sm:py-4' : ''}`}
                >
                  <span className="text-base leading-none">{l.value}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
            {level !== null && (
              <p className="text-xs text-muted-foreground">{LEVEL_BY_VALUE.get(level)?.desc}</p>
            )}
            {fieldErrors.level && <p className="text-xs text-destructive">{fieldErrors.level}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Keluhan Utama</Label>
            <Textarea value={chiefComplaint} onChange={(e) => setChiefComplaint(e.target.value)} rows={2} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Dinilai oleh (Petugas)</Label>
            <AsyncCombobox endpoint="/employees" value={assessedBy} onChange={setAssessedBy} />
            {fieldErrors.assessed_by && <p className="text-xs text-destructive">{fieldErrors.assessed_by}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Catatan</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={() => saveMutation.mutate()} disabled={!canSubmit}>
            {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Triase'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
