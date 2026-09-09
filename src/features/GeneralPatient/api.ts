import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { normalizeList } from '@/shared/types'
import type { Patient } from './types'

export const GeneralPatientEndpoint = '/patients'

export function usePatientResource() {
  return useCrudResource<Patient>(GeneralPatientEndpoint)
}

/**
 * Alur 1001 step 1: cari pasien yang sudah pernah terdaftar sebelum petugas
 * membuat data baru. Query hanya jalan kalau nik atau name terisi (dijaga di
 * sisi caller lewat `enabled`), sama seperti validasi endpoint backend-nya.
 */
export function usePatientDuplicateSearch(params: { nik?: string; name?: string; birth_date?: string }, enabled: boolean) {
  return useQuery({
    queryKey: [GeneralPatientEndpoint, 'search', params],
    queryFn: async () => {
      const res = await apiClient.get(`${GeneralPatientEndpoint}/search`, { params })
      return normalizeList<Patient>(res.data).items
    },
    enabled,
  })
}
