import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Reservation } from './types'

export const PendaftaranReservationEndpoint = '/reservations'

export function useReservationResource() {
  return useCrudResource<Reservation>(PendaftaranReservationEndpoint)
}
