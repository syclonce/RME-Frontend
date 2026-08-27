import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicalSupplyUsage } from './types'

export const LayananMedicalSupplyUsageEndpoint = '/medical-supply-usages'

export function useMedicalSupplyUsageResource() {
  return useCrudResource<MedicalSupplyUsage>(LayananMedicalSupplyUsageEndpoint)
}
