import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ReservationStatus } from './types'

export const GeneralReservationStatusEndpoint = '/reservation-statuses'

export function useReservationStatusResource() {
  return useCrudResource<ReservationStatus>(GeneralReservationStatusEndpoint)
}
