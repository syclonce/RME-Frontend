import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyTariffByRoomClass } from './types'

export const GeneralPharmacyTariffByRoomClassEndpoint = '/pharmacy-tariff-by-room-classes'

export function usePharmacyTariffByRoomClassResource() {
  return useCrudResource<PharmacyTariffByRoomClass>(GeneralPharmacyTariffByRoomClassEndpoint)
}
