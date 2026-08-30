import { useQuery } from '@tanstack/react-query'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { apiClient } from '@/api/client'
import type { PharmacyDispense } from './types'

export const LayananPharmacyDispenseEndpoint = '/pharmacy-dispenses'

export function usePharmacyDispenseResource() {
  return useCrudResource<PharmacyDispense>(LayananPharmacyDispenseEndpoint)
}

export interface InteractionFinding {
  type: 'interaction' | 'allergy'
  severity: string | null
  message: string
}

export function useInteractionCheck(prescriptionId: number | undefined) {
  return useQuery({
    queryKey: ['prescriptions', prescriptionId, 'interaction-check'],
    queryFn: async () => {
      const res = await apiClient.get(`/prescriptions/${prescriptionId}/interaction-check`)
      return (res.data?.data ?? []) as InteractionFinding[]
    },
    enabled: prescriptionId !== undefined && prescriptionId > 0,
  })
}
