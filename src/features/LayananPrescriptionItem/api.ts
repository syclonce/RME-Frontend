import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { normalizeList } from '@/shared/types'
import type { PrescriptionItem } from './types'

export const LayananPrescriptionItemEndpoint = '/prescription-items'

export function usePrescriptionItemResource() {
  return useCrudResource<PrescriptionItem>(LayananPrescriptionItemEndpoint)
}

/**
 * Item obat satu resep. Query di-enable hanya saat baris resep diperluas
 * (`enabled`) supaya halaman Farmasi tidak memuat item semua resep sekaligus
 * saat daftar pertama kali dibuka.
 */
export function usePrescriptionItems(prescriptionId: number | undefined, enabled: boolean) {
  return useQuery({
    queryKey: [LayananPrescriptionItemEndpoint, 'list', { prescription_id: prescriptionId }],
    queryFn: async () => {
      const res = await apiClient.get(LayananPrescriptionItemEndpoint, { params: { prescription_id: prescriptionId } })
      return normalizeList<PrescriptionItem>(res.data).items
    },
    enabled: enabled && prescriptionId !== undefined,
  })
}
