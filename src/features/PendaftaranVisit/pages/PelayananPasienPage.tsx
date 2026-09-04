import { useQuery } from '@tanstack/react-query'
import { Activity, ArrowLeft, Bed, ClipboardList, FlaskConical, HeartPulse, MessageSquareText, Pill, Stethoscope, Stamp } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiClient } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { normalizeItem } from '@/shared/types'
import type { Patient } from '@/features/GeneralPatient/types'
import type { Registration } from '@/features/PendaftaranRegistration/types'
import type { Visit } from '@/features/PendaftaranVisit/types'
import { MedicalRecordEpisodePanel } from '@/features/MedicalRecordEpisode/components/MedicalRecordEpisodePanel'

interface ServiceModule {
  label: string
  description: string
  path: string
  icon: typeof Activity
}

// Keenam path modul lama (clinical-note, medical-procedure, prescription, lab-order,
// radiology-order, service-handover) sudah diverifikasi cocok 1:1 dengan route yang
// digenerate di src/routes/generated.tsx — tidak perlu diperbaiki.
//
// Tiga modul di bawah (vital-sign, anamnesis, diagnosis) ditambahkan karena merupakan
// langkah awal alur klinis yang lazim terjadi SEBELUM tindakan/resep/order penunjang,
// tapi sebelumnya tidak ada di papan navigasi — pasien jadi harus dicari manual lewat
// sidebar dan kehilangan konteks kunjungan aktif (visit_id tidak ikut terkirim).
const SERVICE_MODULES: ServiceModule[] = [
  { label: 'Tanda Vital', description: 'Catat tanda vital (TD, nadi, suhu, saturasi) kunjungan ini.', path: '/modul/medical-record-vital-sign', icon: HeartPulse },
  { label: 'Anamnesis', description: 'Catat keluhan dan riwayat yang disampaikan pasien.', path: '/modul/medical-record-anamnesis', icon: MessageSquareText },
  { label: 'Rekam Medis', description: 'Asesmen, diagnosis, dan catatan klinis pasien.', path: '/modul/medical-record-clinical-note', icon: ClipboardList },
  { label: 'Diagnosis', description: 'Tetapkan diagnosis kerja/akhir untuk kunjungan ini.', path: '/modul/medical-record-diagnosis', icon: Stamp },
  { label: 'Tindakan Medis', description: 'Catat tindakan yang diberikan pada kunjungan.', path: '/modul/layanan-medical-procedure', icon: Stethoscope },
  { label: 'Resep & Farmasi', description: 'Buat resep dan lanjutkan proses pelayanan obat.', path: '/modul/layanan-prescription', icon: Pill },
  { label: 'Laboratorium', description: 'Buat order dan pantau hasil pemeriksaan laboratorium.', path: '/modul/layanan-lab-order', icon: FlaskConical },
  { label: 'Radiologi', description: 'Buat order dan pantau hasil pemeriksaan radiologi.', path: '/modul/layanan-radiology-order', icon: Activity },
  { label: 'Serah Terima', description: 'Serahkan pelayanan pasien ke unit atau petugas berikutnya.', path: '/modul/pendaftaran-service-handover', icon: Bed },
]

export function PelayananPasienPage() {
  const { visitId } = useParams()
  const navigate = useNavigate()
  const numericVisitId = Number(visitId)

  const contextQuery = useQuery({
    queryKey: ['pelayanan-pasien', numericVisitId],
    enabled: Number.isFinite(numericVisitId) && numericVisitId > 0,
    queryFn: async () => {
      const visitResponse = await apiClient.get(`/visits/${numericVisitId}`)
      const visit = normalizeItem<Visit>(visitResponse.data)
      const registrationResponse = await apiClient.get(`/registrations/${visit.registration_id}`)
      const registration = normalizeItem<Registration>(registrationResponse.data)
      const patientResponse = await apiClient.get(`/patients/${registration.patient_id}`)
      const patient = normalizeItem<Patient>(patientResponse.data)
      return { visit, registration, patient }
    },
  })

  function openServiceModule(path: string) {
    sessionStorage.setItem('simgos.activeVisitId', String(numericVisitId))
    navigate(`${path}?visit_id=${numericVisitId}`)
  }

  if (!Number.isFinite(numericVisitId) || numericVisitId <= 0) {
    return <div className="p-6 text-sm text-destructive">Nomor kunjungan tidak valid.</div>
  }

  if (contextQuery.isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Memuat konteks pelayanan pasien...</div>
  }

  if (contextQuery.isError || !contextQuery.data) {
    return <div className="p-6 text-sm text-destructive">Konteks kunjungan tidak dapat dimuat.</div>
  }

  const { visit, registration, patient } = contextQuery.data
  const careType = registration.is_emergency ? 'IGD' : visit.ward_id ? 'Rawat Inap' : 'Rawat Jalan'

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Pelayanan Pasien</p>
          <h1 className="text-2xl font-semibold tracking-tight">{patient.name ?? 'Pasien'}</h1>
          <p className="text-sm text-muted-foreground">
            {patient.medical_record_number ?? 'NRM belum tersedia'} · {visit.visit_number ?? `Kunjungan #${visit.id}`}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/pendaftaran-kunjungan')}>
          <ArrowLeft className="size-4" /> Kembali ke Pendaftaran
        </Button>
      </div>

      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-5">
          <div><p className="text-xs text-muted-foreground">Tujuan</p><p className="font-medium">{careType}</p></div>
          <div><p className="text-xs text-muted-foreground">NIK</p><p className="font-medium">{patient.nik ?? '—'}</p></div>
          <div><p className="text-xs text-muted-foreground">Registrasi</p><p className="font-medium">#{registration.id}</p></div>
          <div><p className="text-xs text-muted-foreground">Ward</p><p className="font-medium">{visit.ward_id ? `#${visit.ward_id}` : 'Tidak menggunakan ward'}</p></div>
          <div><p className="text-xs text-muted-foreground">Status</p><p className="font-medium">{visit.status ?? '—'}</p></div>
        </CardContent>
      </Card>

      <MedicalRecordEpisodePanel visitId={numericVisitId} />

      <div>
        <h2 className="text-lg font-semibold">Modul Pelayanan</h2>
        <p className="text-sm text-muted-foreground">Seluruh modul dibuka dengan konteks kunjungan #{visit.id}.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SERVICE_MODULES.map((module) => {
          const Icon = module.icon
          return (
            <Card key={module.path} className="transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon className="size-5" /></div>
                <CardTitle>{module.label}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" onClick={() => openServiceModule(module.path)}>Buka {module.label}</Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
