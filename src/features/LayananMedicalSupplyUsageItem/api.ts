import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicalSupplyUsageItem } from './types'

export const LayananMedicalSupplyUsageItemEndpoint = '/medical-supply-usage-items'

export function useMedicalSupplyUsageItemResource() {
  return useCrudResource<MedicalSupplyUsageItem>(LayananMedicalSupplyUsageItemEndpoint)
}
