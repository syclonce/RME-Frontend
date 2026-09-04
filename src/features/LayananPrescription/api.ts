import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { normalizeItem, normalizeList } from '@/shared/types'
import type { Prescription } from './types'

export const LayananPrescriptionEndpoint = '/prescriptions'

export function usePrescriptionResource() {
  return useCrudResource<Prescription>(LayananPrescriptionEndpoint)
}

/**
 * Daftar resep berstatus 'active' (belum diserahkan) untuk halaman Farmasi —
 * Penyerahan Obat. Backend belum tentu mengurutkan hasil, jadi pengurutan
 * "terbaru di atas" dilakukan di pemanggil berdasar `prescribed_at`.
 */
export function useActivePrescriptions() {
  return useQuery({
    queryKey: [LayananPrescriptionEndpoint, 'list', { status: 'active' }],
    queryFn: async () => {
      const res = await apiClient.get(LayananPrescriptionEndpoint, { params: { status: 'active' } })
      return normalizeList<Prescription>(res.data).items
    },
  })
}

/**
 * Serahkan obat untuk satu resep (POST /prescriptions/{id}/dispense).
 * Backend memotong stok dan mengubah status jadi 'dispensed' — bisa gagal
 * 422 saat stok tidak cukup, pesan galatnya sudah menyebut nama obat +
 * sisa stok sehingga cukup diteruskan lewat notifyApiError oleh pemanggil.
 */
export function useDispensePrescription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (prescriptionId: number) => {
      const res = await apiClient.post(`${LayananPrescriptionEndpoint}/${prescriptionId}/dispense`)
      return normalizeItem<Prescription>(res.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LayananPrescriptionEndpoint] })
    },
  })
}
