import { ArrowLeft, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useActiveVisit } from '@/shared/hooks/useActiveVisit'
import { useMedicalRecordEpisode } from '@/features/MedicalRecordEpisode/api'

/**
 * Penanda pasien yang sedang dilayani, dipasang di atas modul klinis.
 *
 * Alasannya keselamatan pasien, bukan kenyamanan: modul klinis dibuka sebagai
 * halaman lepas, sehingga tanpa penanda ini petugas dapat mencatat asesmen atau
 * resep pada pasien yang salah tanpa satu pun isyarat di layar.
 *
 * Tidak merender apa pun bila tak ada konteks — halaman tetap berfungsi sebagai
 * CRUD biasa.
 */
export function ActiveVisitBanner() {
  const { visitId, context, isLoading } = useActiveVisit()
  const navigate = useNavigate()

  // Status RME menentukan apakah isian di halaman ini akan diterima sama
  // sekali. Tanpa penanda ini petugas mengisi form sampai selesai, lalu
  // ditolak backend dengan "RME sudah final" — dan tidak ada di layar ini
  // yang memberitahu sebelumnya.
  const { query: episodeQuery } = useMedicalRecordEpisode(visitId ?? 0)
  const episode = episodeQuery.data

  if (visitId === null) return null

  if (isLoading || !context) {
    return (
      <div className="bg-muted/50 mb-4 rounded-md border px-4 py-2.5 text-sm">
        <span className="text-muted-foreground">Memuat konteks kunjungan #{visitId}…</span>
      </div>
    )
  }

  const { visit, registration, patient } = context
  const careType = registration.is_emergency ? 'IGD' : visit.ward_id ? 'Rawat Inap' : 'Rawat Jalan'

  return (
    <div className="border-primary/30 bg-primary/5 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-md border px-4 py-2.5">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-md">
          <User className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{patient.name ?? 'Pasien'}</p>
          <p className="text-muted-foreground truncate text-xs">
            {patient.medical_record_number ?? 'NRM belum tersedia'} · {visit.visit_number ?? `Kunjungan #${visit.id}`}
          </p>
        </div>
        <Badge variant="secondary">{careType}</Badge>
        {/* Hanya keadaan yang MENGHALANGI pengisian yang ditandai. RME
            terbuka adalah keadaan normal dan tidak perlu diumumkan. */}
        {episode === null && <Badge variant="outline">RME belum dibuka</Badge>}
        {episode?.status === 'finalized' && <Badge variant="destructive">RME final — terkunci</Badge>}
      </div>
      <Button variant="ghost" size="sm" onClick={() => navigate(`/pelayanan-pasien/${visit.id}`)}>
        <ArrowLeft className="size-4" /> Kembali ke Pelayanan
      </Button>
    </div>
  )
}
