import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LeftoverMedicationVoucher } from './types'

export const LayananLeftoverMedicationVoucherEndpoint = '/leftover-medication-vouchers'

export function useLeftoverMedicationVoucherResource() {
  return useCrudResource<LeftoverMedicationVoucher>(LayananLeftoverMedicationVoucherEndpoint)
}
