import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import type { MedicalRecordEpisode } from './types'

export const MedicalRecordEpisodeEndpoint = '/visits'

function episodeKey(visitId: number) {
  return ['medical-record-episode', visitId]
}

/**
 * Gerbang lifecycle RME satu kunjungan.
 *
 * Backend mengembalikan `data: null` bila RME kunjungan belum pernah dibuka —
 * itu keadaan sah, bukan error, jadi hook ini memetakannya ke `null` dan bukan
 * melemparkan galat.
 */
export function useMedicalRecordEpisode(visitId: number) {
  const queryClient = useQueryClient()

  const invalidate = () => queryClient.invalidateQueries({ queryKey: episodeKey(visitId) })

  const query = useQuery({
    queryKey: episodeKey(visitId),
    enabled: Number.isFinite(visitId) && visitId > 0,
    // Hook ini dipakai ActiveVisitBanner, yang terpasang di ATAS SETIAP modul
    // klinis — tanpa staleTime, tiap perpindahan modul memicu permintaan baru.
    //
    // 30 detik, bukan lebih: status RME berubah akibat aksi petugas sendiri
    // (finalkan / mulai perbaikan), dan menampilkan status basi lebih buruk
    // daripada satu permintaan tambahan. Mutasi di bawah tetap meng-invalidate
    // secara langsung, jadi aksi dari layar ini selalu tercermin seketika.
    staleTime: 30_000,
    queryFn: async () => {
      const res = await apiClient.get<{ data: MedicalRecordEpisode | null }>(
        `${MedicalRecordEpisodeEndpoint}/${visitId}/medical-record`,
      )
      return res.data?.data ?? null
    },
  })

  const start = useMutation({
    mutationFn: async () => {
      const res = await apiClient.post(`${MedicalRecordEpisodeEndpoint}/${visitId}/medical-record/start`)
      return res.data?.data as MedicalRecordEpisode
    },
    onSuccess: invalidate,
  })

  const finalize = useMutation({
    mutationFn: async () => {
      const res = await apiClient.post(`${MedicalRecordEpisodeEndpoint}/${visitId}/medical-record/finalize`)
      return res.data?.data as MedicalRecordEpisode
    },
    onSuccess: invalidate,
  })

  const amend = useMutation({
    mutationFn: async (reason: string) => {
      const res = await apiClient.post(`${MedicalRecordEpisodeEndpoint}/${visitId}/medical-record/amend`, { reason })
      return res.data?.data as MedicalRecordEpisode
    },
    onSuccess: invalidate,
  })

  return { query, start, finalize, amend }
}
