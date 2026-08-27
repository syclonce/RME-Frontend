import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicineDelivery } from './types'

export const LayananMedicineDeliveryEndpoint = '/medicine-deliveries'

export function useMedicineDeliveryResource() {
  return useCrudResource<MedicineDelivery>(LayananMedicineDeliveryEndpoint)
}
