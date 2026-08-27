import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LeftoverMedicationVoucherItem } from './types'

export const LayananLeftoverMedicationVoucherItemEndpoint = '/leftover-medication-voucher-items'

export function useLeftoverMedicationVoucherItemResource() {
  return useCrudResource<LeftoverMedicationVoucherItem>(LayananLeftoverMedicationVoucherItemEndpoint)
}
